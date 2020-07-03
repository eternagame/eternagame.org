<template>
  <EternaPage :title="$t('quest-info:title')" v-if="fetchState.firstFetchComplete && quest">
    <div class="quest-description">
      <div class="row">
        <div class="col-lg-7">
          <h2>
            {{ $t('quest-view:banner-title') }}
          </h2>
          <p v-dompurify-html="quest.desc"></p>
        </div>
        <div class="col-lg-5 d-flex justify-content-center">
          <div>
            <img :src="quest.image" class="m-3 quest-badge" />
            <div v-if="completed">
              <img src="@/assets/noun_check.svg" class="mr-2" />
              <b class="text-uppercase">{{ $t('quest:completed') }}</b>
            </div>
            <b-progress :value="quest.to_next" max="1" v-else></b-progress>
          </div>
        </div>
      </div>
    </div>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="4" md="3" v-if="puzzles">
      <PuzzleCard
        v-for="puzzle in puzzles"
        :key="puzzle.id"
        :nid="puzzle.id"
        v-bind="puzzle"
        :cleared="puzzleCleared(puzzle.id)"
      />
    </Gallery>
    <div v-else>
      <Preloader />
    </div>
    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('quest-info-sidebar:title')"
        headerIcon="@/assets/info.svg"
      >
        <br />
        <!-- <span class="gray-header">{{ $t('quest-info-sidebar:created') }}</span>
        <ul style="padding: 0; list-style-type:none;margin-top:10px">
          <li>
            <img src="@/assets/navbar/DefaultIcon.svg" style="margin-right:5px" /><b
              style="color: var(--yellow);"
              >{{ 'Eli Fisher' }}</b
            >
          </li>
          <li><img src="@/assets/group.svg" class="icon" />{{ audience }}</li>
          <li><img src="@/assets/calendar.svg" class="icon" />{{ 'Sept 2019' }}</li>
        </ul>-->
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { MeQueryResponse, PuzzleList, PuzzleItem, ClearedPuzzle, RoadmapAchievement } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      PuzzleCard,
      QuestCard,
      SidebarPanel,
      Preloader,
    },
  })
  export default class QuestView extends Mixins(FetchMixin) {
    puzzles: PuzzleItem[] = [];

    cleared: ClearedPuzzle[] = [];

    quest: RoadmapAchievement | null = null;

    get locked() {
      return this.quest? Number(this.quest.level) - 1 > Number(this.quest.current_level) : true;
    }

    get completed() {
      return this.quest ? this.quest.to_next >= 1 && !this.locked : false;
    }

    async fetch() {
      const me = (await this.$http.get('/get/?type=me')).data.data as MeQueryResponse;
      const puzzles = (
        await this.$http.get(`/get/?type=puzzles&puzzle_type=Progression&search=${this.$route.params.id}`)
      ).data.data as PuzzleList;
      this.puzzles = puzzles.puzzles;
      this.cleared = puzzles.cleared || [];
      this.quest = me.achievement_roadmap.find(p => p.title === this.$route.params.id) || null;
    }

    puzzleCleared(id: string) {
      return this.cleared.map(puzzle => puzzle.id).includes(id);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .quest-badge {
    max-width: 270px;
  }

  .quest-description {
    background-color: $med-dark-blue;
    object-fit: contain;
    padding: 2rem;
  }
  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }

  li {
    margin-bottom: 20px;
  }
</style>
