<template>
  <div>
    <div v-if="scrollEnabled && firstLoaded > 0" style="width: 100%; display: flex; justify-content: center;">
      <Preloader v-if="loading" />
      <div v-else class="my-2">
        <b-btn
          variant="primary" :disabled="loading"
          @click="loadPrevious"
          @keypress.space="loadPrevious"
          @keypress.enter="loadPrevious"
        >
          Load Previous
        </b-btn>
        <b-btn
          class="ml-2"
          variant="primary" :disabled="loading"
          @click="loadPage(1)"
          @keypress.space="loadPage(1)"
          @keypress.enter="loadPage(1)"
        >
          Load First
        </b-btn>
      </div>
    </div>
    <slot></slot>
    <div v-if="pagesEnabled">
      <b-pagination
        :disabled="loading"
        :value="currentPage"
        @change="loadPage($event)"
        :total-rows="total"
        :per-page="increment"
        style="bottom: 0;"
        align="fill"
        limit=11
        class="my-2 w-100"
      />
    </div>
    <div v-if="scrollEnabled && hasMore" style="width: 100%; display: flex; justify-content: center;">
      <Preloader v-if="loading" />
      <b-btn
        v-else
        class="my-2"
        variant="primary" :disabled="loading"
        @click="loadNext"
        @keypress.space="loadNext"
        @keypress.enter="loadNext"
      >
        Load More
      </b-btn>
    </div>
  </div>
</template>

<script lang="ts">
  import { Route } from 'vue-router';
  import { navigationModes } from '@/store/pagination.vuex';
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import utils from '@/utils/utils';
  import Preloader from './Preloader.vue';

  export interface PaginatorEvent {
    mode: 'replace' | 'prepend' | 'append';
    size: number;
    skip: number;
  }

  @Component({
    components: {
      Preloader
    }
  })
  export default class Paginator extends Vue {
    @Prop({ required: true }) loading!: boolean;

    @Prop({ required: true }) total!: number;

    @Prop({ default: 18 }) defaultIncrement!: number;

    firstLoaded = 0;

    loadedCount = 0;

    private needsPush = true;

    private currentlyRouting = false;

    created() {
      if (this.pagesEnabled && this.$route.query.skip && +this.$route.query.skip % this.increment !== 0) {
        this.updateQuery(Math.ceil(+this.$route.query.skip / this.increment) * this.increment, 'replace');
      }
      this.firstLoaded = +this.$route.query.skip || 0;
      this.loadedCount = this.increment;
    }

    mounted() {
      window.addEventListener('scroll', this.boundScrollHandler);
    }

    beforeDestroy() {
      window.removeEventListener('scroll', this.boundScrollHandler);
    }

    @Watch('$route.query')
    async fetchForNewQuery(query: Route['query'], oldQuery: Route['query']) {
      if (utils.nonPaginationQueryChanged(query, oldQuery)) {
        // If the query has changed in some way excluding the size and skip params, FetchMixin
        // will cause data to be reloaded as if it was the first visit to the page
        this.firstLoaded = +this.$route.query.skip || 0;
        this.loadedCount = this.increment;
      } else if (!this.currentlyRouting) {
        // If $route.query changed but no non-pagination property changed, that means ONLY
        // pagination properties changed. If this didn't occur because we triggered a re-route
        // (in which case we've fetched the new data we wanted), that means something else like
        // the user using the forward/back navigation caused this, in which case we want to treat
        // this as if the user navigated there the first time
        this.$emit('load', {mode: 'replace', size: +query.size, skip: +query.skip});
      }
    }

    loadPrevious() {
      const toLoad = this.increment > this.firstLoaded ? this.firstLoaded : this.increment;
      const skip = this.firstLoaded - toLoad;
      this.$emit('load', {mode: 'prepend', size: toLoad, skip});
      this.firstLoaded = skip;
      this.loadedCount += toLoad;

      this.updateQuery(skip, 'auto');
    }

    loadNext() {
      const loadedWithSkipped = this.loadedCount + this.firstLoaded;
      const numLeft = this.total - loadedWithSkipped;
      const toLoad = this.increment > numLeft ? numLeft : this.increment;
      this.$emit('load', {mode: 'append', size: toLoad, skip: loadedWithSkipped});
      this.loadedCount += toLoad;

      this.updateQuery(loadedWithSkipped, 'auto');
    }

    loadPage(index: number) {
      const skip = (index - 1) * this.increment;
      this.$emit('load', {mode: 'replace', size: this.increment, skip});
      this.firstLoaded = skip;
      this.loadedCount = this.increment;
      this.updateQuery(skip, 'push');
    }

    /**
     * Update the size and skip query params
     *
     * @param skip
     * @param action 'replace' or 'push' uses the relevant methods on $router.
     * 'auto' will push the first time, and replace any consecutive times.
     * This allows for the user to hit the back button when in infinite scroll mode to
     * get to the point where they started on the page
     */
    private updateQuery(skip: number, action: 'replace' | 'push' | 'auto') {
      let resolvedAction: 'push' | 'replace';
      if (action === 'auto') {
        if (this.needsPush) {
          resolvedAction = 'push';
          this.needsPush = false;
        } else {
          resolvedAction = 'replace';
        }
      } else {
        resolvedAction = action;
      }

      this.currentlyRouting = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {size: oldSize, skip: oldSkip, ...query} = this.$route.query;
      this.$router[resolvedAction]({
        name: this.$route.name!,
        query: {
          ...query,
          size: this.increment.toString(),
          skip: skip.toString(),
        },
        params: { keepScroll: 'true' }
      }).finally(() => {
        this.currentlyRouting = false;
      });
    }

    private scrollHandler() {
      const scrollTrigger =
        document.documentElement.offsetHeight - (document.documentElement.scrollTop + window.innerHeight)
        <= window.innerHeight * 3;

      if (scrollTrigger && this.scrollEnabled && this.hasMore && !this.loading) {
        this.loadNext();
      }
    }

    private boundScrollHandler = this.scrollHandler.bind(this);

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    get scrollEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_SCROLL;
    }

    get currentPage() {
      return (+this.$route.query.skip || 0) / this.increment + 1;
    };

    get increment() {
      return +this.$route.query.size || this.defaultIncrement;
    }

    get hasMore() {
      return this.firstLoaded + this.loadedCount < this.total;
    }
  }
</script>
