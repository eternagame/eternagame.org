<template>
  <EternaPage v-if="pageData" title="Player Profile">
    <div class="page-content">
      <PlayerHeader :pageData="pageData" @submit-data="submit" />
      <hr class="top-border" />
      <PlayerAboutMe :pageData="pageData" />
      <hr class="top-border" />
      <PlayerEditCredentials
        :pageData="pageData"
        @set-password="setPassword"
        @set-news="setNews"
        @set-messages="setMessages"
      />
      <div class="flex" style="margin-top:10px">
        <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit">{{
          $t('edit-profile:save')
        }}</b-button>
        <b-button
          type="submit"
          style="margin-left:10px"
          variant="outline-secondary"
          @click="cancel"
          >{{ $t('edit-profile:cancel') }}</b-button
        >
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
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  // @ts-ignore
  import get from 'lodash.get';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';
  import PlayerEditCredentials from './components/PlayerEditCredentials.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerEditCredentials,
    },
  })
  export default class EditProfile extends Mixins(PageDataMixin(fetchPageData)) {
    submit() {
      alert('submitting');
    }

    setPassword(password: string) {
      this.newPassword = password;
    }

    setNews(notify: boolean) {
      this.newNewsPostsNotify = notify;
    }

    setMessages(notify: boolean) {
      this.privateMessagesNotify = notify;
    }

    cancel() {
      this.newAboutMeText = '';
      this.newPassword = '';
      this.privateMessagesNotify = get(this, 'pageData.privateMessageEmailNotifications');
      this.newNewsPostsNotify = get(this, 'pageData.newNewsPostsEmailNotifications');
    }

    get pageData() {
      return {
        playerRank: '1',
        playerName: 'Iroppy',
        profilePicture: `${process.env.VUE_APP_API_BASE_URL}/sites/default/files/pictures/picture-133043.png`,
        reward: '2,343,056',
        date: 'Jan 2011',
        testTube: '1187',
        privateMessageEmailNotifications: true,
        newNewsPostsEmailNotifications: false,
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

    private newAboutMeText: string = '';

    private newPassword: string = '';

    private privateMessagesNotify: boolean = get(this, 'pageData.privateMessageEmailNotifications');

    private newNewsPostsNotify: boolean = get(this, 'pageData.newNewsPostsEmailNotifications');

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