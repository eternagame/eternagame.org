<template>
  <EternaPage v-if="player" title="Player Profile">
    <div class="page">
      <div class="d-flex">
        <img
          class="d-block d-sm-none rounded-circle player-image"
          :src="picture"
          alt="player-image"
        />
        <img
          class="d-none d-sm-block rounded-circle player-image-large"
          :src="picture"
          alt="player-image"
        />
        <div class="player-details">
          <div class="d-flex justify-content-between">
            <h1 class="player-name">{{ playerName }}</h1>
            <div class="d-sm-flex">
              <div class="order-sm-2"><p>--Message---</p></div>
              <div class="order-sm-1"><p>---Following---</p></div>
            </div>
          </div>
          <div class="d-none d-sm-block">
            <div class="d-flex justify-content-between">
              <p class="player-rank">Global Rank: #{{ playerRank }}</p>
              <p>--------icons-----------------</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block d-sm-none">
        <div class="d-flex flex-wrap justify-content-between">
          <p class="player-rank">Global Rank: #{{ playerRank }}</p>
          <p>--------icons-----------------</p>
        </div>
      </div>
      <div></div>

      <hr class="top-border" />

      <div class="d-flex">
        <div>
          <h4 class="about-me">
            About Me
          </h4>
          <p v-html="aboutMeText" class="about-me-text"></p>
        </div>
        <p>Featured Achievement</p>
      </div>
    </div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';

  //   import LabViewData, { LabData } from './types';
  import PageDataMixin from '@/mixins/PageData';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class PlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get player() {
      return {};
    }

    private options: Option[] = [
      { value: 'about', text: 'About' },
      { value: 'achievements', text: 'Achievements' },
      { value: 'synthesized', text: 'Synthesized RNAs' },
      { value: 'latest', text: 'Latest Activity' },
      { value: 'created', text: 'Created Puzzles' },
      { value: 'resources', text: 'Resources' },
    ];

    private picture: string = `${process.env.VUE_APP_API_BASE_URL}/sites/default/files/pictures/picture-133043.png`;

    // private picture: string = 'https://graph.facebook.com/10220887579400634/picture?type=normal';

    private playerName: string = 'Iroppy';

    private playerRank: string = '1';

    private aboutMeText: string = `Live in sometimes hot/often very cold land of 10,000 lakes (Minnesota).
      Univ of Chicago BA/MBA <br/>
      —now on 2nd career as software product manager at IBM.<br/>
      —first career was public & non-profit financial management<br/>
      Passions: racquetball, science, great software, sci-fi, Go, social justice, eteRNA.<br/>
      <br/>
      <b>ete-RNA-L eteRNA wisDOM:</b>
      • When in doubt (or bored) strengthen.<br/>
      • When in doubt on Switch Puzzles: Reset!<br/>
      • When an designer titles a puzzle “ugly”, take their word for it.<br/>
      • When an designer titles a puzzle something and “easy”, run away.<br/>
      • Credit your mods.<br/>
      • Lab results are in the mail.<br/>
      • Going on a diet to reduce a few GCs.<br/>
      • These aren’t the GUs you are looking for. Move along…<br/>
      <br/><br/>

      <b>ETERNACON 2015!</b>`;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .page {
    background-color: $med-dark-blue;
    padding: 25px;
  }

  .about-me {
    font-size: 1.375rem;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
  }

  .player-name {
    font-size: 1.625rem;
    font-weight: bold;
    margin-bottom: 0px;
    width: 300px;
  }

  .player-details {
    margin-top: 20px;
    width: 100%;
  }

  .player-rank {
    font-size: 1.0625rem;
    font-weight: bold;
    margin-bottom: 0px;
    margin-top: 10px;
    margin-right: 250px;
  }

  .player-image {
    object-fit: scale-down;
    margin-right: 20px;
    width: 61.58px;
    height: 61.58px;
  }

  .player-image-large {
    width: 115.93px;
    height: 115.93px;
    object-fit: scale-down;
    margin-right: 20px;
  }
</style>
