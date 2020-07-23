<template>
  <b-carousel-slide
    class="slide"
  >
    <template v-slot:img>
      <img src="~@/assets/home/hero-sunburst.png" class="img-fluid w-100 d-block bg-image" />
      <div class="puzzle-image-wrapper">
        <img :src="puzImageURL" class="puzzle-image" />
      </div>
    </template>
    <div class="banner-text">
      <h1 class="banner-title">{{ $t('puzzle-slide::puzzle-of-week') }}</h1>
      <h2 class="banner-subtitle ">{{ title }}</h2>

      <b-button variant="primary" class="enter-lab" size="lg" :href="`/puzzles/${nid}`">
        {{ $t('puzzle-slide:solve-now') }}
      </b-button>
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

  @Component({
    components: {},
  })
  export default class POTWSlide extends Vue {
    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly nid!: string;
    
    get puzImageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.nid);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .banner-text {
    width: 50%;
  }

  .puzzle-image-wrapper {
    position: absolute;
    height: 100%;
    width: 50%;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 100px;
  }

  .puzzle-image {
    width: 100%;
    z-index: 50;
  }

  @include media-breakpoint-down(md) {
    .banner-text {
      width: 100%;
    }

    .puzzle-image-wrapper {
      width: 100%;
      height: 50%;
      padding: 1rem 15%;
    }

    .puzzle-image {
      width: initial;
      height: 100%;
    }
  }

  .slide {
    max-width: 1200px;
    max-height: 519px;
    min-height: 500px;
    text-shadow: none !important;
  }

  .bg-image {
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

  .slide::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }
</style>
