<template>
  <EternaPage :title="$t('challenge-explore:title')">

    <ChallengeCard v-for="challenge in challenges" :key="challenge.nid" :challenge="challenge"/>
    <template #sidebar="{ isInSidebar }">

      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>

  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { ChallengeItem } from '@/types/common-types';
  import ChallengeCard from './ChallengeCard.vue';


  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      SearchPanel,
      Preloader,
      ChallengeCard,
    },
  })
  export default class ChallengeExplore extends Mixins(FetchMixin) {

    options: Option[] = [
      { value: 'all', text: 'side-panel-options:all' },
      { value: 'active', text: 'challenge-explore:active'},
      { value: 'inactive', text: 'challenge-explore:inactive'},

    ];

    challenges: ChallengeItem[]= [];

    async fetch() {

      const{sort} = this.$route.query;

      const res = (
        await this.$http.get('/get/?type=challenges')
      ).data.data.challenges as ChallengeItem[];

      switch(sort){

      case 'active':
        this.challenges = res.filter( entry => entry.challenge_status === "Active");
        break;
      case 'inactive':
        this.challenges = res.filter( entry => entry.challenge_status !== "Active");
        break;
      case 'all':
      default:
        this.challenges = res;
      }
    }

  }
</script>

<style scoped lang="scss">
  .overview-text {
    margin: 0.4rem 2rem;
    font-size: 1.1rem;
    font-style: italic;
  }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .anchor-link {
    display: block;
    position: relative;
    top: -120px;
    visibility: hidden;
  }
</style>
