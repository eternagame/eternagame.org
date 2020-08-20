<template>
  <div>
    <Preloader v-if="loading && (!pagesEnabled || useSize)" />
    <b-pagination
      v-if="pagesEnabled && !useSize"
      :value="currentPage"
      @change="currentPage = $event"
      :total-rows="total"
      :per-page="initial"
      style="bottom: 0;"
      :style="{ position: loading ? 'absolute': 'relative'}"
      align="fill"
      limit=11
      class="my-2 w-100"
    />
    <!-- Limit is 11 because the ellipsis counts. The style bind makes sure the pagination is always at the bottom of the page, but not covering any content up.-->
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import icon from '@/assets/Filter.svg';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { navigationModes } from '@/store/pagination.vuex';

  @Component({
    components: {
      Preloader,
    },
  })
  export default class Pagination extends Vue {
    @Prop({ default: 18 }) readonly increment!: number;

    @Prop({ default: 18 }) readonly initial!: number;

    private search: string = '';

    @Prop({ default: false }) loading!: boolean;

    @Prop({ required: true }) total !: number;

    @Prop({ default: false }) useSize !: boolean;

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight + 1 >=
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.pagesEnabled) {
          const length = this.$vnode.key;
          const { skip } = this.$route.query;
          let skipped = +skip || this.initial;
          if (skipped === 0) skipped = this.initial;
          skipped = this.convertToIncrementOf(skipped, this.increment);
          if (skipped === length) {
            this.$router.replace({
              name: this.$route.name!,
              query: {
                ...this.$route.query,
                size: this.increment.toString(),
                skip: String(skipped + this.increment),
              },
              hash: window.location.hash,
              params: { keepScroll: 'true' }
            });
            this.$emit('loading', true);
          } else if (!this.loading) {
            this.$route.query.skip = length?.toString() || this.$route.query.skip;
          }
        }
      };
    }

    convertToIncrementOf(num: number, inc: number, ceil = true) {
      return (ceil ? Math.ceil : Math.floor)(num / inc) * inc;
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    currentPage = (+this.$route.query.skip || 0) / this.initial + 1;

    created() {
      if (!this.pagesEnabled && this.$route.query.size !== this.initial.toString()) {
        this.$route.query.size = this.initial.toString();
      } else if (this.$route.query.size !== this.initial.toString()) {
        this.$route.query.size = this.initial.toString();
      }
      this.$route.query.skip = this.convertToIncrementOf(+this.$route.query.skip, this.increment).toString();
    }

    @Watch('currentPage')
    async updateQuery() {
      this.$emit('page', this.currentPage);
      const newQuery = this.getQuery();
      if (newQuery !== this.$route.query) await this.$router.replace({ name: this.$route.name!, query: this.getQuery(), });
      this.$emit('loading', true);
    }

    getQuery() {
      const query = { ...this.$route.query };
      if (this.pagesEnabled) query.skip = (this.initial * (this.currentPage - 1)).toString();
      return query;
    }
  }
</script>

<style scoped lang="scss">
</style>
