<template>
  <EternaPage v-if="pageData" title="Player Profile">
    <div class="page-content">
      <PlayerHeader :pageData="pageData" />

      <hr class="top-border" />

      <PlayerAboutMe :pageData="pageData" />
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
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
    },
  })
  export default class PlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get pageData() {
      return {
        playerRank: '1',
        playerName: 'Iroppy',
        profilePicture: `${process.env.VUE_APP_API_BASE_URL}/sites/default/files/pictures/picture-133043.png`,
        reward: '2,343,056',
        date: 'Jan 2011',
        testTube: '1187',
        picture:
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/B10C638C-EA96-425B-9F67-01491687BB87.png',
        featuredAchievement:
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/148A95F9-9C14-4492-81DB-F90CBA0EA90B.png',
        aboutMeText: `Live in sometimes hot/often very cold land of 10,000 lakes (Minnesota).
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

      <b>ETERNACON 2015!</b>`,
      };
    }

    private options: Option[] = [
      { value: 'about', text: 'About' },
      { value: 'achievements', text: 'Achievements' },
      { value: 'synthesized', text: 'Synthesized RNAs' },
      { value: 'latest', text: 'Latest Activity' },
      { value: 'created', text: 'Created Puzzles' },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
