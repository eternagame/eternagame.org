<template>
  <b-carousel-slide
    class="slide"
    v-if="imageURL"
    :img-src="imageURL"
    style=" background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
    ><div class="banner-text">
      <h1 class="banner-title">{{ title }}</h1>
      <!-- <h3>
            {{ progressData[`banner-sub-title`].toUpperCase() }}
          </h3> -->
      <b-button variant="primary" class="enter-lab" size="lg" :href="`/puzzles/${nid}`">{{
        'Solve Now'
      }}</b-button>
      <router-link to="/puzzles/?search=POTW">
        <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
          <i class="arrow_right"></i>{{ 'Past POTWs' }}
        </p>
      </router-link>
      <router-link to="/puzzles/?search=COVID19" class="link">
        <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
          <i class="arrow_right"></i>{{ 'Past Training Puzzles' }}
        </p>
      </router-link>
    </div></b-carousel-slide
  >
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import Utils from '@/utils/utils';
  // @ts-ignore
  import get from 'lodash.get';

  @Component({
    components: {},
  })
  export default class PuzzleSlide extends Vue {
    @Prop({ default: '[NuPACK][switch2.5][3 states] WOW, my 1429th 3 State Switch' })
    title!: string;

    @Prop({ default: '9981473' }) nid!: string;

    get imageURL() {
      return 'https://assets.wordpress.envato-static.com/uploads/2018/01/image1.png';
      //   return Utils.getPuzzleMiddleThumbnail(this.nid);
    }
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
    margin-bottom: 10px;
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
