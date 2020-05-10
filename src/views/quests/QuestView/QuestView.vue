<template>
  <EternaPage :title="$t('quest-info:title')" v-if="pageData">
    <div class="video">
      <div class="d-flex">
        <div>
          <h2>
            {{ $t('quest-view:banner-title') }}
          </h2>
          <p style="width: 482px; ">
            {{ questInfo }}
          </p>
        </div>
        <img :src="image" style="height: 250px; width: 250px;" />
        <b-progress value=".2" max="1"></b-progress>
      </div>
    </div>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="3" md="3">
      <PuzzleCard
        v-for="puzzle in pageData.puzzles"
        :key="puzzle.id"
        :nid="puzzle.id"
        v-bind="puzzle"
      />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('quest-info-sidebar:title')"
        headerIcon="@/assets/info.svg"
      >
        <span class="gray-header">{{ $t('quest-info-sidebar:created') }}</span
        ><br />
        <ul style="padding: 0; list-style-type:none">
          <li>
            <img src="@/assets/navbar/DefaultIcon.svg" style="margin-right:5px" /><b
              style="color: var(--yellow);"
              >{{ 'Eli Fisher' }}</b
            >
          </li>
          <li><img src="@/assets/group.svg" class="icon" />{{ audience }}</li>
          <li><img src="@/assets/calendar.svg" class="icon" />{{ 'Sept 2019' }}</li>
        </ul></SidebarPanel
      >
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

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=puzzles&puzzle_type=Progression&search=${route.params.id}`)
    ).data.data;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      PuzzleCard,
      QuestCard,
      SidebarPanel,
    },
  })
  export default class QuestView extends Mixins(PageDataMixin(fetchPageData)) {
    get image() {
      return 'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/9FA562FE-9341-4261-8C3C-7E9679642CAE.png';
    }

    get questInfo() {
      return `Nature’s best kept secret is a wonder molecule called RNA. It is central to the origin of
        life, evolution, and the cellular machinery that keeps us alive. In this Virtual Lab you’ll
        play the role of a molecular engineer by solving RNA folding puzzles. Then take your skills
        to the Eterna Lab, where you can design RNAs that could be at the heart of future
        life-saving therapies.`;
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
