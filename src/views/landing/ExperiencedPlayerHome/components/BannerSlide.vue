<template>
  <b-carousel-slide class="slide" :img-src="heroImage">
    <div class="banner-text" style="max-width:740px">
      <h1
        :class="{
          'banner-title': true,
          'long-title': displayTitle.length > 40,
        }"
      >
        {{ displayTitle }}
      </h1>
      <!-- If there's a subtitle, use that. If there's a title and no subtitle, use the lab name -->
      <h3 v-if="carousel_subtitle || carousel_title" class="banner-subtitle">
        {{ (carousel_subtitle || title).toUpperCase() }}
      </h3>

      <div class="countdown" v-if="project_closes">
        <p v-if="designs_to_be_synthesized" style="text-align:center">
          <b> {{ designs_to_be_synthesized }}</b
          ><b>{{ $t('count-down:select-synthesis-bold') }}</b
          ><span> {{ $t('count-down:select-synthesis') }}</span>
        </p>
        <flip-countdown :deadline="closesDateFormat" style="padding:0px"></flip-countdown>
      </div>

      <div class="banner-progress" v-if="!project_closes">
        <Progress v-bind="progressCircles[0]" color="#2f94d1" />
        <Progress v-bind="progressCircles[1]" color="#fac244" />
      </div>
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
  import Progress from '@/components/Common/Progress.vue';
  // @ts-ignore
  import FlipCountdown from 'vue2-flip-countdown';
  // @ts-ignore
  import VueMq from 'vue-mq';

  @Component({
    components: { Progress, FlipCountdown },
  })
  export default class BannerSlide extends Vue {
    @Prop({}) banner_image!: string;

    @Prop({}) title!: string;

    @Prop({}) carousel_title!: string;

    @Prop({}) carousel_subtitle!: string;

    @Prop() designs_to_be_synthesized!: number;

    @Prop() total_designs!: number;

    @Prop() max_designs!: number;

    @Prop() total_submitted_solutions_of_user!: number;

    @Prop() total_submitted_solutions!: number;

    private displayTitle = this.carousel_title || this.title;

    get closesDateFormat(): string | null {
      if (!this.project_closes) return null;
      const d = new Date(this.project_closes * 1000);
      return `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ].join(':')}`;
    }

    @Prop({}) project_closes!: number | null;

    @Prop({}) nid!: number;

    get heroImage() {
      return this.banner_image || DefaultHero;
    }

    progressCircles = [
      {
        name: 'progress-circle:designs-submissions',
        progress: this.total_submitted_solutions,
        total: this.total_designs,
      },
      {
        name: 'progress-circle:my-submissions',
        progress: this.total_submitted_solutions_of_user,
        total: this.max_designs,
      },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .countdown {
    @include media-breakpoint-down(md) {
      font-size: 14px;
    }
    @include media-breakpoint-up(md) {
      left: 35%;
      position: relative;
    }
    font-size: 20px;
  }

  .banner-progress {
    @include media-breakpoint-up(md) {
      right: -160px;
      position: absolute;
      bottom: 0px;
    }

    display: flex;
    justify-content: center;
  }

  .banner-title.long-title {
    @include media-breakpoint-up(lg) {
      font-size: 30px;
    }

    @include media-breakpoint-down(md) {
      font-size: 25px;
    }

    @include media-breakpoint-down(sm) {
      font-size: 20px;
    }

    @include media-breakpoint-down(xs) {
      font-size: 14px;
    }
  }

  .banner-title {
    font-weight: bold;
    font-size: 42px;
    text-align: left;
    @include media-breakpoint-down(md) {
      font-size: 30px;
    }
    @include media-breakpoint-down(xs) {
      font-size: 20px;
      text-align: center;
      margin: 0 auto;
    }
  }

  .banner-title,
  .banner-subtitle {
    max-width: 85%;
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

  ::v-deep img {
    min-height: 300px;
    object-fit: cover;
  }
</style>
