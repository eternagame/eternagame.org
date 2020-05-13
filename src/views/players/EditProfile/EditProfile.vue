<template>
  <EternaPage :title="`${$t('Edit Profile')} ${user.name}`">
    <div class="page-content">
      <EditPlayerHeader @submit-data="submit" @set-picture="setPicture" />
      <hr class="top-border" />
      <EditPlayerAboutMe @set-profile="setProfile" @set-section="setSection" />
      <hr class="top-border" />
      <EditPlayerCredentials
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
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Notifications from 'vue-notification';
  // @ts-ignore
  import get from 'lodash.get';
  import EditPlayerHeader from './components/EditPlayerHeader.vue';
  import EditPlayerAboutMe from './components/EditPlayerAboutMe.vue';
  import EditPlayerCredentials from './components/EditPlayerCredentials.vue';
  import { Section } from './types';

  const EDIT_PROFILE = '/login/?type=edit';

  Vue.use(Notifications);

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      EditPlayerHeader,
      EditPlayerAboutMe,
      EditPlayerCredentials,
    },
  })
  export default class EditProfile extends Vue {
    get user() {
      return this.$vxm.user.userDetails;
    }

    get follows() {
      return this.$vxm.user.userDetails;
    }

    submit() {
      const data: object = {};
      if (this.newPassword) data.pass = this.newPassword as string;
      if (this.privateMessagesNotify) data.profile_mail_notification = this.privateMessagesNotify;
      if (this.newNewsPostsNotify) data.profile_blog_mail_notification = this.newNewsPostsNotify;
      if (this.profile) data.profile_profile = this.profile;
      if (this.picture) data.picture_upload = this.picture;

      axios
        .post(EDIT_PROFILE, data)
        .then(() => {} /* window.location.reload() */)
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
      this.newNewsPostsNotify = notify;
    }

    setMessages(notify: boolean) {
      this.privateMessagesNotify = notify;
    }

    setProfile(text: string) {
      this.profile = text;
    }

    cancel() {
      this.newAboutMeText = '';
      this.newPassword = '';
      this.privateMessagesNotify = false;
      this.newNewsPostsNotify = false;
    }

    private newAboutMeText: string = '';

    private profile: string = '';

    private picture: string = '';

    private sectionTitle: string = '';

    private sectionText: string = '';

    private newPassword: string = '';

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
