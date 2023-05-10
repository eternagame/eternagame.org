<template>
  <div>
    <div class="card" style="width:100; border: none;">
      <div
        class="lab-header p-2"
        :style="{
          'background-image': `linear-gradient(
          to bottom,
          transparent 0%,
          rgba(0, 0, 0, 0.6) 70%,
          rgba(0, 0, 0, 0.9) 100%
        ), url(${heroImage})`,
        }"
      >
        <div class="header-content">
          <h3 class="banner-title">
            {{ lab.title }}
          </h3>
          <div class="banner-progress d-lg-none">
            <Progress v-bind="totalProgressCircle" color="#2f94d1" />
            <Progress v-if="$vxm.user.loggedIn" v-bind="userProgressCircle" color="#fac244" />
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
  import { LabData } from '../types';

  const MAX_CHARS = 1000;

  @Component({
    components: { Progress },
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
    }
    @include media-breakpoint-down(xs) {
      font-size: 20px;
      text-align: center;
      margin: 0 auto;
    }
  }

  .banner-progress {
    display: flex;
    justify-content: center;
    margin: 20px;
    margin-bottom: 0px;

    @include media-breakpoint-up(md) {
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
  }

  .header-content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 100%;
  }

  .body {
    padding: 40px 30px 5px;
  }

  .lab-header {
    position: relative;
    background-position: center;
    height: 250px;
  }
</style>
