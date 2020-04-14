<template>
  <EternaPage title="Quest Info">
    <b-container class="video">
      <h2>
        {{ $t('quest-view:banner-title') }}
      </h2>
      <p style="width: 482px; ">
        Nature’s best kept secret is a wonder molecule called RNA. It is central to the origin of
        life, evolution, and the cellular machinery that keeps us alive. In this Virtual Lab you’ll
        play the role of a molecular engineer by solving RNA folding puzzles. Then take your skills
        to the Eterna Lab, where you can design RNAs that could be at the heart of future
        life-saving therapies.
      </p>
    </b-container>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="3" md="3">
      <PuzzleCard nid="G7" locked="true" />
      <PuzzleCard nid="G8" locked="true" />
      <PuzzleCard nid="G9" mlocked="true" />
      <PuzzleCard nid="G10" locked="true" />
      <PuzzleCard nid="G11" locked="true" />
      <PuzzleCard nid="G12" locked="true" />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <TagsPanel
        :tags="['#Switch', '#Ribosome', '##XOR', '#MS2', '#FMN', '#Telomerase']"
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
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      PuzzleCard,
    },
  })
  export default class LabView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
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
</style>
