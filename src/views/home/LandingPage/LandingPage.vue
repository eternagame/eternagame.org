<template>
  <div class="page">

    <HeroSection />

    <b-container>
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
          <h5 class="h4 mt-3">Self-reproducing RNA</h5>
          <p>The group I intron (GII) of the Azoarcus bacterium is an RNA that has been shown to self-reproduce experimentally, by catalyzing the ligration (inducting the joining) of RNA fragments into a copy of itself. Researchers aim to show that many such molecules exist, which would considerably enhance the plausibility of an RNA origin of life.</p>
          <b-btn to="/labs/13468245" variant="primary" class="mt-2">Enter lab</b-btn>
        </div>
        <img src="@/assets/front-page/img/thumb-openlife.png" alt="">
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
        <!--div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-researchers.jpg" alt="">
          <div class="card-body">
            <h5>Info for Researchers</h5>
          </div>
        </div-->
      </div>
    </b-container>

    <DocsSection />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import DocsSection from './components/DocsSection.vue';
  import HeroSection from './components/HeroSection.vue';

  @Component({
    components: {
      DocsSection,
      HeroSection,
    },
  })
  export default class LandingPage extends Vue {
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

  .eternacon-banner {
    width: 100%;
    max-width: 1200px;
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
