<template>
  <EternaPage >

    <ChallengeCard v-for="challenge in challenges" :key="challenge.nid" :challenge="challenge"/> 

    <template #sidebar="{ isInSidebar }">
        NOT DONE ADD ACTUAL OPTIONS TO sort
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:challenges')"
        :isInSidebar="isInSidebar"
      />
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
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import ChallengeCard from './ChallengeCard.vue';


  @Component({
    components: {
      Pagination,
      EternaPage,
      DropdownSidebarPanel,
      SearchPanel,
      Preloader,
      ChallengeCard,
    },
  })
  export default class PublicationsExplore extends Mixins(FetchMixin) {
    
    challenges = [];

    async fetch() {

        const {challenges} = (
        await this.$http.get('/get/?type=challenges')
        ).data.data;
        this.challenges = challenges;
        console.log(this.challenges);
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
