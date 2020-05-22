<template>
  <EternaPage :title="$t('quest-info:title')" v-if="pageData">
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
              <b>{{ $t('quest:completed').toUpperCase() }}</b>
            </div>
            <b-progress :value="quest.to_next" max="1" v-else></b-progress>
          </div>
        </div>
      </div>
    </div>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="4" md="3" v-if="pageData && pageData.puzzles">
      <PuzzleCard
        v-for="puzzle in pageData.puzzles"
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
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { PuzzleItem, AchievementItem } from '@/types/common-types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const me = (await http.get('/get/?type=me')).data.data;
    const puzzles = (
      await http.get(`/get/?type=puzzles&puzzle_type=Progression&search=${route.params.id}`)
    ).data.data;
    return { ...me, ...puzzles };
  }

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
  export default class QuestView extends Mixins(PageDataMixin(fetchPageData)) {
    get quest() {
      return this.pageData.achievement_roadmap.find(
        (p: AchievementItem) => p.title === this.$route.params.id,
      );
    }

    private completed = this.quest.to_next >= 1;

    puzzleCleared(id: number) {
      return this.pageData.cleared.map((puzzle: PuzzleItem) => puzzle.id).includes(id);
    }

    get audience() {
      return 423;
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
