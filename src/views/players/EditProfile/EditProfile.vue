<template>
  <EternaPage :title="`${$t('edit-profile:title')} ${user.name}`">
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
    <Preloader v-else />

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
  import Notifications from 'vue-notification';
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

    async submit() {
      const data = new FormData();
      if (this.newPassword) {
        data.set('pass[pass1]', this.newPassword as string);
        data.set('pass[pass2]', this.newPassword as string);
      }
      data.set('profile_mail_notification', this.privateMessagesNotify ? 'on' : 'off');
      data.set('profile_news_mail_notification', this.newNewsPostsNotify ? 'on' : 'off');
      data.set('profile_blog_mail_notification', this.newNewsPostsNotify ? 'on' : 'off');
      data.set('profile_profile', this.profile);
      data.set('mail', this.email);
      if (this.picture) data.append(`files[picture_upload]`, this.picture);
      data.set('type', 'edit');

      this.$http.post(EDIT_PROFILE, data, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
        .then(() => {
          /* his.$router.push(`/players/${this.$vxm.user.uid}`) */
          window.location.reload();
        })
        .catch(error =>
          this.$notify({
            title: 'Error',
            text: error?.message,
          }),
        );
    }

    setPicture(picture: Blob) {
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

    private picture: Blob | null = null;

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
