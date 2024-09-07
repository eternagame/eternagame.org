<template>
  <div class="page">

    <HeroSection />
    <b-container>
      <h4 class="h2" id="workflow-h" style="text-align: center;">How It Works</h4>
      <Swiper id="workflow" :options="swiperOptions">
        <SwiperSlide class="workflow-stage">
          <div class="stage-content">
            <img
              src="@/assets/front-page/img/design-scene-notitle.svg"
              alt="An illustration of a player playing Eterna in the design interface"
            />
            <div class="stage-details">
              <h5>Solve Puzzles</h5>
              <p>Players create designs to solve research problems by solving puzzles.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="workflow-stage">
          <div class="stage-content">
            <img
              src="@/assets/front-page/img/test-scene-notitle.svg"
              alt="An illustration of a player playing Eterna in the design interface"
            />
            <div class="stage-details">
              <h5>Test</h5>
              <p>Scientists test player solutions in real wet-lab experiments.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="workflow-stage">
          <div class="stage-content">
            <img
              src="@/assets/front-page/img/analyze-scene-notitle.svg"
              alt="An illustration of a player playing Eterna in the design interface"
            />
            <div class="stage-details">
              <h5>Analyze</h5>
              <p>Both players and experts use data from experiments to improve their designs and build new tools.</p>
            </div>
          </div>
        </SwiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </Swiper>

      <h4 class="h3 my-3" style="text-align: center;">Our Impact</h4>
      <div class="card-deck impact">
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-tech.jpg" alt="">
          <div class="card-body">
            <h5>Technology</h5>
            <p>Players and researchers have created design tools, predictive AI models, large data sets, and DNA template libraries. All technologies are freely available for non-commercial use, and commercial licenses support Eterna's ongoing research.</p>
            <router-link to="/tech">Learn more</router-link>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-pubs.jpg" alt="">
          <div class="card-body">
            <h5>Publications</h5>
            <p>Eterna players have contributed to over 30 scientific publications, including as lead authors, in journals such as <cite>Nature Communications</cite>, <cite>PLOS Computational Biology</cite>, and <cite>Proceedings of the National Academy of Sciences</cite>.</p>
            <router-link to="/publications">Learn more</router-link>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-openvaccine.jpg" alt="">
          <div class="card-body">
            <h5>OpenVaccine</h5>
            <p>During the pandemic, the Eterna community created and published designs for a more stable mRNA vaccine for COVID-19 optimized for new variants. Eterna's open challenges address several important areas of RNA medicine.</p>
            <router-link to="/challenges/10845741">Learn more</router-link>
          </div>
        </div>
      </div>

      <div class="card featured-lab">
        <div class="card-body">
          <h4 class="h6 text-uppercase">Featured Lab Challenge</h4>
          <h5 class="h4 mt-3">Broadly protective COVID mRNA vaccines for clinical tests</h5>
          <p>
            Help optimize a next generation COVID-19 vaccine for longer shelf life and broader distribution.
            Eight designs will be voted to advance to lab testing and, if successful, clinical tests.
          </p>
          <b-btn to="/labs/13571451" variant="primary" class="mt-2">Enter lab</b-btn>
        </div>
        <img src="@/assets/front-page/img/thumb-ov-clinical.png" alt="">
      </div>

      <h4 class="h3 my-3" style="text-align: center;">Explore Resources</h4>
      <div class="card-deck resources">
        <router-link to="/edu" class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-teaching.jpg" alt="">
          <div class="card-body">
            <h5>Teaching with Eterna</h5>
          </div>
        </router-link>
        <router-link to="/about" class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-about-rna.jpg" alt="">
          <div class="card-body">
            <h5>What is RNA?</h5>
          </div>
        </router-link>
        <router-link to="/researchers" class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-researchers.jpg" alt="">
          <div class="card-body">
            <h5>Info for Researchers</h5>
          </div>
        </router-link>
      </div>
    </b-container>

    <DocsSection />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  import DocsSection from './components/DocsSection.vue';
  import HeroSection from './components/HeroSection.vue';

  @Component({
    components: {
      DocsSection,
      HeroSection,
      Swiper,
      SwiperSlide
    },
  })
  export default class LandingPage extends Vue {
    swiperOptions = {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      slideToClickedSlide: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    };

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .page {
    margin-top: $navbar-height;
  }

  $workflow-margin: 80px;
  #workflow-h {
    margin-top: $workflow-margin;
  }

  #workflow {
    $arrow-margin: 40px;

    margin-bottom: $workflow-margin;

    mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      transparent 100%,
    );

    :deep(.swiper-pagination) {
      bottom: 0
    }

    :deep(.swiper-pagination-bullet) {
      border-radius: 2px;
      width: 55px;
      height: 8px;
    }

    .workflow-stage {
      width: 75%;
      height: auto;
      margin: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      .stage-content {
        gap: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px $arrow-margin;
      }

      img {
        max-width: 50%;
        height: 275px;
      }

      h5 {
        font-size: 30px;
        background-color: $med-dark-blue;
        padding: 6px 12px;
        width: fit-content;
        border-radius: 6px;
      }

      p {
        font-size: 22px;
      }

      &::after {
        position: absolute;
        left: calc(100% - $arrow-margin * .85);
        content: '→';
        font-size: 60px;
      }

      @include media-breakpoint-down(sm) {
        .stage-content {
          flex-direction: column;
          gap: 30px;
        }

        img {
          max-width: 100%;
          height: 250px;
        }
      }
    }

    .arrow {
      display: flex;
      font-size: 50px;
    }
  }

  .card {
    border: 0;
    border-radius: 8px;
    background-color: #21508c;
    margin: 20px 10px;

    .btn {
      border-radius: 6px;
      padding: 6px 35px;
      width: fit-content;
    }

    p {
      line-height: 1.25;
    }

    p, a {
      font-size: 16px;
    }
  }

  .card-deck {
    margin: 0 -10px;
    @include media-breakpoint-down(md) {
      display: block;
    }
  }

  .card-img-top {
    border-radius: 8px 8px 0 0;
  }

  .card-deck.impact {
    .card-img-top {
      height: 150px;
      object-fit: cover;
    }

    a {
      font-weight: bold;
    }
  }

  .card-deck.resources {
    .card-body {
      padding: .75rem
    }

    h5 {
      text-align: center;
    }
  }

  .card.featured-lab {
    margin: 40px 0;

    @include media-breakpoint-down(sm) {
      img {
        border-radius: 0 0 8px 8px;
      }
    }

    @include media-breakpoint-up(md) {
      flex-direction: row;

      img {
        flex-shrink: 1;
        width: 100%;
        object-fit: cover;
        border-radius: 0 8px 8px 0;
      }

      .card-body {
        flex-shrink: 2.5;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>
