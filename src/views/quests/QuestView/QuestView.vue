<template>
  <EternaPage title="Quest Info">
    <div class="video">
      <div class="d-flex">
        <div>
          <h2>
            {{ $t('quest-view:banner-title') }}
          </h2>
          <p style="width: 482px; ">
            {{ pageData[`quest-info`] }}
          </p>
        </div>
        <QuestCard style="width:250px;height:250px" />
      </div>
    </div>

    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="3" md="3">
      <PuzzleCard />
      <PuzzleCard />
      <PuzzleCard />
      <PuzzleCard />
      <PuzzleCard />
      <PuzzleCard />
    </Gallery>
    <!-- <template #sidebar="{ isInSidebar }">
      <TagsPanel
        :tags="['#Switch', '#Ribosome', '##XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      />
    </template> -->
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

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      PuzzleCard,
      QuestCard,
    },
  })
  export default class QuestView extends Mixins(PageDataMixin(fetchPageData)) {
    get pageData() {
      return {
        'quest-info': `Nature’s best kept secret is a wonder molecule called RNA. It is central to the origin of
        life, evolution, and the cellular machinery that keeps us alive. In this Virtual Lab you’ll
        play the role of a molecular engineer by solving RNA folding puzzles. Then take your skills
        to the Eterna Lab, where you can design RNAs that could be at the heart of future
        life-saving therapies.`,
      };
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
