<template>
  <EternaPage title="Player Profile">
    <div class="page-content">
      <PlayerHeader @submit-data="submit" />
      <hr class="top-border" />
      <PlayerAboutMe />
      <hr class="top-border" />
      <PlayerEditCredentials
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
  import PlayerData from './types';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerEditCredentials,
    },
  })
  export default class EditProfile extends Vue {
    get user() {
      return this.$vxm.user.userDetails;
    }

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
      this.privateMessagesNotify = false;
      this.newNewsPostsNotify = false;
    }

    private newAboutMeText: string = '';

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
