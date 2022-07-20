<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div>
      <p class="video-title">
        <strong>Register now</strong> for Eternacon 2021
      </p>

      <p class="explain">
        Tune in on July 24-25 to exciting talks and activities from Eterna researchers, developers,
        players, and other world-class experts.
      </p>
      <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        href="https://stanford.zoom.us/meeting/register/tJcvdumspjouGNHW_HAviA1ic_tuAvheeoTM"
      >
        Register
      </b-button>
      <b-button
        class="button"
        variant="secondary"
        size="lg"
        to="/eternacon"
      >
        Schedule &amp; Info
      </b-button>
      <div class="d-flex" style="margin-top: 22px;">
        <a href="https://eternagame.org/news/10865634">
          <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
            <i class="arrow_right"></i>Sign up to give a presentation or run a session
          </p>
        </a>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import bgimage from '@/assets/about/logo_eternacon.svg';

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
    padding: 50px;
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
      rgba(0, 0, 0, 0.7) 35%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }
</style>
