<template>
  <EternaPage :title="quest.title" v-if="fetchState.firstFetchComplete && quest">
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
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { PuzzleList, PuzzleItem, ClearedPuzzle, RoadmapAchievement } from '@/types/common-types';
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
      const achievement_roadmap = (await this.$http.get('/get/?type=side_project_roadmap')).data.data.achievement_roadmap as RoadmapAchievement[];
      const puzzles = (
        await this.$http.get(`/get/?type=puzzles&puzzle_type=Progression&tags=${this.$route.params.id}`)
      ).data.data as PuzzleList;

      // Sort such that puzzle A which specifies its next puzzle is puzzle B is sorted before puzzle A
      // The first puzzle is the one that has no other puzzle pointing to it
      this.puzzles = [];
      let puzzle = puzzles.puzzles.find(
        candidatePuzzle => !puzzles.puzzles.some(otherPuzzle => otherPuzzle['next-puzzle'] === candidatePuzzle.id)
      );
      while (puzzle) {
        this.puzzles.push(puzzle);
        const nextPuzzle = puzzle['next-puzzle'];
        puzzle = this.puzzles.find(candidatePuzzle => candidatePuzzle.id === nextPuzzle);
      }
      // Add any additional puzzles not part of the next puzzle "chain"
      this.puzzles.push(...puzzles.puzzles.filter(candidatePuzzle => !this.puzzles.includes(candidatePuzzle)));
      
      this.cleared = puzzles.cleared || [];
      this.quest = achievement_roadmap.find(p => p.title === this.$route.params.id) || null;
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
