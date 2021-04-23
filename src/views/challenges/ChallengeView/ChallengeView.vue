<template>
  <EternaPage v-if="challenge">
    <ChallengeDescription :challenge="challenge" style="margin-bottom: 52.5px;" />
    <ChallengePublications v-if="challenge.publications && challenge.publications.length > 0" :challenge="challenge" />
    <ChallengeUpdates v-if="challenge.admin_updates && challenge.admin_updates.length > 0" :challenge="challenge" />
    <div v-if="challenge.labs.length > 0" :class="`lab-container${challenge.donors && challenge.donors.length > 0 ? '' : ' without-border-bottom'}`">
      <tabs>
        <tab :title="`Open Labs (${openLabs.length})`">
          <div class="tab-container">
            <Gallery>
              <LabCard v-for="lab in openLabs" :key="lab.nid" :lab="lab" />
            </Gallery>
            <div class="empty-lab" v-if="openLabs.length==0">
              No Open Labs
            </div>
          </div>
        </tab>
        <tab :title="`Closed Labs (${closedLabs.length})`">
          <div class="tab-container">
            <Gallery>
              <LabCard v-for="lab in closedLabs" :key="lab.nid" :lab="lab" />
            </Gallery>
            <div class="empty-lab" v-if="closedLabs.length==0">
              No Closed Labs
            </div>
          </div>
        </tab>
      </tabs>
    </div>
    <ChallengeDonors v-if="challenge.donors" :challenge="challenge" />
    <template #sidebar="{ isInSidebar }">
      <ChallengeInfoPanel :challenge="challenge" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Watch, Component, Mixins } from 'vue-property-decorator';
  import { Tabs, Tab } from 'vue-slim-tabs';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';
  import LabCard from '@/views/labs/LabsExplore/components/LabCard.vue';
  import ChallengeDescription from './components/ChallengeDescription.vue';
  import ChallengeInfoPanel from './components/ChallengeInfoPanel.vue';
  import ChallengePublications from './components/ChallengePublications.vue';
  import ChallengeUpdates from './components/ChallengeUpdates.vue';
  import ChallengeDonors from './components/ChallengeDonors.vue';

  const INITIAL_NUMBER = 18;

  @Component({
    components: {
      EternaPage,
      ChallengePublications,
      ChallengeUpdates,
      ChallengeDescription,
      ChallengeInfoPanel,
      ChallengeDonors,
      LabCard,
      Tabs,
      Tab
    },
  })
  export default class ChallengeView extends Mixins(FetchMixin) {
    challenge: ChallengeData | null = null;

    async fetch() {
      const challengeResults = (
        await this.$http.get(`/get/?type=challenge&nid=${this.$route.params.id}`)
      ).data.data.challenge as ChallengeData;
      
      this.challenge = {...challengeResults};
      console.log("Challenge: ", challengeResults);
    }

    @Watch('challenge')
    onChallengeChange(){
      console.log("Watch that shit: ", this.challenge);
      this.$forceUpdate();
    }

    get closedLabs() {
      return this.challenge?.labs.filter(lab => !lab.is_active) || [];
    }

    get openLabs() {
      return this.challenge?.labs.filter(lab => lab.is_active) || [];
    }
  }
</script>

<style scoped lang="scss">
  .tab-container {
    margin: 0;
    padding: 20px;
    background: #041227;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .lab-container {
    padding: 2rem 0;
    border-bottom: 1px solid #14467d;
  }

  .without-border-bottom {
    border-bottom: 0px;
  }

  .empty-lab {
    padding: 3rem 0;
    text-align: center;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.2);
  }
</style>
