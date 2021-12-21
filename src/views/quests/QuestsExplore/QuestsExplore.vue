<template>
  <EternaPage>
    <div v-if="true">
      <h3 :style="{ fontSize: '16px', fontWeight: 'bold' }">
        {{ $t('quests-view:top-tip') }}
      </h3>

      <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
        {{ $t('quests-view:section1') }}
      </h1>
      <Carousel>
        <swiper-slide v-for="(item, index) in section1" :key="index">
          <QuestCard v-bind="item" />
        </swiper-slide>
      </Carousel>

      <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
        {{ $t('quests-view:section2') }}
      </h1>
      <Carousel>
        <swiper-slide v-for="(item, index) in section2" :key="index">
          <QuestCard v-bind="item" />
        </swiper-slide>
      </Carousel>

      <h4 :style="{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase' }">
        {{ $t('quests-view:section3') }}
      </h4>

      <Gallery>
        <QuestCard v-for="(item, index) in section3" :key="index" v-bind="item" />
      </Gallery>
      <Pagination :key="section3.length" />
    </div>
    <div v-else>
      <Preloader/>
    </div>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('Search Quests')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <TagsPanel
      :tags="['#Switch', '#Ribozyme', '#XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      />
      <b-button
       type="submit"
        variant="primary"
        class="submit-button"
        to="/create/quest"
      >
      {{ $t('Create a Quest')}}
      </b-button>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { BIconChevronRight, BIconChevronLeft } from 'bootstrap-vue';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import { Component, Vue } from 'vue-property-decorator';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';


  const INITIAL_NUMBER = 18;

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
      Pagination,
      Preloader,
      SearchPanel,
    },
  })
  export default class QuestsExplore extends Vue {
    get section1() {
      return [
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/653E5870-777B-4DC6-852E-41DDFBB2EFF4.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: '10',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/16AAD8FC-B5DF-4FB9-A864-72AB72F1A11B.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: '60',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/B810FFE7-B74B-40AF-8B0A-24ACD37B2E4B.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: '80',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/B7157DB3-77E3-4715-B14C-510F21A882DF.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
      ];
    }

    get section2() {
      return [
        {
          completed: 'COMPLETED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: '10',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/DD8C4AA4-03E0-4BA4-8D95-8BAE98DFB188.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/8838E8FF-526E-43B2-9075-4393909F031A.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/6E8256FC-2BC3-449B-A275-46FA347DA721.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
      ];
    }

    get section3() {
      return [
        {
          completed: 'COMPLETED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: '10',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/DD8C4AA4-03E0-4BA4-8D95-8BAE98DFB188.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/8838E8FF-526E-43B2-9075-4393909F031A.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/6E8256FC-2BC3-449B-A275-46FA347DA721.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
        {
          progress: 'NOT_STARTED',
          image:
            'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          to_next: "",
          title: "Goose",
          desc: "Goose",
          level: "1",
          current_level: "10",
        },
      ];
    }

    private filters: Filter[] = [
      { value: 'single_state', text: 'Single state' },
      { value: 'switches', text: 'Switches' },
      { value: 'boosting', text: 'Boosting' },
      { value: 'energy_traps', text: 'Energy Traps' },
      { value: 'bulges', text: 'Bulges' },
      { value: 'multiloops', text: 'Multiloops' },
      { value: 'riboswitches', text: 'Riboswitches' },
      { value: 'uncleared', text: 'Uncleared' },
    ];
  }
</script>
<style lang="scss" scoped>
  ::v-deep .swiper-pagination-bullet-active {
    background-color: white;
  }
</style>
