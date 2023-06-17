<template>
  <div class="page">

    <HeroSection />

    <!-- Lab Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <img
          src="https://eternagame.org/puzzle-progression/badges/badge-openknot-100.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-4"
          alt="Design RNA Pseudoknots"
        />
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">OpenKnot: Building a Library of RNA Pseudoknots</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 1.2rem;">
            RNAs that form structures called pseudoknots are involved in many important biological processes, from regulating gene expression to catalyzing biochemical reactions. But scientists don't know much about how they form. Visit the
            <router-link to="/challenges/11843006">challenge page</router-link> to learn more and
            participate.
          </p>
          <p class="mb-0"></p>
        </div>
      </div>
    </div>
    <!-- End Promo -->

    <!-- NOVA Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">Learn more about RNA</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 1.2rem;">
            Eterna is proud to partner with NOVA Labs to help accelerate the fight against the
            coronavirus. Learn about RNA vaccines and viruses from
            <a href="https://www.pbs.org/wgbh/nova/video/decoding-covid-19/" target="_blank">NOVA</a>.
            Check out the <a href="https://www.pbs.org/wgbh/nova/labs/lab/rna/" target="_blank">RNA VirtuaLab</a>
            to get a crash course on what you can do to help. Then, unlock lab access to join our lab challenges!
          </p>
          <p class="mb-0"></p>
        </div>
        <img
          src="/puzzle-progression/badges/badge_nova_large.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-3"
          alt="Learn about RNA with NOVA" border="0"
        />
      </div>
    </div>
    <!-- End Promo -->

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
</style>
