<template>
  <EternaPage v-if="player">
    <b-container class="video">
      <p style="font-size: 2.8rem; font-weight: bold;">Optimizing the Ribosome</p>
      <p>
        {{ `Ribosome Design Challenge`.toUpperCase() }}
      </p>
      <b-button variant="primary" size="lg" to="/game/puzzle/6502927/">Enter Lab</b-button>
    </b-container>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
      Puzzles
    </h1>
    <Swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in puzzles" :key="index">
        <PuzzleCard :nid="index" title="test" leftNumber="1" rightNumber="2" states="0" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </Swiper>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">Quests</h1>
    <Swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in quests" :key="index">
        <QuestCard :nid="index" :progress="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </Swiper>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import 'swiper/css/swiper.css';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      PuzzleCard,
      QuestCard,
      Swiper,
      SwiperSlide,
    },
  })
  export default class ExperiencedPlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get player() {
      return {};
    }

    private picture: string = `${process.env.VUE_APP_API_BASE_URL}/sites/default/files/pictures/picture-133043.png`;

    // private picture: string = 'https://graph.facebook.com/10220887579400634/picture?type=normal';

    private playerName: string = 'Iroppy';

    private playerRank: string = '1';

    private swiperOption = {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    private puzzles: number[] = [1, 2, 3, 4, 5, 6, 7];

    private quests: number[] = [40, 20, 30];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
      url('https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png');
    background-position: right;
    background-repeat: no-repeat;
    object-fit: contain;
    @include media-breakpoint-up(sm) {
      height: 519px;
      padding: 31px;
      padding-top: 322px;
    }
    height: 400px;
    padding-top: 91px;
    width: 100%;
  }

  .video-wrapper {
    background-color: $dark;
    padding-top: 10px;
    border-radius: 5px;
  }
</style>
