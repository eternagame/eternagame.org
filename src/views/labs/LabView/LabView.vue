<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 52.5px;" />
    <b-tabs v-if="openRounds.length">
      <b-tab :title="$t('lab-view:open')" v-if="openRounds.length" class="tab">
        <LabRound v-for="round in openRounds" :key="round.round" :round="round" />
      </b-tab>
      <b-tab :title="$t('lab-view:closed')" v-if="closedRounds.length" class="tab">
        <LabRound v-for="round in closedRounds" :key="round.round" :round="round" closed="true" />
      </b-tab>
    </b-tabs>
    <LabRound v-else v-for="round in closedRounds" :key="round.round" :round="round" />
    <LabConclusion :lab="lab" style="margin-bottom: 52.5px;" />
    <Comments
      :name="$t('lab-view:admin-comments')"
      :comments="pageData.supercomments"
      v-if="pageData.supercomments.length"
    />
    <Comments
      :comments="pageData.comments"
      :nid="lab.nid"
    />
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

    roundClosed(round) {
      return (
        round.round < this.lab.puzzles.length
        || this.lab.exp_phase == null
        || this.lab.exp_phase >= 1
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

<style scoped lang="scss">
  ::v-deep .nav-link {
    background-color: #50b2dc;
    color: white;
  }
  ::v-deep .nav-link.active {
    background-color: #041227 !important;
    border: 0px;
    color: white;
  }

  .tab {
    background-color: #041227 !important;
    padding: 10px;
    border: 0px;
    margin-top: -1px;
  }

  ::v-deep .nav-tabs {
    color: white;

    border: 0px;
  }

  ::v-deep a {
    color: white;
  }
</style>
