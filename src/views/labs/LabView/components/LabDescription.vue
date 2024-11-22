<template>
  <div>
    <div class="card" style="width:100; border: none;">
      <div
        class="lab-header"
        :style="{
          'background-image': `linear-gradient(
          to bottom,
          transparent 0%,
          rgba(0, 0, 0, 0.6) 70%,
          rgba(0, 0, 0, 0.9) 100%
        ), url(${heroImage})`,
        }"
      >
        <div class="lab-header-inner">
          <div class="header-content">
            <div class="banner-title">
              <h3>
                {{ lab.title }}
              </h3>
            </div>
            <div class="banner-progress d-lg-none" style="display: flex;">
              <div style="font-size: 14px; align-content: center; margin: 5px; min-width: 190px;" v-if="lab.project_closes">
                <p v-if="lab.designs_to_be_synthesized" style="text-align: left; margin-bottom: 8px;">
                  <span style="font-weight: bold;">{{ lab.designs_to_be_synthesized }} {{ $t('count-down:select-synthesis-bold') }}</span>
                  <span> {{ closed ? $t('count-down:select-synthesis-past') : $t('count-down:select-synthesis') }}</span>
                </p>
                <flip-countdown
                  :deadline="closesDateFormat"
                  :labels="countdownLabels"
                  style="padding: 0px"
                  v-if="!closed"
                />
              </div>
              <div>
                <Progress style="margin: 5px;" v-bind="totalProgressCircle" color="#2f94d1" />
                <Progress style="margin: 5px;" v-if="$vxm.user.loggedIn" v-bind="userProgressCircle" color="#fac244" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="body">
        <div ref="content" style="margin-bottom: 10px;" v-dompurify-html="descriptionToShow"></div>
        <ReadMore v-model="readMore" v-if="readMoreNeeded"></ReadMore>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import Progress from '@/components/Common/Progress.vue';
  import FlipCountdown from 'vue2-flip-countdown';
  import { LabData } from '../types';

  const MAX_CHARS = 1000;

  @Component({
    components: { Progress, FlipCountdown },
  })
  export default class LabDescription extends Vue {
    @Prop({ required: true }) readonly lab!: LabData;

    readMore = false;

    get totalProgressCircle() {
      return {
        name: 'progress-circle:designs-submissions',
        progress: this.lab.total_submitted_solutions,
        total: this.lab.total_designs,
      };
    }

    get userProgressCircle() {
      return {
        name: 'progress-circle:my-submissions',
        progress: this.lab.total_submitted_solutions_of_user,
        total: this.lab.max_designs,
      };
    }

    get readMoreNeeded() {
      return this.lab.body.length > MAX_CHARS;
    }

    get descriptionToShow() {
      return this.readMore ? this.lab.body : this.lab.body.substr(0, MAX_CHARS);
    }

    get heroImage() {
      return this.lab.banner_image || DefaultHero;
    }

    get closed() {
      return +this.lab.project_closes * 1000 < Date.now();
    }

    get closesDateFormat(): string | null {
      if (!this.lab.project_closes) return null;
      const d = new Date(+this.lab.project_closes * 1000);
      return `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ].join(':')}`;
    }

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

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .banner-title {
    font-weight: bold;
    font-size: 42px;
    text-align: left;

    @include media-breakpoint-down(md) {
      font-size: 30px;
      margin-bottom: 0;
      flex-basis: 30%;
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }
    @include media-breakpoint-down(xs) {
      font-size: 20px;
    }
  }

  .banner-progress {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .header-content {
    display: flex;
    @include media-breakpoint-down(md) {
      justify-content: space-around;
    }
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    row-gap: 10px;
    gap: 30px;
  }

  .body {
    padding: 40px 30px 5px;
  }

  .lab-header {
    position: relative;
    background-position: center;
    background-size: cover;
    min-height: 250px;
    padding: 10px 20px;
  }

  .lab-header-inner {
    min-height: 250px;
    display: flex;
    align-items: flex-end;
  }

  :deep(.flip-card) {
    font-size: 1.7rem !important;
  }

  :deep(.flip-card__top),
  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__back::before),
  :deep(.flip-card__back::after) {
    color: white !important;
    width: 2.7rem !important;
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
    text-align: center;
  }
</style>
