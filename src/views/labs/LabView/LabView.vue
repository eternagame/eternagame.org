<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 52.5px;" />
    <b-tabs v-if="openRounds.length && closedRounds.length">
      <b-tab :title="$t('lab-view:open')" class="tab">
        <LabRound v-for="round in openRounds" :key="round.round" :round="round"/>
      </b-tab>
      <b-tab :title="$t('lab-view:closed')" class="tab">
        <LabRound v-for="round in closedRounds" :key="round.round" :round="round" />
      </b-tab>
    </b-tabs>
    <template v-else>
      <LabRound v-for="round in openRounds" :key="round.round" :round="round" />
      <LabRound v-for="round in closedRounds" :key="round.round" :round="round" />
    </template>
    <LabConclusion v-if="lab.conclusion" :conclusion="lab.conclusion" style="margin-bottom: 52.5px;" />
    <LabLeaderboardCard :labData="lab.synthesized_solutions" />
    <Comments
      :name="$t('lab-view:admin-comments')"
      :comments="adminUpdates"
      v-if="adminUpdates.length"
    />
    <Comments :comments="comments" :nid="lab.nid" v-if="comments.length || $vxm.user.loggedIn" />
    <template #sidebar="{ isInSidebar }">
      <LabInfoPanel :lab="lab" :challenge="challenge" :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="['#Switch', '#Ribosome']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { CommentItem } from '@/types/common-types';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';
  import LabDescription from './components/LabDescription.vue';
  import LabConclusion from './components/LabConclusion.vue';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import LabLeaderboardCard from './components/LabLeaderboardCard.vue';
  import LabViewData, { LabData } from './types';

  @Component({
    components: {
      EternaPage,
      LabDescription,
      LabConclusion,
      LabInfoPanel,
      LabRound,
      TagsPanel,
      Comments,
      LabLeaderboardCard,
    },
  })
  export default class LabView extends Mixins(FetchMixin) {
    lab: LabData | null = null;

    comments: CommentItem[] = [];

    adminUpdates: CommentItem[] = [];

    challenge: ChallengeData | null = null;

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=project&nid=${this.$route.params.id}`)
      ).data.data as LabViewData;

      if (res.lab.challenge) {
        const challengeResults = (
          await this.$http.get(`/get/?type=challenge&nid=${res.lab.challenge}`)
        ).data.data.challenge as ChallengeData;
        
        this.challenge = {...challengeResults};
      }

      this.lab = res.lab;
      this.comments = res.comments;
      this.adminUpdates = res.supercomments;
    }

    roundClosed(roundtoCheck: { round: number }) {
      return (
        roundtoCheck.round < Math.max(...(this.lab?.puzzles || []).map(round => round.round)) ||
        this.lab?.exp_phase == null ||
        Number(this.lab?.exp_phase) > 1
      );
    }

    get closedRounds() {
      return this.lab?.puzzles.filter(round => this.roundClosed(round)) || [];
    }

    get openRounds() {
      return this.lab?.puzzles.filter(round => !this.roundClosed(round)) || [];
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
  .leaderboard-header{
    background-color: #103e85;
  }
  ::v-deep .nav-tabs {
    color: white;

    border: 0px;
  }
</style>
