<template>
  <EternaPage v-if="pageData" :title="$t('player-view:title')">
    <div class="page-content">
      <PlayerHeader :user="pageData.user" :follows="pageData.follows" />

      <hr class="top-border" />

      <PlayerAboutMe :user="pageData.user" />
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
  import { UsersData } from '../types';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data as UsersData;
    return res;
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
