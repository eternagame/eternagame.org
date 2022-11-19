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
          <b-modal
            id="subachievement-modal"
            hide-footer
            size="xl"
            centered
            header-border-variant="primary"
          >
            <Gallery :xs="6" :sm="4" :md="2">
              <AchievementCard
                v-for="(achievement, key) in subAchievements"
                :key="key"
                v-bind="achievement"
                :achievement="achievement"
                :isAchieved="isAchieved(achievement)"
                :showLevels="false"
              >
              </AchievementCard>
            </Gallery>
          </b-modal>
          <hr class="top-border" />
          <h4 class="title mb-4">
            {{ $t('side-panel-options:achievements') }}
          </h4>

          <Gallery :xs="6" :sm="4" :md="2">
            <AchievementCard
              v-for="(achievement, key) in filter(allAchievements, 'earnable')"
              :key="key"
              v-bind="computeAchievement(achievement)"
              :isAchieved="isAchieved(achievement)"
              :achievement="achievement"
              :completed="completed(achievement)"
              @expand="expand(achievement)"
            >
            </AchievementCard>
          </Gallery>
          <div v-if="filter(myAchievements, 'limited').length != 0">
            <hr class="top-border" />
            <h4 class="title mb-4">
              {{ 'Special Achievements' }}
            </h4>

            <Gallery :xs="6" :sm="4" :md="2">
              <AchievementCard
                v-for="(achievement, key) in filter(myAchievements, 'limited')"
                :key="key"
                v-bind="achievement"
                :isAchieved="isAchieved(achievement)"
                :achievement="achievement"
                :completed="completed(achievement)"
                @expand="expand(achievement)"
              >
              </AchievementCard>
            </Gallery>
          </div>
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
                <a
                  :href="`${BASE_URL_PREFIX}/game/browse/${slotProps.item.puznid}/`"
                >
                  {{ slotProps.item.title }}
                </a>
              </td>
              <td class="font-weight-bold">
                {{ slotProps.item.score || 'Waiting' }}
              </td>
            </tr>
          </template>
        </PlayerTable>

        <div v-if="$route.query.tab_type == 'latest'">
          <hr class="top-border" />
          <h4 class="title">{{ $t('player-view:latest-activity') }}</h4>

          <div class="page-content">
            <table style="width: 100%">
              <tbody>
                <Gallery>
                <template v-for="puzzle in puzzles">
                  <PuzzleCard
                    :key="puzzle.id"
                    :nid="puzzle.id"
                    v-bind="puzzle"
                    :is3d="puzzle['has3d'] === '1'"
                  />
                </template>
              </Gallery>
              </tbody>
            </table>
          </div>
          <Pagination :key="puzzles && puzzles.length" />
        </div>

        <div v-if="$route.query.tab_type == 'created'">
          <hr class="top-border" />
          <h4 class="title">{{ $t('player-view:created-puzzles') }}</h4>

          <div class="page-content">
            <table style="width: 100%">
              <tbody>
                <Gallery>
                <template v-for="puzzle in puzzles">
                  <PuzzleCard
                    :key="puzzle.id"
                    :nid="puzzle.id"
                    v-bind="puzzle"
                    :is3d="puzzle['has3d'] === '1'"
                  />
                </template>
              </Gallery>
              </tbody>
            </table>
          </div>
          <Pagination :key="puzzles && puzzles.length" />
        </div>

        <div v-if="$route.query.tab_type == 'cleared'">
          <hr class="top-border" />
          <h4 class="title">{{ $t('player-view:cleared-puzzles') }}</h4>

          <div class="page-content">
            <table style="width: 100%">
              <tbody>
                <Gallery>
                <template v-for="puzzle in puzzles">
                  <PuzzleCard
                    :key="puzzle.id"
                    :nid="puzzle.id"
                    v-bind="puzzle"
                    :is3d="puzzle['has3d'] === '1'"
                  />
                </template>
                </Gallery>
              </tbody>
            </table>
          </div>
          <Pagination :key="puzzles && puzzles.length" />
        </div>

        <div v-if="$route.query.tab_type == 'groups'">
          <hr class="top-border" />
          <h4 class="title">{{ $t('player-view:joined-groups') }}</h4>

          <Gallery>
            <GroupCard
              v-for="group in joinedGroups"
              :key="group.nid"
              :nid="group.nid"
              v-bind="group"
            />
          </Gallery>
          <Pagination :key="joinedGroups && joinedGroups.length" />
        </div>
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
  import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance, AxiosResponse } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, {
    Option,
    } from '@/components/Sidebar/DropdownSidebarPanel.vue';
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
    ProfileAchievement,
    ProfileGroup,
    PuzzleList,
    PuzzleItem,
    GroupList,
    GroupItem,
  } from '@/types/common-types';
  import { isArray, isMap, isObject } from 'lodash';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import GroupCard from '@/components/Cards/GroupCard.vue';
  import PuzzleListCard from '@/components/Cards/PuzzleListCard.vue';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';
  import PlayerTable from './components/PlayerTable.vue';
  import AchievementCard from './components/AchievementCard.vue';

  const INITIAL_SORT = 'date_completed';
  const INITIAL_NUMBER = 18;
  let TAB_TYPE = '';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerTable,
      AchievementCard,
      Preloader,
      PuzzleCard,
      PuzzleListCard,
      Pagination,
      GroupCard,
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
      { value: 'groups', text: 'side-panel-options:groups' },
    ];

    user: UserData | null = null;

    follow: FollowItem[] = [];

    latestPuzzles: LatestPuzzle[] = [];

    puzzles: PuzzleItem[] = [];

    createdPuzzles: CreatedPuzzle[] = [];

    synthesized: SynthesizedDesign[] = [];

    myAchievements: { [name: string]: ProfileAchievement } = {};

    allAchievements: { [name: string]: ProfileAchievement } = {};

    joinedGroups: GroupItem[] = [];

    subAchievements: ProfileAchievement[] = [];

    @Watch('$route.query.tab_type')
    resetPuzzles() {
      this.puzzles = [];
    }

    async fetch() {
      const USERROUTE = `/get/?type=user&uid=${this.$route.params.uid}`;
      // Achievements and Groups are provided when no tab_type is specified.
      const tab_type =
        this.$route.query.tab_type === 'achievements'
          ? 'about'
          : this.$route.query.tab_type;

      const res: AxiosResponse<any>[] = await Promise.all([
        this.$http.get(USERROUTE, { params: { tab_type } }),
      ]);

      if (tab_type === 'cleared') {
        if (TAB_TYPE !== tab_type) {
          this.$route.query.size = INITIAL_NUMBER.toString();
          TAB_TYPE = tab_type;
        }
        const { filters, sort, search, size } = this.$route.query;
        const params = {
          puzzle_type: 'AllChallengesPuzzle',
          cleared: 'true',
          sort: sort || INITIAL_SORT,
          size: size || INITIAL_NUMBER,
          search,
          uid: this.$route.params.uid,
        };
        res.push(
          await this.$http.get('/get/?type=puzzles', {
            params,
          }),
        );
        const puzzleRes = res[1].data.data as PuzzleList;
        this.puzzles = puzzleRes.puzzles;
      } else if (tab_type === 'created') {
        if (TAB_TYPE !== tab_type) {
          this.$route.query.size = INITIAL_NUMBER.toString();
          TAB_TYPE = tab_type;
        }
        const { filters, sort, search, size } = this.$route.query;
        const params = {
          puzzle_type: 'AllChallengesPuzzle',
          creator_uid: this.$route.params.uid,
          sort: sort || INITIAL_SORT,
          size: size || INITIAL_NUMBER,
          search,
          uid: this.$route.params.uid,
        };
        res.push(
          await this.$http.get('/get/?type=puzzles', {
            params,
          }),
        );
        const puzzleRes = res[1].data.data as PuzzleList;
        this.puzzles = puzzleRes.puzzles;
      } else if (tab_type === 'latest') {
        if (TAB_TYPE !== tab_type) {
          this.$route.query.size = INITIAL_NUMBER.toString();
          TAB_TYPE = tab_type;
        }
        const { filters, sort, search, size } = this.$route.query;
        const params = {
          puzzle_type: 'AllChallengesPuzzle',
          latest: 'true',
          sort: sort || INITIAL_SORT,
          size: size || INITIAL_NUMBER,
          search,
          uid: this.$route.params.uid,
        };
        res.push(
          await this.$http.get('/get/?type=puzzles', {
            params,
          }),
        );
        const puzzleRes = res[1].data.data as PuzzleList;
        this.puzzles = puzzleRes.puzzles;
      } else if (tab_type === 'groups') {
        if (TAB_TYPE !== tab_type) {
          this.$route.query.size = INITIAL_NUMBER.toString();
          TAB_TYPE = tab_type;
        }
        const { filters, sort, search, size } = this.$route.query;
        const params = {
          sort: sort || INITIAL_SORT,
          size: size || INITIAL_NUMBER,
          search,
          uid: this.$route.params.uid,
        };
        res.push(
          await this.$http.get('/get/?type=user_groups', {
            params,
          }),
        );
        const groupRes = res[1].data.data as GroupList;
        this.joinedGroups = groupRes.groups;
      }

      const userRes = res[0].data.data as UserResponse;
      this.user = userRes.user;
      this.follow = userRes.follow;
      this.latestPuzzles = userRes.latest_puzzles || [];
      this.createdPuzzles = userRes.created_puzzles || [];
      this.synthesized = userRes.synthesized || [];
      this.myAchievements = userRes.achievements || {};
      this.allAchievements = userRes.all_achievements || {};
    }

    isAchieved(a: ProfileAchievement): boolean {
      return !Object.values(this.myAchievements).some(
        (value) =>
          Object.values(a).some((value2) => value.title === value2.title) ||
          value.title === a.title,
      );
    }

    completed(a: ProfileAchievement[]): number {
      let b = 0;
      Object.values(this.myAchievements).forEach((value) => {
        b += Object.values(a).filter(
          (value2) => value.title === value2.title,
        ).length;
      });
      return b;
    }

    computeAchievement(a: ProfileAchievement): ProfileAchievement {
      const highest = this.completed(Object.values(a)) || 1;
      return Object.values(a)[highest - 1];
    }

    expand(a: ProfileAchievement[]) {
      this.subAchievements = a;
      this.$bvModal.show('subachievement-modal');
    }

    filter(aList: ProfileAchievement[], filter: string) {
      const returnArray: ProfileAchievement[] = Object.values(aList).filter(
        (a) => Object.values(a)[0].type === filter || a.type === filter,
      );
      return returnArray;
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
</style>
