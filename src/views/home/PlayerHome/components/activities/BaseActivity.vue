<template>
  <section>
    <h2 class="section-header">{{heading}}</h2>
    <slot name="extra" />
    <Carousel :slideTo="slideTo">
      <slot/>
    </Carousel>
  </section>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import Carousel from '@/components/Common/Carousel.vue';

  @Component({
    components: {
      Carousel
    }
  })
  export default class BaseActivity extends Vue {
      @Prop({ required: true }) readonly heading!: string;

      @Prop() readonly slideTo?: number;
  }
</script>

<style lang="scss" scopde>
  .section-header {
    margin-top: 61px;
  }
</style>