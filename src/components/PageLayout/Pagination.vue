<template>
  <div>
    <Preloader v-if="loading && (!pagesEnabled || useSize)" />
    <b-pagination
      v-if="pagesEnabled && !useSize"
      v-model="currentPage"
      :total-rows="total"
      :per-page="12"
      style="bottom: 0;"
      :style="{ position: loading ? 'absolute': 'relative'}"
      align="center"
      limit=15
    />
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
    @Prop({ default: 9 }) readonly increment!: number;

    @Prop({ default: 18 }) readonly initial!: number;

    private search: string = '';

    @Prop({ default: false }) loading!: boolean;

    @Prop({ default: 0}) total !: number;

    @Prop({ default: false }) useSize !: boolean;

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight + 1 >=
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.pagesEnabled) {
          const length = this.$vnode.key;
          const { skip } = this.$route.query;
          let skipped = parseInt(skip as string, 10) || 18;
          if (skipped === 0) skipped = 18;
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
          }
        } else if (bottomOfWindow && this.useSize) {
          const length = this.$vnode.key;
          const querySize = Number(this.$route.query.size || this.initial);
          const newSize = querySize + this.increment;
          if (querySize === length) {
            this.$router.replace({
              name: this.$route.name!,
              query: {
                ...this.$route.query,
                size: String(newSize),
              },
              hash: window.location.hash,
              params: { keepScroll: 'true' }
            });
            this.$emit('loading', true);
          }
        }
      };
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    currentPage = 1;

    created() {
      if (this.$route.query.skip) this.currentPage = parseInt(this.$route.query.skip as string, 10) / 12 + 1;
      if (!this.pagesEnabled) {
        this.$route.query.skip = '0';
        this.$route.query.size = this.initial.toString();
      }
      this.$router.replace({ name: this.$route.name!, query: this.$route.query });
    }

    @Watch('currentPage')
    async updateQuery() {
      this.$emit('page', this.currentPage);
      this.$emit('loading', true);
      await this.$router.replace({ name: this.$route.name!, query: this.getQuery(), });
    }

    getQuery() {
      const query = { ...this.$route.query };
      if (this.pagesEnabled) query.skip = (12 * (this.currentPage - 1)).toString();
      return query;
    }
  }
</script>

<style scoped lang="scss"></style>
