<template>
  <EternaPage title="">
    <div v-if="pageData">
      <b-jumbotron
        fluid
        container-fluid
        class="video"
        :style="{
          backgroundImage: `${bannerImageStyle}`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
        }"
      >
        <div style="padding: 5rem 2rem;">
          <p class="video-title">
            {{ $t('player-home:banner-title') }}<br /><i>{{ $t('player-home:banner-together') }}</i>
          </p>

          <p class="explain">
            {{ $t('player-home:banner-explain') }}
          </p>
          <b-button
            class="button"
            variant="primary"
            size="lg"
            style="margin-right:10px"
            :href="`${puzzleRoute}${nextPuzzleId}`"
            >{{ $t('player-home:next-puzzle') }}</b-button
          >
          <b-button
            class="button"
            variant="secondary"
            size="lg"
            href="https://www.pbs.org/wgbh/nova/labs/lab/rna/"
            >{{ $t('player-home:nova-labs') }}</b-button
          >
          <div class="d-flex" style="margin-top: 22px;">
            <router-link to="/news/9818657">
              <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
                <i class="arrow_right"></i>{{ $t('player-home:open-vaccine') }}
              </p>
            </router-link>
          </div>
        </div>
      </b-jumbotron>

      <p class="section-title">
        {{ $t('player-home:lab-access') }}
      </p>
      <img v-if="progress" :src="progress" class="player-progress-bar" />
      <Carousel :slideTo="progressNumber">
        <swiper-slide v-for="(item, index) in newPlayerRoadMap" :key="index">
          <QuestCard :key="item.title" v-bind="item" />
        </swiper-slide>
      </Carousel>
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1>
    </div>
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
  import QuestCard from '@/components/Cards/QuestCard.vue';

  import PROGRESS_IMAGE_0 from '@/assets/progress/progress0.svg';
  import PROGRESS_IMAGE_1 from '@/assets/progress/progress1.svg';
  import PROGRESS_IMAGE_2 from '@/assets/progress/progress2.svg';
  import PROGRESS_IMAGE_3 from '@/assets/progress/progress3.svg';
  import PROGRESS_IMAGE_4 from '@/assets/progress/progress4.svg';
  import PROGRESS_IMAGE_5 from '@/assets/progress/progress5.svg';
  import PROGRESS_IMAGE_6 from '@/assets/progress/progress6.svg';
  import BANNER_IMAGE from '@/assets/home/new-player-hero.png';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  // @ts-ignore
  import get from 'lodash.get';
  import HomeData from '../types';

  const PROGRESS_IMAGES = [
    PROGRESS_IMAGE_0,
    PROGRESS_IMAGE_1,
    PROGRESS_IMAGE_2,
    PROGRESS_IMAGE_3,
    PROGRESS_IMAGE_4,
    PROGRESS_IMAGE_5,
    PROGRESS_IMAGE_6,
  ];

  @Component({
    components: {
      EternaPage,
      Carousel,
      SwiperSlide,
      PuzzleCard,
      QuestCard,
    },
  })
  export default class NewPlayerView extends Vue {
    @Prop({}) pageData!: HomeData;

    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    get bannerImageStyle() {
      return `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(${BANNER_IMAGE})`;
    }

    get newPlayerRoadMap() {
      return (
        this.pageData.achievement_roadmap
        && this.pageData.achievement_roadmap.filter(
          (p: { key: string }) => (p.key as string) === 'ten_tools',
        )
      );
    }

    get progressNumber() {
      return (
        this.pageData.achievement_roadmap && this.pageData.achievement_roadmap[0].current_level
      );
    }

    get nextPuzzle() {
      return this.newPlayerRoadMap.find(p => Number(p.level) === Number(this.progressNumber) + 1);
    }

    get nextPuzzleId() {
      return this.nextPuzzle && this.nextPuzzle.current_puzzle;
    }

    get progress() {
      return PROGRESS_IMAGES[this.progressNumber || 0];
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video-title {
    line-height: 3rem;
    font-size: 2.8rem;
    font-weight: bold;
    @include media-breakpoint-only(xs) {
      line-height: 1.6rem;
      font-size: 1.5rem;
    }
  }

  .video {
    background-repeat: no-repeat;
    min-height: 441px;
    height: 100%;
    // Overflow page margins as a hero element
    margin-top: -$page-margin-top;
    margin-left: -$page-margin-side;
    margin-right: -$page-margin-side;
  }

  .video-wrapper {
    background-color: $dark;
    padding-top: 10px;
    border-radius: 5px;
  }

  .section-title {
    margin: 34px 0px;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    line-height: 1.37;
    margin-top: 49px;
  }

  .player-progress-bar {
    margin: 0 auto;
    display: block;
    @include media-breakpoint-only(xs) {
      width: 100%;
      height: 100px;
    }
  }

  .explain {
    max-width: 482px;
  }

  .button {
    margin-top: 10px;
  }
</style>
