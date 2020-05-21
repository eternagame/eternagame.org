<template>
  <b-carousel-slide class="slide" :img-src="heroImage"
    ><div class="banner-text d-flex ">
      <div>
        <h1 class="banner-title">{{ carousel_title || title }}</h1>
        <!-- If there's a subtitle, use that. If there's a title and no subtitle, use the lab name -->
        <h3 v-if="carousel_subtitle || carousel_title">
          {{ (carousel_subtitle || title).toUpperCase() }}
        </h3>
        <b-button variant="primary" class="enter-lab" size="lg" :to="`/labs/${nid}`">
          {{ $t('home-banner:enter') }}
        </b-button>
      </div>

      <div class="banner-progress">
        <Progress v-bind="progressCircles[0]" color="#2f94d1" />
        <Progress v-bind="progressCircles[1]" color="#fac244" />
      </div>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import Progress from '@/components/Common/Progress.vue';

  @Component({
    components: { Progress },
  })
  export default class BannerSlide extends Vue {
    @Prop({}) banner_image!: string;

    @Prop({}) title!: string;

    @Prop({}) carousel_title!: string;

    @Prop({}) carousel_subtitle!: string;

    @Prop({ default: 14276 }) designs_to_be_synthesized!: number;

    @Prop({ default: 24000 }) max_designs!: number;

    @Prop({ default: 526 }) total_submitted_solutions_of_user!: number;

    @Prop({ default: 1200 }) total_submitted_solutions!: number;

    @Prop({}) nid!: number;

    get heroImage() {
      return this.banner_image || DefaultHero;
    }

    progressCircles = [
      {
        name: 'progress-circle:designs-submissions',
        progress: this.designs_to_be_synthesized,
        total: this.max_designs,
      },
      {
        name: 'progress-circle:my-submissions',
        progress: this.total_submitted_solutions_of_user,
        total: this.total_submitted_solutions,
      },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .banner-progress {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

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
