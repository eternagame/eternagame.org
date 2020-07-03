<template>
  <EternaPage :title="$t('player-view:title')">
    <div v-if="fetchState.firstFetchComplete">
      <div class="page-content">
        <PlayerHeader :user="user" :followList="follow" />

        <PlayerAboutMe
          v-if="!$route.query.tab_type || $route.query.tab_type == 'about'"
          :user="user"
        />

        <div class="m-3" v-if="$route.query.tab_type == 'achievements'">
          <hr class="top-border" />
          <h4 class="title mb-4">{{ $t('side-panel-options:achievements') }}</h4>
          <Gallery :xs="6" :sm="4" :md="2">
            <AchievementCard
              v-for="(achievement, key) in achievements"
              :key="key"
              v-bind="achievement"
            />
          </Gallery>
        </div>

        <PlayerTable
          v-if="$route.query.tab_type == 'synthesized'"
          :title="$t('player-view:synthesized-rnas')"
          :entries="synthesized"
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
                <!--eslint-disable-next-line max-len-->
                <a :href="`${BASE_URL_PREFIX}/game/browse/${slotProps.item.puznid}/`">
                  {{ slotProps.item.title }}
                </a>
              </td>
              <td class="font-weight-bold">{{ slotProps.item.score || 'Waiting' }}</td>
            </tr>
          </template>
        </PlayerTable>

        <PlayerTable
          v-if="$route.query.tab_type == 'latest'"
          :title="$t('player-view:latest-activity')"
          :entries="latestPuzzles"
        >
          <template v-slot:theader>
            <tr class="table-primary">
              <th scope="col">{{ $t('player-view:latest-played-puzzles') }}</th>
            </tr>
          </template>
          <template v-slot:trow="slotProps">
            <tr>
              <td class="puzzle-link">
                <a :href="`/puzzles/${slotProps.item.puznid}/`">{{ slotProps.item.title }}</a>
              </td>
            </tr>
          </template>
        </PlayerTable>

        <PlayerTable
          v-if="$route.query.tab_type == 'created'"
          :title="$t('player-view:created-puzzles')"
          :entries="createdPuzzles"
        >
          <template v-slot:theader>
            <tr class="table-primary">
              <th scope="col">{{ $t('player-view:created-puzzles') }}</th>
            </tr>
          </template>
          <template v-slot:trow="slotProps">
            <tr>
              <td class="puzzle-link">
                <a :href="`/puzzles/${slotProps.item.id}/`">{{ slotProps.item.title }}</a>
              </td>
            </tr>
          </template>
        </PlayerTable>

        <!-- TODO: Implement pagination so large tables don't take forever. -->
        <PlayerTable
          v-if="$route.query.tab_type == 'cleared'"
          :title="$t('player-view:cleared-puzzles')"
          :entries="clearedPuzzles"
        >
          <template v-slot:theader>
            <tr class="table-primary">
              <th scope="col">{{ $t('player-view:cleared-puzzles') }}</th>
            </tr>
          </template>
          <template v-slot:trow="slotProps">
            <tr>
              <td class="puzzle-link">
                <a :href="`/puzzles/${slotProps.item.id}/`">{{ slotProps.item.title }}</a>
              </td>
            </tr>
          </template>
        </PlayerTable>
      </div>
    </div>
    <div v-else>
      <Preloader />
    </div>
    <template #sidebar="{ isInSidebar }">
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
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import {
    UserData,
    UserResponse,
    FollowItem,
    LatestPuzzle,
    ClearedPuzzle,
    CreatedPuzzle,
    SynthesizedDesign,
    ProfileAchievement
  } from '@/types/common-types';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';
  import PlayerTable from './components/PlayerTable.vue';
  import AchievementCard from './components/AchievementCard.vue';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerTable,
      AchievementCard,
      Preloader,
    },
  })
  export default class PlayerView extends Mixins(FetchMixin) {
    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;

    private options: Option[] = [
      { value: 'about', text: 'side-panel-options:about' },
      { value: 'achievements', text: 'side-panel-options:achievements' },
      { value: 'synthesized', text: 'side-panel-options:synthesized' },
      { value: 'created', text: 'side-panel-options:created' },
      { value: 'latest', text: 'side-panel-options:latest' },
      { value: 'cleared', text: 'side-panel-options:cleared' },
    ];

    user: UserData | null = null;

    follow: FollowItem[] = [];

    latestPuzzles: LatestPuzzle[] = [];

    clearedPuzzles: ClearedPuzzle[] = [];

    createdPuzzles: CreatedPuzzle[] = [];

    synthesized: SynthesizedDesign[] = [];

    achievements: {[name: string]: ProfileAchievement} = {};

    async fetch() {
      const ROUTE = `/get/?type=user&uid=${this.$route.params.uid}`;
      // Achievements are provided when no tab_type is specified.
      const tab_type = this.$route.query.tab_type === 'achievements' ? 'about' : this.$route.query.tab_type;
      const res = (await this.$http.get(ROUTE, { params: { tab_type } })).data.data as UserResponse;
      this.user = res.user;
      this.follow = res.follow;
      this.latestPuzzles = res.latest_puzzles || [];
      this.createdPuzzles = res.created_puzzles || [];
      this.synthesized = res.synthesized || [];
      this.achievements = res.achievements || {};
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
