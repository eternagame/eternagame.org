<template>
  <EternaPage v-if="pageData">
    <b-container
      class="video"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),url('${
          pageData[`banner-image`]
        }')`,
      }"
    >
      <div style="float:right" class="d-flex">
        <Progress
          :progress="pageData.progressCircles[0].number"
          :total="pageData.progressCircles[0].total"
          :name="pageData.progressCircles[0].name"
          color="#2f94d1"
        />
        <Progress
          :progress="pageData.progressCircles[1].number"
          :total="pageData.progressCircles[1].total"
          :name="pageData.progressCircles[1].name"
          color="#fac244"
        />
      </div>
      <p style="font-size: 2.8rem; font-weight: bold;">{{ pageData[`banner-title`] }}</p>

      <p>
        {{ pageData[`banner-sub-title`].toUpperCase() }}
      </p>
      <b-button variant="primary" size="lg" to="/game/puzzle/6502927/">Enter Lab</b-button>
    </b-container>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
      {{ $t('player-home:section1') }}
    </h1>
    <Carousel>
      <swiper-slide v-for="(item, index) in pageData.section1" :key="index">
        <QuestCard v-bind="item" />
      </swiper-slide>
    </Carousel>

    <h1 :style="{ fontSize: '36px', fontWeight: 'bold', marginTop: '61px' }">
      {{ $t('player-home:section2') }}
    </h1>
    <Carousel>
      <swiper-slide v-for="(item, index) in pageData.section2" :key="index">
        <QuestCard v-bind="item" />
      </swiper-slide>
    </Carousel>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import Progress from '@/components/Common/Progress.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import { SwiperSlide } from 'vue-awesome-swiper';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      QuestCard,
      Progress,
      SwiperSlide,
      Carousel,
    },
  })
  export default class ExperiencedPlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get pageData() {
      return {
        'banner-title': 'Optimizing the Ribosome',
        'banner-sub-title': 'Ribosome Design Challenge',
        'banner-image':
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png',
        progressCircles: [
          { name: 'Designs Submitted', number: 14276, total: 24000 },
          { name: 'My Submissions', number: 526, total: 1200 },
        ],
        section1: [
          {
            progress: 'NOT_STARTED',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/653E5870-777B-4DC6-852E-41DDFBB2EFF4.png',
          },
          {
            progress: '10',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/16AAD8FC-B5DF-4FB9-A864-72AB72F1A11B.png',
          },
          {
            progress: '60',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/B810FFE7-B74B-40AF-8B0A-24ACD37B2E4B.png',
          },
          {
            progress: '80',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/B7157DB3-77E3-4715-B14C-510F21A882DF.png',
          },
          {
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          },
        ],

        section2: [
          {
            completed: 'COMPLETED',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          },
          {
            progress: '10',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/DD8C4AA4-03E0-4BA4-8D95-8BAE98DFB188.png',
          },
          {
            progress: 'NOT_STARTED',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/8838E8FF-526E-43B2-9075-4393909F031A.png',
          },
          {
            progress: 'NOT_STARTED',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/6E8256FC-2BC3-449B-A275-46FA347DA721.png',
          },
          {
            progress: 'NOT_STARTED',
            imageUrl:
              'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/AD1E3A4A-352B-49BF-A95A-1F15015EE1C5.png',
          },
        ],
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video {
    background-position: right;
    background-repeat: no-repeat;
    object-fit: cover;
    @include media-breakpoint-up(sm) {
      height: 519px;
      padding: 31px;
      padding-top: 322px;
    }
    height: 400px;
    padding-top: 91px;
    width: 100%;
  }
</style>
