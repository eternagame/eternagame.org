<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div>
      <p class="video-title">
        Ribotree Assistant
      </p>

      <p class="explain">
        Request for Participation: Demo and survey for Ribotree assistance in Eterna
      </p>
      <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        to="/news/14293327"
      >
        Read More
      </b-button>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import bgimage from '@/assets/home/hero-evergreen.jpg';

  @Component({
    components: {},
  })
  export default class RibotreeSlide extends Vue {
    get imageURL() {
      return bgimage;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  :deep(.carousel-caption) {
    text-align: left;
  }

  :deep(img) {
    min-height: 500px;
    object-fit: cover;
  }

  .slide {
    max-width: 1200px;
    max-height: 519px;
    min-height: 519px;
    text-shadow: none !important;
  }

  .video-title {
    line-height: 3rem;
    font-size: 2.8rem;
    font-weight: bold;
    @include media-breakpoint-only(xs) {
      line-height: 1.6rem;
      font-size: 1.5rem;
    }
  }

  .explain {
    max-width: 682px;
  }

  .button {
    margin-top: 10px;
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
