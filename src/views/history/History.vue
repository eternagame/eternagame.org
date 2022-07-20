<template>
  <EternaPage title="History of Eterna">
    <div class="origin-container" :id="sections[0].href">
      <h4 class="header">
        {{ $t('history:origins-header') }}
      </h4>
      <div class="history-paragraph">
        <section class="history-media-asset responsive">
          <iframe
            title="Eterna history"
            src="https://www.youtube.com/embed/bTlNNFQxs_A"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <p class="history-media-asset-description">
            {{ $t('history:origins-media-caption')}}
          </p>
        </section>
        {{ $t('history:origins-body-1') }}
        {{ $t('history:origins-body-2') }}
      </div>
    </div>
    <div v-if="data" class="stats-container">
      <div class="stat">
        <h2 class="stat-number">
          {{ formattedNumber(data.num_lab_solutions) }}
        </h2>
        <h3 class="stat-description">
          Lab Solutions
        </h3>
      </div>
      <div class="stat">
        <h2 class="stat-number">
          {{ formattedNumber(data.num_solved_puzzles) }}
        </h2>
        <h3 class="stat-description">
          Puzzles Solved
        </h3>
      </div>
      <div class="stat">
        <h2 class="stat-number">
          {{ formattedNumber(data.num_all_publications) }}
        </h2>
        <h3 class="stat-description">
          Publications
        </h3>
      </div>
      <div class="stat">
        <h2 class="stat-number">
          {{ formattedNumber(data.num_contributors) }}
        </h2>
        <h3 class="stat-description">
          Publication Contributors
        </h3>
      </div>
    </div>
    <div class="science-container" :id="sections[1].href">
      <h4 class="header">
        {{ $t('history:science-header') }}
      </h4>
      <div class="history-paragraph">
        <section class="history-media-asset responsive">
          <img src="@/assets/history/science.png" alt="A graph with data comparing performance of Eterna players to automated algorithms on six early Eterna puzzles (the finger, the cross, bulged cross, the star, bulged star, and the branches)" />
          <p class="history-media-asset-description">
            {{ $t('history:origins-media-caption') }}
          </p>
        </section>
        {{ $t('history:science-body-1') }}
        <a href="https://en.wikipedia.org/wiki/Nucleic_acid_structure_determination#SHAPE" target="_blank">{{ $t('history:science-body-2') }}</a>
        {{ $t('history:science-body-3') }}
        <a href="https://en.wikipedia.org/wiki/Flavin_mononucleotide" target="_blank">{{ $t('history:science-body-4') }}</a>
        {{ $t('history:science-body-5') }}
        <a href="https://www.pnas.org/content/111/6/2122" target="_blank">{{ $t('history:science-body-6') }}</a>
        {{ $t('history:science-body-7') }}
      </div>
      <div class="history-paragraph">
        {{ $t('history:science-body-8') }}
        <a href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub" target="_blank">{{ $t('history:science-body-9') }}</a>
        {{ $t('history:science-body-10') }}
        <a href="https://www.biorxiv.org/content/10.1101/281147v2" target="_blank">{{ $t('history:science-body-11') }}</a>
      </div>
      <div class="history-paragraph">
        {{ $t('history:science-body-12') }}
        <a href="https://en.wikipedia.org/wiki/MS2_tagging" target="_blank">{{ $t('history:science-body-13') }}</a>
        {{ $t('history:science-body-14') }}
      </div>
      <div class="history-paragraph">
        {{ $t('history:science-body-15') }}
      </div>
      <div class="history-paragraph">
        {{ $t('history:science-body-16') }}
      </div>
      <div class="history-paragraph">
        {{ $t('history:science-body-17') }}
      </div>
    </div>
    <div class="software-container" :id="sections[2].href">
      <h4 class="header">
        {{ $t('history:software-header') }}
      </h4>
      <div class="history-paragraph">
        <section class="history-media-asset">
          <img src="@/assets/history/software.png" alt="a multicolored wireframe illustration of a brain" />
          <p class="history-media-asset-description">
            {{ $t('history:software-media-caption') }}
          </p>
        </section>
        {{ $t('history:software-body-1') }}
      </div>
      <div class="history-paragraph">
        {{ $t('history:software-body-2') }}
      </div>
    </div>
    <div class="community-container" :id="sections[3].href">
      <h4 class="header">
        {{ $t('history:community-header') }}
      </h4>
      <div class="history-paragraph">
        <section class="history-media-asset responsive">
          <img src="@/assets/history/community.png" alt="A group photo of participants at Eternacon" />
          <p class="history-media-asset-description">
            {{ $t('history:community-media-caption') }}
          </p>
        </section>
        {{ $t('history:community-body-1') }}
      </div>
    </div>
    <template #sidebar="{ isInSidebar }">
      <HistoryInfoPanel :sections="sections" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import HistoryInfoPanel from './components/HistoryInfoPanel.vue';
  import HistoryData from './types';


  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      HistoryInfoPanel
    },
  })
  export default class History extends Mixins(FetchMixin) {
    data: HistoryData | null = null;

    sections: object[] = [
      {
        id: 0,
        title: "Origin",
        href: "origin"
      },
      {
        id: 1,
        title: "Science",
        href: "science"
      },
      {
        id: 2,
        title: "Software",
        href: "software"
      },
      {
        id: 3,
        title: "Community",
        href: "community"
      }
    ];

    async fetch() {
      const historyResults = (
        await this.$http.get(`/get/?type=history`)
      ).data.data.history as HistoryData;

      this.data = historyResults;
    }

    formattedNumber(number: string) {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .origin-container {
    position: relative;
    border-radius: 5px;
    background-color: #043468;
    padding: 25px;
    margin-bottom: 30px;
  }

  .science-container {
    position: relative;
    padding-bottom: 25px;
    margin-bottom: 30px;
    border-bottom: 1px solid #2F94D1;
  }

  .software-container {
    position: relative;
    padding-bottom: 25px;
    margin-bottom: 30px;
    border-bottom: 1px solid #2F94D1;
  }

  .community-container {
    position: relative;
    margin-bottom: 30px;
  }

  .header {
    margin-bottom: 1.5rem;
  }

  .history-media-asset {
    float: right;
    margin-left: 15px;
    width: 400px;

    & iframe {
      width: 400px;
      height: 250px;
      border-radius: 5px;

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    & img {
      width: 400px;
      border-radius: 5px;
      margin-bottom: 10px;

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    @include media-breakpoint-down(sm) {
      &.responsive {
        float: none;
        width: 100%;
        margin-left: 0px;
      }

      &:not(.responsive) {
        width: 200px;
        & img {
          width: 200px;
        }

        & iframe {
          width: 200px;
        }
      }
    }
  }

  .history-media-asset-description {
    display: inline-block;
    font-size: 0.7rem;
  }

  .history-paragraph {
    margin-bottom: 20px;
  }

  .stats-container {
    width: 100%;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid #2F94D1;

    .stat {
      display: inline-flex;
      flex-direction: column;
      width: 50%;
      background-color: #043468;
      margin-bottom: 10px;

      padding: 15px;
      border-radius: 5px;

      &:nth-child(2n+1) {
        margin-right: 10px;
        width: calc(50% - 10px);

        @include media-breakpoint-down(sm) {
          margin-right: 0px;
          width: 100%;
        }
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
      }

      .stat-number {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
      }

      .stat-description {
        font-size: 0.8rem;
        color: #2F94D1;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
</style>
