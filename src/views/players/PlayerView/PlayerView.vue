<template>
  <EternaPage v-if="player" title="Player Profile">
    <Gallery>
      <b-row>
        <div class="col-lg-12">
          <div style="text-align:center;">
            hi
            <hr class="top-border" />
            <h4>
              About me
            </h4>
          </div>
        </div>
      </b-row>
    </Gallery>
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
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';

  //   import LabViewData, { LabData } from './types';
  import PageDataMixin from '@/mixins/PageData';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    console.log((await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data);
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class PlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get player() {
      return {};
    }

    private options: Option[] = [
      { value: 'about', text: 'About' },
      { value: 'achievements', text: 'Achievements' },
      { value: 'synthesized', text: 'Synthesized RNAs' },
      { value: 'latest', text: 'Latest Activity' },
      { value: 'created', text: 'Created Puzzles' },
      { value: 'resources', text: 'Resources' },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .top-border {
    border-top-color: rgba(255, 255, 255, 0.4);
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }
</style>
