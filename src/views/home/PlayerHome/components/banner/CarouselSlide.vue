<template>
  <b-carousel-slide class="slide" :img-src="heroImage">
    <div class="banner-content">
      <div class="banner-text">
        <h2 class="banner-title">
          {{ title }}
        </h2>
        <p>
          {{  subtitle }}
        </p>
        <b-button variant="primary" class="enter-lab" size="lg" :to="button_url">
          {{button_text}}
        </b-button>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import DefaultHero from '@/assets/home/hero-lab-default.png';

  @Component({
  })
  export default class LabSlide extends Vue {

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly subtitle!: string;

    @Prop({ required: true }) readonly button_text!: string;

    @Prop({ required: true }) readonly button_url!: string;

    @Prop({ required: true }) readonly background_image!: string;

    get heroImage() {
      return  this.background_image || DefaultHero;
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

  .banner-text {
    width: 50%;
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

  .training-button {
    margin-left: 1rem;
  }
</style>
