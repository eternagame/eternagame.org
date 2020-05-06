<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 52.5px;" />
    <LabRound v-for="round in openRounds" :key="round.round" :round="round" />
    <LabRound v-for="round in closedRounds" :key="round.round" :round="round" closed="true" />
    <LabConclusion :lab="lab" style="margin-bottom: 52.5px;" />
    <template #sidebar="{ isInSidebar }">
      <LabInfoPanel :lab="lab" :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="['#Switch', '#Ribosome']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import LabDescription from './components/LabDescription.vue';
  import LabConclusion from './components/LabConclusion.vue';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      EternaPage,
      LabDescription,
      LabConclusion,
      LabInfoPanel,
      LabRound,
      TagsPanel,
      Comments,
    },
  })
  export default class LabView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
    }

    private addCommentPath = `/web/${window.location.pathname}`;

    roundClosed(round) {
      return (
        round.round < this.lab.puzzles.length || round.exp_phase == null || round.exp_phase >= 1
      );
    }

    get closedRounds() {
      return this.lab.puzzles.filter(round => this.roundClosed(round));
    }

    get openRounds() {
      return this.lab.puzzles.filter(round => !this.roundClosed(round));
    }
  }
</script>
