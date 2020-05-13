<template>
  <b-carousel-slide
    class="slide"
    v-if="banner_image || cover_image"
    :img-src="banner_image || cover_image"
    style=" background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
    ><div class="banner-text">
      <h1 class="banner-title">{{ title }}</h1>
      <!-- <h3>
            {{ progressData[`banner-sub-title`].toUpperCase() }}
          </h3> -->
      <b-button variant="primary" class="enter-lab" size="lg" :href="`/labs/${nid}`">{{
        $t('home-banner:enter')
      }}</b-button>
    </div></b-carousel-slide
  >
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';

  @Component({
    components: {},
  })
  export default class BannerSlide extends Vue {
    @Prop({}) cover_image!: string;

    @Prop({}) banner_image!: string;

    @Prop({}) title!: string;

    @Prop({}) nid!: number;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .slide {
    max-width: 1200px;
    max-height: 519px;
  }

  .banner-title {
    font-size: 42px;
    font-weight: bold;
  }

  .enter-lab {
    font-weight: bold;
    font-size: 20px;
    padding: 9px 12px;
  }

  h1,
  h2,
  h3,
  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 18px;
  }

  @include media-breakpoint-up(sm) {
    h1,
    h2,
    h3,
    .banner-text {
      text-align: left;
    }
  }
</style>
