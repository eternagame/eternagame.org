<template>
  <Preloader v-if="loading" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import icon from '@/assets/Filter.svg';
  import Preloader from '@/components/PageLayout/Preloader.vue';

  @Component({
    components: {
      Preloader,
    },
  })
  export default class Pagination extends Vue {
    @Prop({ default: 9 })
    private increment!: number;

    @Prop({ default: 18 })
    private initial!: number;

    private search: string = '';

    private loading: boolean = false;

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 1
          >= document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true;
          const oldSize = Number(this.$route.query.size || this.initial);
          const newSize = String(oldSize + this.increment);

          this.$router.replace({
            name: this.$route.name!,
            query: {
              ...this.$route.query,
              size: newSize,
            },
          });
        }
      };
    }
  }
</script>

<style scoped lang="scss"></style>
