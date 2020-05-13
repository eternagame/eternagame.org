<template>
  <EternaPage>
    <div v-if="pageData">
      <Banner :labs="pageData.labs" :puzzle="pageData.puzzle" />

      <h2 class="section-header">
        {{ $t('player-home:section1') }}
      </h2>
      <Carousel :slideTo="masteringEternaProgressNumber">
        <swiper-slide v-for="(item, index) in masteringEterna" :key="index">
          <QuestCard
            :key="item.title"
            v-bind="item"
            :imageLink="item.questLink"
            :buttonLink="item.puzzleLink"
          />
        </swiper-slide>
      </Carousel>

      <h2 class="section-header">
        {{ $t('player-home:section2') }}
      </h2>
      <Carousel :slideTo="newPlayerProgressNumber">
        <swiper-slide v-for="(item, index) in newPlayerRoadMap" :key="index">
          <QuestCard :key="item.title" v-bind="item" />
        </swiper-slide>
      </Carousel>
    </div>
    <div v-else>
      <Preloader/>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  // @ts-ignore
  import get from 'lodash.get';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import Progress from '@/components/Common/Progress.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import Utils from '@/utils/utils';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Banner from './components/Banner.vue';

  @Component({
    components: {
      EternaPage,
      QuestCard,
      Progress,
      SwiperSlide,
      Carousel,
      Banner,
      Preloader,
    },
  })
  export default class ExperiencedPlayerView extends Vue {
    @Prop({}) pageData!: Object;

    redirect(path: string) {
      this.$router.push(path);
    }

    get masteringEterna() {
      return get(this.pageData, 'achievement_roadmap', [])
        .filter((p: { key: string }) => (p.key as string).includes('side_quest'))
        .filter(p => p.level === p.current_level + 1)
        .map(p => ({
          ...p,
          questLink: Utils.getQuestLink(p.key as string),
          puzzleLink: Utils.getPuzzleLink(p.key as string),
        }));
    }

    get newPlayerRoadMap() {
      return get(this.pageData, 'achievement_roadmap', []).filter(
        (p: { key: string }) => (p.key as string) === 'ten_tools',
      );
    }

    get newPlayerProgressNumber() {
      return this.newPlayerRoadMap && this.newPlayerRoadMap[0].current_level;
    }

    get masteringEternaProgressNumber() {
      return this.masteringEterna && this.masteringEterna[0].current_level;
    }

    get progressData() {
      return {
        'banner-title': 'Optimizing the Ribosome',
        'banner-sub-title': 'Ribosome Design Challenge',
        'banner-image':
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png',
        progressCircles: [
          { name: 'Designs Submitted', number: 14276, total: 24000 },
          { name: 'My Submissions', number: 526, total: 1200 },
        ],
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .section-header {
    margin-top: 61px;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 18px;
  }

  @include media-breakpoint-up(sm) {
    h1,
    h2,
    h3 {
      text-align: left;
    }

    h1 {
      font-size: 42px;
    }

    h2 {
      font-size: 36px;
    }

    h3 {
      font-size: 24px;
    }
  }
</style>
