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
    <div v-if="scrollEnabled && loadedCount - firstLoaded < total" style="width: 100%; display: flex; justify-content: center;">
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

    loadPrevious() {
      const toLoad = this.increment > this.firstLoaded ? this.firstLoaded : this.increment;
      const skip = this.firstLoaded - toLoad;
      this.$emit('load', {mode: 'prepend', size: toLoad, skip});
      this.firstLoaded = skip;
      this.loadedCount += toLoad;

      this.updateQuery(skip);
    }

    loadNext() {
      const loadedWithSkipped = this.loadedCount + this.firstLoaded;
      const numLeft = this.total - loadedWithSkipped;
      const toLoad = this.increment > numLeft ? numLeft : this.increment;
      const skip = Math.min(loadedWithSkipped, Math.max(0, this.total - this.increment));
      this.$emit('load', {mode: 'append', size: toLoad, skip});
      this.loadedCount += toLoad;

      this.updateQuery(skip);
    }

    loadPage(index: number) {
      const skip = (index - 1) * this.increment;
      this.$emit('load', {mode: 'replace', size: this.increment, skip});
      this.firstLoaded = skip;
      this.loadedCount = this.increment;
      this.updateQuery(skip);
    }

    private updateQuery(skip: number) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {size: oldSize, skip: oldSkip, ...query} = this.$route.query;
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          size: this.increment.toString(),
          skip: skip.toString(),
        },
        hash: window.location.hash,
        params: { keepScroll: 'true' }
      });
    }

    private boundScrollHandler = this.scrollHandler.bind(this);

    private scrollHandler() {
      const scrollTrigger =
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.offsetHeight * 3/4;

      if (scrollTrigger && this.scrollEnabled && !this.loading) {
        this.loadNext();
      }
    }

    mounted() {
      window.addEventListener('scroll', this.boundScrollHandler);
    }

    beforeDestroy() {
      window.removeEventListener('scroll', this.boundScrollHandler);
    }

    created() {
      if (this.pagesEnabled && this.$route.query.skip && +this.$route.query.skip % this.increment !== 0) {
        this.updateQuery(Math.ceil(+this.$route.query.skip / this.increment) * this.increment);
      }
      this.firstLoaded = +this.$route.query.skip || 0;
      this.loadedCount = this.increment;
    }

    @Watch('$route.query')
    async fetchForNewQuery(query: Route['query'], oldQuery: Route['query']) {
      if (utils.queryChangeShouldRefetch(query, oldQuery)) {
        this.firstLoaded = +this.$route.query.skip || 0;
        this.loadedCount = this.increment;
      }
    }

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
  }
</script>
