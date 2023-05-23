<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
  >
    <div>
      <p class="video-title">
        <strong>Save the Date</strong> for Eternacon 2023
      </p>

      <p class="explain">
        Tune in on July 22-23 to exciting talks and activities from Eterna researchers, developers,
        players, and other world-class experts. Registration will open soon.
      </p>
      <!-- <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        href="https://stanford.zoom.us/meeting/register/tJMtceGoqj4oGdOhGq-MbBqI3gKfOJUCIqC_"
      >
        Register
      </b-button> -->
      <b-button
        class="button"
        variant="secondary"
        size="lg"
        to="/eternacon"
      >
        Schedule &amp; Info
      </b-button>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import bgimage from '@/assets/home/hero-eternacon-2023-alt.png';

  @Component({
    components: {},
  })
  export default class EternaconSlide extends Vue {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

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
    object-fit: contain;
    // padding: 50px;
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
    @include media-breakpoint-only(xs) {
      line-height: 1.6rem;
      font-size: 1.5rem;
    }
  }

  .explain {
    max-width: 482px;
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
      rgba(0, 0, 0, 0.5) 75%,
      rgba(0, 0, 0, 0.8) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }
</style>
