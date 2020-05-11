<template>
  <EternaPage :title="$t('player-view:title')">
    <div v-if="pageData">
      <div class="page-content">
        <PlayerHeader :user="pageData.user" :follows="pageData.follows" />

        <PlayerAboutMe :user="pageData.user" />

        <PlayerSynthesized :synthesized="pageData.synthesized" />
      </div>
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1> 
    </div>
    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="tab_type"
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
  import PlayerSynthesized from './components/PlayerSynthesized.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const ROUTE = `/get/?type=user&uid=${route.params.uid}`;
    const res = (
      await http.get(ROUTE, {
        params: {
          tab_type: route.query.tab_type,
        },
      })
    ).data.data as UsersData;
    console.log('HI');
    console.log(res);
    return res;
  }

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerSynthesized,
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
