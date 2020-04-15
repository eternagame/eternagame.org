<template>
  <EternaPage v-if="pageData" :title="pageData.puzzle.title">
    <div class="page-content">
      <div class=" d-flex">
        <div>
          <h2>About the Puzzle</h2>
          <p>Welcome to the easiest puzzle of the SRP RNA series!</p>
          <h3>THE SCIENCE</h3>
          <p>
            The SRP RNA, also known as 7SL, 6S, or 4.5S RNA, is the RNA component of the signal
            recognition particle (SRP) ribonucleoprotein complex. SRP is a universally conserved
            ribonucleoprotein that directs the traffic of proteins within the cell and allows them
            to be secreted.
          </p>
          <h3>YOUR MISSION</h3>
          <p>
            Design the SRP RNA with following specifications: • Minimum 5 GU Pairs
          </p>
          <h3>MORE INFORMATION</h3>
          <p>For more information please visit: Crystal structure Image and Protein Data Bank</p>
        </div>

        <div>
          <div
            :style="{ width: '334px', height: '365px', backgroundColor: '#041227', opacity: '0.8' }"
          ></div>
          <b-button type="submit" variant="primary" class="submit-button">
            Play Now
          </b-button>
        </div>
      </div>

      <hr class="top-border" />

      <h2>Quests</h2>
      <p>This puzzle appears in the following quests:</p>
      <div>
        <img
          src="https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/5ED5D090-6F62-4DF8-8C54-CC71306A4B16.png"
        />
        <img
          src="https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/6A70A1E1-9A81-4BA0-B765-A12B8F821300.png"
        />
        <img
          src="https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/E280848F-6347-4CC5-A215-F08B1F55ED1B.png"
        />
      </div>
    </div>

    <template #sidebar="{ isInSidebar }">
      <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleData from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=puzzle&nid=${route.params.id}&script=-1`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as PuzzleData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
    },
  })
  export default class PuzzleView extends Mixins(PageDataMixin(fetchPageData)) {
    get puzzle() {
      return this.pageData;
    }
  }
</script>
