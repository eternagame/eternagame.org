<template>
  <PlayerHome :pageData="pageData" v-if="loggedIn" />
  <div class="page" v-else>
    <VideoSection />

    <!-- Covid-19 Promo (TODO: localize?)-->
    <div class="container bs-docs-section mt-5">
      <div class="media row">
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">Eterna takes on COVID-19</h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 22px;">
            With the onset of the COVID-19 pandemic, the Eterna project is looking to harness online
            gamers toward a solution. Their mission? To develop a safe mRNA vaccine as well as
            future challenges to create new antivirals and improved diagnostics. For more info, see
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
            Eterna is proud to partner with NOVA Labs to help accelerate the fight against the coronavirus. Check out the <a href="https://www.pbs.org/wgbh/nova/labs/lab/rna/" target="_blank">RNA VirtuaLab</a> to get a crash course on what you can do to help. Then, unlock lab access to join the OpenVaccine challenge!
          </p>
          <p class="mb-0"></p>
        </div>
      </div>
    </div>
    <!-- End Promo -->

    <DocsSection />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import PageDataMixin from '@/mixins/PageData';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import PlayerHome from './PlayerHome.vue';
  import DocsSection from './components/DocsSection.vue';
  import VideoSection from './components/VideoSection.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const me = (await http.get('/get/?type=me')).data.data;
    const roadmap = (await http.get('/get/?type=side_project_roadmap')).data.data;
    const carousel = (await http.get('/get/?type=carousel')).data.data;
    const potw = (await http.get('/get/?type=puzzle_of_the_week')).data.data;
    const res = { ...me, ...roadmap, ...carousel, potw };
    return res;
  }

  @Component({
    components: {
      DocsSection,
      VideoSection,
      PlayerHome,
    },
  })
  export default class LandingPage extends Mixins(PageDataMixin(fetchPageData)) {
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
