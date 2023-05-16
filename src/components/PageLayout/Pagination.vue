<template>
  <div>
    <Preloader v-if="loading && scrollEnabled" />
    <!-- Limit is 11 because the ellipsis counts. The style bind makes sure the pagination is always at the bottom of the page, but not covering any content up.-->
    <b-pagination
      v-if="pagesEnabled"
      :value="currentPage"
      @change="updateQuery(undefined, ($event - 1) * increment)"
      :total-rows="total"
      :per-page="increment"
      style="bottom: 0;"
      :style="{ position: loading ? 'absolute': 'relative'}"
      align="fill"
      limit=11
      class="my-2 w-100"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { navigationModes } from '@/store/pagination.vuex';

  @Component({
    components: {
      Preloader,
    },
  })
  export default class Pagination extends Vue {
    @Prop({ required: true }) total!: number;

    @Prop({ required: true }) increment!: number;

    @Prop({ required: true }) loading!: boolean;

    private boundScrollHandler = this.scrollHandler.bind(this);

    private scrollHandler() {
      console.log('Scroll handler triggered');
      const scrollTrigger =
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.offsetHeight * 3/4;

      if (scrollTrigger && this.scrollEnabled) {
        const { size, skip } = this.$route.query;

        const sizeNum = +size || this.increment;
        const skipNum = +skip || 0;

        if (skipNum + sizeNum < this.total && !this.loading) {
          this.updateQuery(sizeNum, skipNum + sizeNum);
        }
      }
    }

    mounted() {
      window.addEventListener('scroll', this.boundScrollHandler);
    }

    beforeDestroy() {
      window.removeEventListener('scroll', this.boundScrollHandler);
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

    created() {
      if (this.pagesEnabled && this.$route.query.skip) {
        const skipNum = Math.floor(+this.$route.query.skip / this.increment) * this.increment;
        this.updateQuery(undefined, skipNum);
      }
    }

    updateQuery(size?: number, skip?: number) {
      const realSize = size?.toString() ?? this.$route.query.size;
      const realSkip = skip?.toString() ?? this.$route.query.skip;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {size: oldSize, skip: oldSkip, ...query} = this.$route.query;

      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(realSize !== null ? {size: realSize} : {}),
          ...(realSkip && realSkip !== '0' ? {skip: realSkip} : {}),
        },
        hash: window.location.hash,
        params: { keepScroll: 'true' }
      });
    }
  }
</script>

<style scoped lang="scss">
</style>
