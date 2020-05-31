<template>
  <b-carousel
    id="carousel-1"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <BannerSlide v-for="lab in labs" v-bind="lab" :key="lab.nid" />
    <PuzzleSlide v-bind="potw" v-if="potw"/>
  </b-carousel>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import BannerSlide from './BannerSlide.vue';
  import PuzzleSlide from './PuzzleSlide.vue';

  @Component({
    components: { BannerSlide, PuzzleSlide },
  })
  export default class Banner extends Vue {
    @Prop({}) labs!: Array<Object>;

    @Prop({}) potw!: Object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  #carousel-1 {
    // Overflow page margins as a hero element.
    margin-top: -$page-margin-top;
    margin-left: -$page-margin-side;
    margin-right: -$page-margin-side;
  }

  ::v-deep .carousel-inner {
    min-height: 300px;
  }

  ::v-deep .carousel-control-prev,
  ::v-deep .carousel-control-next {
    max-width: 100px;
  }

  ::v-deep .carousel-caption {
    left: min(100px, 15%) !important;
    right: min(100px, 15%) !important;
  }
</style>
