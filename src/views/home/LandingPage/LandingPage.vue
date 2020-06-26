<template>
  <div class="page">
    <VideoSection />

    <!-- Covid-19 Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">OpenVaccine: Eterna takes on COVID-19</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 22px;">
            With the onset of the COVID-19 pandemic, the Eterna project is looking to harness online
            gamers toward a solution. Their mission? To develop mRNA vaccines stable enough to be deployed to everyone in the world and not just a privileged few. For more info, see
            the <router-link to="/news/9804036/">announcement</router-link> and
            <a href="https://challenges.eternagame.org/">crowdfunding campaign</a>.
          </p>
          <p class="mb-0"></p>
        </div>
        <img
          src="https://eternagame.org/puzzle-progression/badges/badge_openvaccine_100.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-4"
          alt="Fight COVID-19 with Eterna"
        />
      </div>
    </div>
    <!-- End Promo -->


    <!-- NOVA Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <img
          src="/puzzle-progression/badges/badge_nova_large.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-3"
          alt="Learn about RNA with NOVA" border="0"
        />
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">Learn more about RNA</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 22px;">
            Eterna is proud to partner with NOVA Labs to help accelerate the fight against the coronavirus. Learn about RNA vaccines and viruses from <a href="https://www.pbs.org/wgbh/nova/video/decoding-covid-19/" target="_blank">NOVA</a>. Check out the <a href="https://www.pbs.org/wgbh/nova/labs/lab/rna/" target="_blank">RNA VirtuaLab</a> to get a crash course on what you can do to help. Then, unlock lab access to join the OpenVaccine challenge!
          </p>
          <p class="mb-0"></p>
        </div>
      </div>
    </div>
    <!-- End Promo -->


    <!-- BLM Letter (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
    <div style="padding:15px;background:black;">
      <div class="media row">
        
        <div class="media-body p-4">
          
            <h3 class="mt-0" style="font-weight: bold;">Black lives matter.</h3>
            <p style="font-size: 16px;">
  Disparities endemic to American society and the world at large affect Eterna. Unequal access to education, to technology, and to free time limits who can contribute to Eterna.
  <br /><br />
  Our current goal is to design refrigerator-stable mRNA vaccines that would accelerate COVID-19 immunization to all communities. The winning solutions could come from anywhere in the world, from anyone who possesses a gift for puzzles.
  <br /><br />
  For OpenVaccine and all other current and future challenges, Eterna is therefore committed to cultivating a diverse playerbase both to find solutions that have eluded experts and to ethically set the research priorities of its worldwide projects.
  <br /><br />
  Soon Eterna will be playable on mobile phones, making our reach global and more accessible to players without laptop/desktop devices. Eterna is accelerating several new programs and partnerships that aim to increase accessibility in all senses and to increase participation in and leadership within Eterna from disadvantaged groups. We strive to be the scientific discovery game of the people.
  <br /><br />
  Learn more about the issues: <a href="https://blacklivesmatter.com/what-matters-2020/" target="_blank">blacklivesmatter.com//what-matters-2020/</a></p>
          
        </div>
        <img
          src="https://blacklivesmatter.com/wp-content/themes/blm/dist/images/logo-black-lives-matter.png"
          class="align-self-center mr-3 mb-3 col-sm-12 col-lg-3"
          alt="Black Lives Matter" border="0"
        /><br />
      </div>
      </div>
    </div>
    <!-- End Promo -->

    <DocsSection />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DocsSection from './components/DocsSection.vue';
  import VideoSection from './components/VideoSection.vue';
  
  @Component({
    components: {
      DocsSection,
      VideoSection,
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
</style>
