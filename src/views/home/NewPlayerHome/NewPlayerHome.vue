<template>
  <EternaPage v-if="pageData" title="">
    <b-container class="video">
      <p style="font-size: 2.8rem; font-weight: bold;">
        {{ $t('player-home:banner-title') }}
      </p>
      <p style="width: 482px; height: 151px;">
        {{ $t('player-home:banner-explain') }}
      </p>
      <b-button variant="primary" size="lg" to="/game/puzzle/6502927/" style="margin-right:10px">{{
        $t('player-home:next-puzzle')
      }}</b-button>
      <b-button variant="secondary" size="lg" to="/game/puzzle/6502927/">{{
        $t('player-home:nova-labs')
      }}</b-button>

      <div class="d-flex" style="margin-top: 22px;">
        <p style="margin-right: 20px;">
          <i class="arrow_right"></i>{{ $t('player-home:video-library') }}
        </p>
      </div>
    </b-container>

    <p
      style="
         {
          margin: 34px 0px;
          font-size: 2rem;
          text-align: center;
          line-height: 1.37;
        }
      "
    >
      {{ $t('player-home:lab-access') }}
    </p>
    <Carousel>
      <swiper-slide v-for="(item, index) in newPlayerRoadMap" :key="index">
        <PuzzleCard :key="item.current_puzzle" :nid="item.current_puzzle" v-bind="item" />
      </swiper-slide>
    </Carousel>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Carousel from '@/components/Common/Carousel.vue';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import { PageData, FilteredPageData } from './types';
  import { Filter } from '../../../components/Sidebar/FiltersPanel.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (await http.get('/get/?type=me')).data.data;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      Carousel,
      SwiperSlide,
      PuzzleCard,
    },
  })
  export default class NewPlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    @Prop({}) data!: Object;

    get newPlayerRoadMap() {
      return (
        this.pageData.progress
        && this.pageData
      );
    }

    get pageData() {
      return {
        'banner-image':
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png',
        progress: 50,
        ...this.data,
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
      url('https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/30A7BAEF-4A98-47AC-8B29-5150806B518E.png');
    background-position: right;
    background-repeat: no-repeat;
    object-fit: contain;
    height: 441px;
    padding: 31px;
  }

  .video-wrapper {
    background-color: $dark;
    padding-top: 10px;
    border-radius: 5px;
  }
</style>
