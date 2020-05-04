<template>
  <div></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import icon from '@/assets/Filter.svg';

  @Component({
    components: {},
  })
  export default class Pagination extends Vue {
    @Prop({ default: 9 })
    private increment!: number;

    @Prop({ default: 18 })
    private initial!: number;

    private search: string = '';

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 1
          >= document.documentElement.offsetHeight;

        if (bottomOfWindow) {
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
