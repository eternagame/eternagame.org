<template>
  <Preloader v-if="loading" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
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

    private loading: boolean = false;

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
            this.loading = true;
          }
        }
      };
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }
  }
</script>

<style scoped lang="scss"></style>
