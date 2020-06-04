<template>
  <EternaPage :title="$t('publications:title')" v-if="pageData">
    <div v-if="pageData">
      <p class="overview-text">
        {{ $t('publications:overview') }}
      </p>

      <a name="player-publications" class="anchor-link"></a>
      <h2>{{ $t('publications:player-title') }}</h2>
      <Gallery v-if="pageData.playerpubslist" :sm="12" :md="12">
        <PublicationsCard v-for="pub in pageData.playerpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>
      <div v-else>
        <Preloader />
      </div>

      <a name="researcher-publications" class="anchor-link"></a>
      <h2>{{ $t('publications:researcher-title') }}</h2>
      <Gallery v-if="pageData.researcherpubslist" :sm="12" :md="12">
        <PublicationsCard v-for="pub in pageData.researcherpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>
      <div v-else>
        <Preloader />
      </div>
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
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import PublicationsCard from './PublicationsCard.vue';

  const ROUTE = '/get/?type=pubslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(ROUTE, {
        params: {
          search: route.query.search,
        },
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      Pagination,
      EternaPage,
      PublicationsCard,
      DropdownSidebarPanel,
      SearchPanel,
      Preloader,
    },
  })
  export default class PublicationsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private options: Option[] = [
      { value: 'all', text: 'publications:player-title', link: '#player-publications' },
      { value: 'all', text: 'publications:researcher-title', link: '#researcher-publications' },
    ];
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
