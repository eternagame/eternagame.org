<template>
  <EternaPage :title="`${$t('Edit Profile')} ${user.name}`">
    <div class="page-content" v-if="loaded">
      <EditPlayerHeader @submit-data="submit" @set-picture="setPicture" />
      <hr class="top-border" />
      <EditPlayerAboutMe @set-profile="setProfile" @set-section="setSection" />
      <hr class="top-border" />
      <EditPlayerCredentials
        @set-password="setPassword"
        @set-news="setNews"
        @set-messages="setMessages"
        @set-email="setEmail"
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
    <Preloader v-else/>

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
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Notifications from 'vue-notification';
  // @ts-ignore
  import get from 'lodash.get';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import EditPlayerHeader from './components/EditPlayerHeader.vue';
  import EditPlayerAboutMe from './components/EditPlayerAboutMe.vue';
  import EditPlayerCredentials from './components/EditPlayerCredentials.vue';
  import { Section } from './types';

  const EDIT_PROFILE = '/login/';

  Vue.use(Notifications);

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      EditPlayerHeader,
      EditPlayerAboutMe,
      EditPlayerCredentials,
      Preloader,
    },
  })
  export default class EditProfile extends Vue {
    get user() {
      return this.$vxm.user.userDetails;
    }

    get follows() {
      return this.$vxm.user.userDetails;
    }

    async beforeMount() {
      // HACK: Update the current user object
      await this.$vxm.user.authenticate();
      this.loaded = true;
    }

    private loaded = false;

    submit() {
      const data: any = {};
      if (this.newPassword) {
        data['pass[pass1]'] = this.newPassword as string;
        data['pass[pass2]'] = this.newPassword as string;
      }
      data.profile_mail_notification = this.privateMessagesNotify ? 'on' : 'off';
      data.profile_news_mail_notification = this.newNewsPostsNotify ? 'on' : 'off';
      data.profile_blog_mail_notification = this.newNewsPostsNotify ? 'on' : 'off';
      data.profile_profile = this.profile;
      data.mail = this.email;
      if (this.picture) data.picture_upload = this.picture;
      data.type = 'edit';

      axios
        .post(EDIT_PROFILE, new URLSearchParams(data))
        .then(() => {
          /* his.$router.push(`/players/${this.$vxm.user.uid}`) */
          window.location.reload();
        })
        .catch(error => this.$notify({
          title: 'Error',
          text: get(error, 'message'),
        }));
    }

    setPicture(picture: string) {
      this.picture = picture;
    }

    setPassword(password: string) {
      this.newPassword = password;
    }

    setSection(section: Section) {
      this.sectionTitle = section.title;
      this.sectionText = section.text;
    }

    setNews(notify: boolean) {
      console.log('news', notify);
      this.newNewsPostsNotify = notify;
    }

    setMessages(notify: boolean) {
      console.log('messages', notify);
      this.privateMessagesNotify = notify;
    }

    setProfile(text: string) {
      this.profile = text;
    }

    setEmail(email: string) {
      this.email = email;
    }

    cancel() {
      this.newAboutMeText = '';
      this.newPassword = '';
      this.privateMessagesNotify = false;
      this.newNewsPostsNotify = false;
      this.email = '';
    }

    private newAboutMeText: string = '';

    private profile: string = '';

    private picture: string = '';

    private sectionTitle: string = '';

    private sectionText: string = '';

    private newPassword: string = '';

    private email: string = '';

    private privateMessagesNotify: boolean = false;

    private newNewsPostsNotify: boolean = false;

    private options: Option[] = [
      { value: 'about', text: 'side-panel-options:about' },
      { value: 'achievements', text: 'side-panel-options:achievements' },
      { value: 'synthesized', text: 'side-panel-options:synthesized' },
      { value: 'latest', text: 'side-panel-options:latest' },
      { value: 'created', text: 'side-panel-options:created' },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
