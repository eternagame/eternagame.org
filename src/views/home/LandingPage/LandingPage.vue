<template>
  <div class="page">

    <HeroSection />

    <!-- Covid-19 Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <img
          src="https://eternagame.org/sites/default/files/badge-openASO_0.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-4"
          alt="Fight toxic RNAs with Eterna"
        />
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">OpenASO: RNA Rescue</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 1.2rem;">
            How can playing a game help address rare genetic diseases? The OpenASO Challenge is
            a research initiative aimed at developing innovative design principles for RNA-based
            therapeutics that can effectively target and neutralize the harmful effects of toxic
            RNAs involved in genetic diseases, including many cancers. Visit the
            <router-link to="/challenges/11546273">challenge page</router-link> to learn more and
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
  .page {
    margin-top: 120px;
  }

  .eternacon-banner {
    width: 100%;
    max-width: 1200px;
  }
</style>
