<template>
  <EternaPage :title="$t('publications:title')">
    <div v-if="fetchState.firstFetchComplete">
      <p class="overview-text">
        Over 60,000 Eterna players have contributed to scientific publications, including several players as lead
        authors. Have a new paper idea? Want to help us edit upcoming player papers? Please contact <router-link to="/players/246020">DigitalEmbrace</router-link>.
        The Eterna project has lead to the publication of {{totalPapers}} papers.
      </p>

      <a name="player-publications" aria-label="player publications" class="anchor-link"></a>
      <h2>{{ $t('publications:player-title') }}</h2>
      <Gallery :sm="12" :md="12">
        <PublicationsCard v-for="pub in playerPublications" :key="pub.link" v-bind="pub" />
      </Gallery>

      <a name="researcher-publications" aria-label="researcher publications" class="anchor-link"></a>
      <h2>{{ $t('publications:researcher-title') }}</h2>
      <Gallery :sm="12" :md="12">
        <PublicationsCard v-for="pub in researcherPublications" :key="pub.link" v-bind="pub" />
      </Gallery>
    </div>
    <div v-else>
      <Preloader />
    </div>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:publications')"
        :isInSidebar="isInSidebar"
      />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:publications')" :isInSidebar="false" />
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
  import { Publication, Publications } from '@/types/common-types';
  import PublicationsCard from './PublicationsCard.vue';

  const ROUTE = '/get/?type=pubslist';

  @Component({
    components: {
      EternaPage,
      PublicationsCard,
      DropdownSidebarPanel,
      SearchPanel,
      Preloader,
    },
  })
  export default class PublicationsExplore extends Mixins(FetchMixin) {
    options: Option[] = [
      { value: 'all', text: 'publications:player-title', link: '#player-publications' },
      { value: 'all', text: 'publications:researcher-title', link: '#researcher-publications' },
    ];

    playerPublications: Publication[] = [];

    researcherPublications: Publication[] = [];

    get totalPapers(){
      return this.researcherPublications.length + this.playerPublications.length;
    }

    async fetch() {
      const res = (
        await this.$http.get(ROUTE, {
          params: {
            search: this.$route.query.search,
          },
        })
      ).data.data as Publications;
      this.playerPublications = res.playerpubslist;
      this.researcherPublications = res.researcherpubslist;
    }


  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

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
    top: -$navbar-height;
    visibility: hidden;
  }
</style>
