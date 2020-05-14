<template>
  <EternaPage :title="$t('quest-info:title')" v-if="pageData">
    <div class="video">
      <div class="d-flex">
        <div>
          <h2>
            {{ $t('quest-view:banner-title') }}
          </h2>
          <p style="width: 482px" v-dompurify-html="quest.desc"></p>
        </div>
        <div>
          <img :src="quest.image" style="max-height: 250px; max-width: 270px;margin-bottom:20px" />
          <b-progress :value="quest.to_next" max="1"></b-progress>
        </div>
      </div>
    </div>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="3" md="3" v-if="pageData && pageData.puzzles">
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
        </ul> -->
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
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import Preloader from '@/components/PageLayout/Preloader.vue';

  Vue.use(VueDOMPurifyHTML);

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
      return this.pageData.achievement_roadmap.find(p => p.title === this.$route.params.id);
    }

    puzzleCleared(id: number) {
      return this.pageData.cleared.map(puzzle => puzzle.id).includes(id);
    }

    get audience() {
      return 423;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video {
    background-color: $med-dark-blue;
    object-fit: contain;
    padding: 31px;
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
