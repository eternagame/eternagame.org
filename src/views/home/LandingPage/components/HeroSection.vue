<template>
  <div class="hero-wrapper">
    <div class="hero">
      <div class="hero-background">
        <img
          class="hero-background-tiles"
          src="@/assets/front-page/img/landing-page-tiling.svg"
          alt=""
        />
        <img
          class="background-graphic design-scene"
          src="@/assets/front-page/img/design-scene.svg"
          alt="An illustration of a player playing Eterna in the design interface"
        />
        <img
          class="background-graphic vote-scene"
          src="@/assets/front-page/img/vote-scene.svg"
          alt="An illustration of players looking at solutions in the Eterna design browser, with one of them putting a vote into a ballot box"
        />
        <img
          class="background-graphic analyze-scene"
          src="@/assets/front-page/img/analyze-scene.svg"
          alt="An illustration of a player looking at details of an Eterna design and another player looking at a chart of data"
        />
        <img
          class="background-graphic analyze-scene mobile"
          src="@/assets/front-page/img/analyze-scene-mobile.svg"
          alt="An illustration of a player looking at details of an Eterna design"
        />
        <img
          class="background-graphic test-scene"
          src="@/assets/front-page/img/test-scene.svg"
          alt="An illustration of a researcher on a latter looking into a giant microscope, a researcher with a giant pipette and plate of test tubes, and a researcher operating a giant analysis machine with a robotic arm pulling out a test tube"
        />
        <img
          class="background-graphic test-scene mobile"
          src="@/assets/front-page/img/test-scene-mobile.svg"
          alt="An illustration of a researcher on a latter looking into a giant microscope"
        />
      </div>

      <b-container class="hero-content">
        <b-row class="row">
          <b-col lg="3" md="2" sm="1" />
          <b-col lg="6" md="8" sm="10" >
            <div style="text-align: center;">
              <h2 class="content-heading">
                {{ $t('hero-section:heading') }}
              </h2>
              <b-button
                variant="primary"
                size="lg"
                to="/puzzles/11098074/play"
                class="button"
                >{{ $t('hero-section:main-action') }}</b-button
              >
              <b-button variant="secondary" size="lg" to="/about" class="ml-3 button">
                {{ $t('hero-section:secondary-action') }}
              </b-button>
              <br /><br />
              <a href="https://apps.apple.com/us/app/id1513216417" target="_blank"><img src="@/assets/front-page/img/btn_download_ios.svg" alt="Download on the app store" style="width:128px; padding-right:0.5rem;" /></a>
              <a href="https://play.google.com/store/apps/details?id=org.eternagame.mob" target="_blank"><img src="@/assets/front-page/img/btn_download_play.png" alt="Get it on google play" style="width:135px" /></a>
            </div>
          </b-col>
          <b-col lg="3" md="2" sm="1" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class HeroSection extends Vue {
    BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .hero {
    position: relative;
    min-width: 100%;
    min-height: 100%;
    background: #21508C;
  }

  .hero-background {
    position: relative;
    background: #21508C;
    max-width: 1140px;
    min-height: 700px;
    margin-left: auto;
    margin-right: auto;

    &-tiles {
      position: relative;
      left: 50%;
      width: 1500px;
      transform: translateX(-50%);

      @include media-breakpoint-only(md) {
        width: 100%;
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }

  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .background-graphic {
    position: absolute;
    pointer-events: none;

    @include media-breakpoint-up(xs) {
      height: 130px;
    }

    @include media-breakpoint-up(sm) {
      height: 170px;
    }

    @include media-breakpoint-up(md) {
      height: 200px;
    }

    @include media-breakpoint-up(lg) {
      height: 230px;
    }

    @include media-breakpoint-up(xl) {
      height: 250px;
    }

    &.design-scene {
      top: 2vh;
      left: 1vh;
    }

    &.vote-scene {
      top: 3vh;
      right: 3vh;

      @include media-breakpoint-down(sm) {
        top: 3vh;
        right: 3vh;
      }
    }

    &.analyze-scene {
      bottom: 2vh;
      left: 2vh;

      @include media-breakpoint-down(sm) {
        display: none;
      }

      &.mobile {
        display: none;

        @include media-breakpoint-down(sm) {
          display: block;
          bottom: 3vh;
          left: 3vh;
        }
      }
    }

    &.test-scene {
      bottom: 1vh;
      right: 2vh;

      @include media-breakpoint-down(sm) {
        display: none;
      }

      &.mobile {
        display: none;

        @include media-breakpoint-down(sm) {
          display: block;
          bottom: 3vh;
          right: 3vh;

        }
      }
    }
  }


  @media only screen and (max-width: 600px) {
    video {
      display:none;
    }
    h2 {
      font-size: 2rem;
    }
  }

  .hero-wrapper {
    background-color: black;
  }

  .btn-lg {
    font-size: 21px;
  }

  .content-heading, .content-subheading {
    margin-bottom: 26.25px;
  }

  .content-heading {
    font-size: 2rem;
    font-weight: 700;

    @include media-breakpoint-down(xs) {
      font-size: 1.5rem;
    }
  }

  .content-subheading {
    font-size: 1.2rem;

    @include media-breakpoint-down(xs) {
      font-size: 1rem;
    }
  }

  h2,
  h4 {
    font-weight: normal;
  }

  .button {
    @include media-breakpoint-up(xs) {
      margin-top: 10px;
    }
  }
</style>
