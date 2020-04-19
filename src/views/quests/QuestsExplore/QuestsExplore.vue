<template>
  <EternaPage v-if="pageData">
    <p>{{ $t('quests-explore:top-tip') }}</p>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
      {{ $t('quests-explore:section1') }}
    </h1>
    <Carousel>
      <swiper-slide v-for="(item, index) in puzzles" :key="index">
        <QuestCard :nid="index" title="test" leftNumber="1" rightNumber="2" states="0" />
      </swiper-slide>
    </Carousel>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
      {{ $t('quests-explore:section2') }}
    </h1>
    <Carousel>
      <swiper-slide v-for="(item, index) in quests" :key="index">
        <QuestCard :nid="index" :progress="item" />
      </swiper-slide>
    </Carousel>

    <template #sidebar="{ isInSidebar }">
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <TagsPanel
        :tags="['#Switch', '#Ribozyme', '#XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import { BIconArrowUp, BIconChevronRight, BIconChevronLeft } from 'bootstrap-vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import LabsExploreData, { LabCardData } from './types';
  import 'swiper/css/swiper.css';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get('/get/?type=get_labs_for_lab_cards&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as LabsExploreData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      FiltersPanel,
      PuzzleCard,
      QuestCard,
      Swiper,
      SwiperSlide,
      BIconChevronRight,
      BIconChevronLeft,
      Carousel,
    },
  })
  export default class LabsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private filters: Filter[] = [
      { value: 'single_state', text: 'Single state' },
      { value: 'switches', text: 'Switches' },
      { value: 'switches', text: 'Switches' },
      { value: 'boosting', text: 'Boosting' },
      { value: 'energy_traps', text: 'Energy Traps' },
      { value: 'bulges', text: 'Bulges' },
      { value: 'multiloops', text: 'Multiloops' },
      { value: 'riboswitches', text: 'Riboswitches' },
      { value: 'uncleared', text: 'Uncleared' },
    ];

    private swiperOption = {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.next-elem',
        prevEl: '.prev-elem',
      },
    };

    private puzzles: number[] = [1, 2, 3, 4, 5, 6, 7];

    private quests: number[] = [40, 20, 30];
  }
</script>
<style lang="scss" scoped>
  ::v-deep .swiper-pagination-bullet-active {
    background-color: white;
  }
</style>
