<template>
  <EternaPage>
    <div v-if="pageData">
      <Banner :labs="pageData.labs" :potw="pageData.potw" />

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
      <Preloader />
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import Progress from '@/components/Common/Progress.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import Utils from '@/utils/utils';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { AchievementItem } from '@/types/common-types';
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
    @Prop({required:true}) pageData!: any;

    get achievementRoadmap() {
      return this.pageData?.achievement_roadmap || [];
    }

    get masteringEterna() {
      return this.achievementRoadmap
        .filter((p: AchievementItem) => p.key.includes('side_quest'))
        .filter((p: AchievementItem) => Number(p.level) === Number(p.current_level) + 1)
        .map((p: AchievementItem) => ({
          ...p,
          questLink: Utils.getQuestLink(p.key),
          puzzleLink: Utils.getPuzzleLink(p.key),
        }));
    }

    get newPlayerRoadMap() {
      return this.achievementRoadmap.filter((p: AchievementItem) => p.key === 'ten_tools');
    }

    get newPlayerProgressNumber() {
      return this.newPlayerRoadMap && this.newPlayerRoadMap[0].current_level;
    }

    get masteringEternaProgressNumber() {
      return this.masteringEterna && this.masteringEterna[0].current_level;
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
