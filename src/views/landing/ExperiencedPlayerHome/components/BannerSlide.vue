<template>
  <b-carousel-slide
    class="slide"
    :img-src="heroImage"
    ><div class="banner-text">
      <h1 class="banner-title">{{ carousel_title || title }}</h1>
      <!-- If there's a subtitle, use that. If there's a title and no subtitle, use the lab name -->
      <h3 v-if="carousel_subtitle || carousel_title">
        {{ (carousel_subtitle || title).toUpperCase() }}
      </h3>
      <b-button variant="primary" class="enter-lab" size="lg" :to="`/labs/${nid}`">
        {{ $t('home-banner:enter') }}
      </b-button>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DefaultHero from '@/assets/home/hero-lab-default.png';

  @Component({
    components: {},
  })
  export default class BannerSlide extends Vue {
    @Prop({}) banner_image!: string;

    @Prop({}) title!: string;

    @Prop({}) carousel_title!: string;

    @Prop({}) carousel_subtitle!: string;

    @Prop({}) nid!: number;

    get heroImage() {
      return this.banner_image || DefaultHero;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .slide {
    max-width: 1200px;
    max-height: 519px;
  }

  .slide::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -300px;
    height: 300px;
    width: 100%;
    content: '';
  }

  .banner-title {
    font-weight: bold;
    font-size: 36px;
  }

  ::v-deep img {
    min-height: 300px;
    object-fit: cover;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 14px;
  }

  h3 {
    font-size: 12px;
  }

  @include media-breakpoint-up(sm) {
    .banner-title {
      font-size: 42px;
    }

    h1,
    h2,
    h3,
    .banner-text {
      text-align: left;
    }
    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 26px;
    }

    h3 {
      font-size: 18px;
    }
  }
</style>
