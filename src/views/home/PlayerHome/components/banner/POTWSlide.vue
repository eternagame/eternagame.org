<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style=" background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div class="banner-text">
      <h1 class="banner-title">{{ $t('puzzle-slide::puzzle-of-week') }}</h1>
      <h2 class="banner-subtitle ">{{ title }}</h2>

      <b-button variant="primary" class="enter-lab" size="lg" :href="`/puzzles/${nid}`">{{
        $t('puzzle-slide:solve-now')
      }}</b-button>
      <router-link class="d-none d-sm-block" to="/puzzles/?search=:POTW">
        <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px; margin-top:10px;">
          <i class="arrow_right"></i>{{ $t('puzzle-slide:past-potw') }}
        </p>
      </router-link>
      <router-link to="/puzzles/?search=:COVID19" class="link d-none d-sm-block">
        <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
          <i class="arrow_right"></i>{{ $t('puzzle-slide:past-training') }}
        </p>
      </router-link>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import Utils from '@/utils/utils';
  import bgimage from '@/assets/home/hero-potw.png';

  @Component({
    components: {},
  })
  export default class POTWSlide extends Vue {
    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly nid!: string;

    get imageURL() {
      return bgimage;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .slide {
    max-width: 1200px;
    max-height: 519px;
    min-height: 500px;
    text-shadow: none !important;
  }

  .img {
    float: right;
    width: 400;
    height: 400;
  }

  ::v-deep img {
    min-height: 500px;
    object-fit: cover;
  }

  .banner-title {
    font-size: 42px;
    font-weight: bold;
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
