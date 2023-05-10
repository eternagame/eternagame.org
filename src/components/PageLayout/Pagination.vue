<template>
  <Preloader v-if="loading" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Preloader from '@/components/PageLayout/Preloader.vue';

  @Component({
    components: {
      Preloader,
    },
  })
  export default class Pagination extends Vue {
    @Prop({ default: 9 }) readonly increment!: number;

    @Prop({ default: 18 }) readonly initial!: number;

    private search: string = '';

    loading: boolean = false;

    mounted() {
      window.onscroll = () => {
        const scrollTrigger =
          document.documentElement.scrollTop + window.innerHeight + 1 >=
          document.documentElement.offsetHeight * 3/4;

        if (scrollTrigger) {
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
            this.loading = true;
          }
        }
      };
    }
  }
</script>

<style scoped lang="scss"></style>
