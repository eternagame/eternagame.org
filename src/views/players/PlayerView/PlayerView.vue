<template>
  <EternaPage :title="$t('player-view:title')">
    <div v-if="pageData">
      <div class="page-content">
        <PlayerHeader :user="pageData.user" :follows="pageData.follows" />

        <PlayerAboutMe
          v-if="!$route.query.tab_type || $route.query.tab_type == 'about'"
          :user="pageData.user"
        />

        <PlayerLatest
          v-if="$route.query.tab_type == 'synthesized'"
          :title="$t('player-view:synthesized-rnas')"
          :latest="pageData.synthesized"
        >
          <template v-slot:theader>
            <tr class="table-primary">
              <th scope="col">{{ $t('player-view:rna-title') }}</th>
              <th scope="col">{{ $t('player-view:score') }}</th>
            </tr>
          </template>
          <template v-slot:trow="slotProps">
            <tr>
              <td>
                <!-- TODO: need to include filters e.g. https://eternagame.org/game/browse/6296743/?filter1=Id&filter1_arg1=6348941&filter1_arg2=6348941 -->
                <a :href="`https://eternagame.org/game/browse/${slotProps.item.puznid}/`">
                  {{ slotProps.item.title }}
                </a>
              </td>
              <td class="font-weight-bold">{{ slotProps.item.score || 'Waiting' }}</td>
            </tr>
          </template>
        </PlayerLatest>

        <PlayerLatest
          v-if="$route.query.tab_type == 'latest'"
          :title="$t('player-view:latest-activity')"
          :latest="pageData.latest_puzzles"
        >
          <template v-slot:theader>
            <tr class="table-primary">
              <th scope="col">{{ $t('player-view:latest-played-puzzles') }}</th>
            </tr>
          </template>
          <template v-slot:trow="slotProps">
            <tr>
              <td class="puzzle-link">
                <a :href="`/puzzle/${slotProps.item.puznid}/`">{{ slotProps.item.title }}</a>
              </td>
            </tr>
          </template>
        </PlayerLatest>
      </div>
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1>
    </div>
    <template #sidebar="{ isInSidebar }">
      <!-- TODO: replace=true does what? -->
      <DropdownSidebarPanel
        :options="options"
        paramName="tab_type"
        :replace="true"
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
  import PlayerLatest from './components/PlayerLatest.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const ROUTE = `/get/?type=user&uid=${route.params.uid}`;
    const res = (
      await http.get(ROUTE, {
        params: {
          tab_type: route.query.tab_type,
        },
      })
    ).data.data as UsersData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerLatest,
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
