<template>
  <b-carousel-slide class="slide" :img-src="heroImage">
    <div class="banner-content">
      <div class="banner-text">
        <h2 class="banner-title">
          {{ displayTitle }}
        </h2>
        <!-- If there's a subtitle, use that. If there's a title and no subtitle, use the lab name -->
        <h3 v-if="carousel_subtitle || carousel_title" class="text-uppercase">
          {{ carousel_subtitle || title }}
        </h3>

        <b-button variant="primary" class="enter-lab" size="lg" :to="`/labs/${nid}`">
          {{ $t('home-banner:enter') }}
        </b-button>
        <b-button v-if="nid === '12378286'" variant="primary" class="training-button" size="lg" :to="`/collections/11366215`">
          Lab Training
        </b-button>
      </div>
      <div class="banner-status">
        <div class="countdown" v-if="project_closes">
          <p v-if="designs_to_be_synthesized" style="text-align:center; margin-bottom: 8px;">
            <span style="font-weight: bold;">{{ designs_to_be_synthesized }} {{ $t('count-down:select-synthesis-bold') }}</span>
            <span> {{ $t('count-down:select-synthesis') }}</span>
          </p>
          <flip-countdown
            :deadline="closesDateFormat"
            :labels="countdownLabels"
            style="padding:0px"
          />
        </div>
        <div class="banner-progress">
          <Progress v-bind="progressCircles[0]" color="#2f94d1" v-if="total_designs"/>
          <Progress v-bind="progressCircles[1]" color="#fac244" />
        </div>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import FlipCountdown from 'vue2-flip-countdown';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import Progress from '@/components/Common/Progress.vue';
  // @ts-ignore
  // @ts-ignore

  @Component({
    components: { Progress, FlipCountdown },
  })
  export default class LabSlide extends Vue {
    @Prop({ required: true }) readonly banner_image!: string;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly carousel_title!: string;

    @Prop({ required: true }) readonly carousel_subtitle!: string;

    @Prop({ required: true }) readonly designs_to_be_synthesized!: number;

    @Prop({ required: true }) readonly total_designs!: number;

    @Prop({ required: true }) readonly max_designs!: number;

    @Prop({ required: true }) readonly total_submitted_solutions_of_user!: number;

    @Prop({ required: true }) readonly total_submitted_solutions!: number;

    @Prop({ required: true }) readonly project_closes!: number | null;

    @Prop({ required: true }) readonly nid!: number;

    get displayTitle() {
      return this.carousel_title || this.title;
    };

    get closesDateFormat(): string | null {
      if (!this.project_closes) return null;
      const d = new Date(this.project_closes * 1000);
      return `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ].join(':')}`;
    }

    get heroImage() {
      return this.banner_image || DefaultHero;
    }

    get progressCircles() {
      return [
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
    };

    get countdownLabels() {
      return {
        days: "DAYS",
        hours: "HOURS",
        minutes: "MIN",
        seconds: "SEC"
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .banner-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    text-align: left;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .banner-status {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .banner-text {
        width: 100%;
      }
    }
  }

  .banner-progress {
    display: flex;
  }

  .banner-text {
    width: 50%;
  }

  .banner-status {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: max-content;
  }

  .banner-title {
    font-weight: bold;
  }

  .slide {
    max-width: 1200px;
    max-height: 519px;
    min-height: 500px;
    text-shadow: none !important;
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

  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 18px;
  }

  :deep(img) {
    min-height: 500px;
    object-fit: cover;
  }

  .countdown {
    font-size: 14px;
    text-align: center;
    max-width: 200px;
    margin-right: 10px;
  }

  :deep(.flip-card) {
    font-size: 1.5rem !important;
  }

  :deep(.flip-card__top),
  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__back::before),
  :deep(.flip-card__back::after) {
    color: white !important;
    width: 2.3rem !important;
  }

  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__bottom-4digits),
  :deep(.flip-card__back-bottom-4digits) {
    border: none !important;
  }

  :deep(.flip-clock__slot) {
    font-size: .6rem !important;
    font-weight: bold;
  }

  .training-button {
    margin-left: 1rem;
  }
</style>
