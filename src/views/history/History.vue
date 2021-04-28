<template>
  <EternaPage>
    <!-- Note: Header date is copied from Terms & Conditions, so may not be correct. -->
    <div class="history-container">
      <div class="p-2">
        <h4 class="header">
          {{ $t('history:origins-header') }}
        </h4>
        <p class="description">
          {{ $t('history:origins-body-1') }}
          {{ $t('history:origins-body-2') }}
        </p>
        <section class="history-origins-video">
          <iframe
            src="https://www.youtube.com/embed/bTlNNFQxs_A"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </section>
        <br />
        <h4 class="header">
          {{ $t('history:science-header') }}
        </h4>
        <p class="description">
          {{ $t('history:science-body-1') }}
          <a href="https://en.wikipedia.org/wiki/Nucleic_acid_structure_determination#SHAPE" target="_blank">{{ $t('history:science-body-2') }}</a>
          {{ $t('history:science-body-3') }}
          <a href="https://en.wikipedia.org/wiki/Flavin_mononucleotide" target="_blank">{{ $t('history:science-body-4') }}</a>
          {{ $t('history:science-body-5') }}
          <a href="https://www.pnas.org/content/111/6/2122" target="_blank">{{ $t('history:science-body-6') }}</a>
          {{ $t('history:science-body-7') }}
        </p>
        <p class="description">
          {{ $t('history:science-body-8') }}
          <a href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub" target="_blank">{{ $t('history:science-body-9') }}</a>
          {{ $t('history:science-body-10') }}
          <a href="https://www.biorxiv.org/content/10.1101/281147v2" target="_blank">{{ $t('history:science-body-11') }}</a>
        </p>
        <p class="description">
          {{ $t('history:science-body-12') }}
          <a href="https://en.wikipedia.org/wiki/MS2_tagging" target="_blank">{{ $t('history:science-body-13') }}</a>
          {{ $t('history:science-body-14') }}
        </p>
        <section class="history-origins-video">
          <iframe
            src="https://www.youtube.com/embed/V2qtNyJ3KQg"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </section>
        <p class="description">
          {{ $t('history:science-body-15') }}
        </p>
        <p class="description">
          {{ $t('history:science-body-16') }}
        </p>
        <br />
        <div v-if="data" class="stats-container">
          <div class="stat">
            <h2 class="stat-number">
              {{ formattedNumber(data.num_all_publications) }}
            </h2>
            <h3 class="stat-description">
              Total Publications
            </h3>
          </div>
          <div class="stat">
            <h2 class="stat-number">
              {{ formattedNumber(data.num_contributors) }}
            </h2>
            <h3 class="stat-description">
              Total Publication Contributors
            </h3>
          </div>
          <div class="stat">
            <h2 class="stat-number">
              {{ formattedNumber(data.num_lab_solutions) }}
            </h2>
            <h3 class="stat-description">
              Total Lab Solutions
            </h3>
          </div>
          <div class="stat">
            <h2 class="stat-number">
              {{ formattedNumber(data.num_solved_puzzles) }}
            </h2>
            <h3 class="stat-description">
              Total Puzzles Solved
            </h3>
          </div>
        </div>
        <br />
        <h4 class="header">
          {{ $t('history:software-header') }}
        </h4>
        <p class="description">
          {{ $t('history:software-body-1') }}
        </p>
        <p class="description">
          {{ $t('history:software-body-2') }}
        </p>
        <h4 class="header">
          {{ $t('history:community-header') }}
        </h4>
        <p class="description">
          {{ $t('history:community-body-1') }}
        </p>
      </div>
      <hr class="top-border" />
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import HistoryData from './types';
  

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class History extends Mixins(FetchMixin) {
    data: HistoryData | null = null;

    async fetch() {
      const historyResults = (
        await this.$http.get(`/get/?type=history`)
      ).data.data.history as HistoryData;
      console.log("HISTORY: ", historyResults);
      
      
      this.data = historyResults;
    }

    formattedNumber(number: string) {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .history-container {
    position: relative;
    left: 50%;
    display: inline-block;
    border-radius: 5px;
    background-color: #043468;
    padding: 16px;
    transform: translateX(-50%);
  }

  .history-origins-video {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

    & iframe {
      width: 400px;
      height: 250px;
      border-radius: 5px;
    }
  }

  .stats-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    @include media-breakpoint-down(md) {
      display: block;
    }

    .stat {
      display: flex;
      flex-direction: column;
      flex: 0.25;
      background-color: #05224b;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
    
      .stat-number {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
      }

      .stat-description {
        max-width: 20ch;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #fac244;
        text-align: center;
        margin: 0 auto;
      }
    }
  }

  .header {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .description {
    max-width: 70ch;
    padding-bottom: 2rem;
    margin: 0 auto;
  }
</style>
