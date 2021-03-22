<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div>
      <p class="video-title">
        EPA IdeaJam
      </p>

      <p class="explain">
        The Eterna Players Alliance wants to hear what changes and improvements you want to see on Eterna.
        Get your feedback in by April 19th!
      </p>
      <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        to="/news/10733322"
      >
        Read More
      </b-button>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import Utils from '@/utils/utils';
  import bgimage from '@/assets/home/hero-sunburst.png';

  @Component({
    components: {},
  })
  export default class IdeaJamSlide extends Vue {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    get imageURL() {
      return bgimage;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  ::v-deep .carousel-caption {
    text-align: left;
  }

  ::v-deep img {
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
