<template>
  <EternaPage>
    <template v-if="fetchState.firstFetchComplete">
      <b-carousel
        id="header-carousel"
        :interval="4000"
        controls
        indicators
        background="#05224b"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <template v-if="hasLabAccess">
          <LabSlide v-for="lab in labCarouselLabs" v-bind="lab" :key="lab.nid" />
          <POTWSlide v-bind="potwSlideData" v-if="potwSlideData" />
          <AnniversarySlide />
        </template>
        <template v-else>
          <TutorialTeaserSlide :nextPuzzleID="nextPuzzleID" />
          <AnniversarySlide />
        </template>
      </b-carousel>

      <TutorialActivity :tools="tenToolsAchievements" v-if="!hasLabAccess" />
      <QuestActivity :sideQuests="masteringEternaAchievements" />
      <TutorialActivity :tools="tenToolsAchievements" v-if="hasLabAccess" />
    </template>
    <Preloader v-else />
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins} from 'vue-property-decorator';
  import { RoadmapAchievement, ProcessedRoadmapAchievement } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { LabData } from '../../labs/LabView/types';
  import TutorialTeaserSlide from './components/banner/TutorialTeaserSlide.vue';
  import POTWSlide from './components/banner/POTWSlide.vue';
  import LabSlide from './components/banner/LabSlide.vue';
  import EternaconSlide from './components/banner/EternaconSlide.vue';
  import AnniversarySlide from './components/banner/AnniversarySlide.vue';
  import IdeaJamSlide from './components/banner/IdeaJamSlide.vue';
  import QuestActivity from './components/activities/QuestActivity.vue';
  import TutorialActivity from './components/activities/TutorialActivity.vue';

  @Component({
    components: {
      EternaPage,
      Carousel,
      POTWSlide,
      LabSlide,
      TutorialTeaserSlide,
      EternaconSlide,
      Preloader,
      QuestActivity,
      TutorialActivity,
      AnniversarySlide,
      IdeaJamSlide
    },
  })
  export default class PlayerHome extends Mixins(FetchMixin) {
    potwSlideData: object| null = null;

    labCarouselLabs: LabData[] = [];

    tenToolsAchievements: RoadmapAchievement[] = [];

    masteringEternaAchievements: ProcessedRoadmapAchievement[] = [];

    async fetch() {
      const res = await Promise.all([
        this.$http.get('/get/?type=side_project_roadmap'),
        this.$http.get('/get/?type=carousel'),
        this.$http.get('/get/?type=puzzle_of_the_week'),
      ]);

      const roadmap = res[0].data.data.achievement_roadmap as RoadmapAchievement[];
      this.tenToolsAchievements = roadmap.filter(p => p.key === 'ten_tools');
      this.masteringEternaAchievements = roadmap
        .filter(p => p.key.includes('side_quest'))
        .map(p => ({
          ...p,
          prereqSatisfied: roadmap.some(
            ach => ach.prereq === undefined || (
              `${ach.key}${ach.level}` === ach.prereq
              && Number(ach.current_level) >= ach.level
            )
          )
        }));
        
      this.labCarouselLabs = res[1].data.data.labs;
      this.potwSlideData = res[2].data.data;

      this.$vxm.user.refreshAchievements();
    }

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }

    get nextPuzzleID() {
      return this.tenToolsAchievements[0].current_puzzle;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  ::v-deep section {
    text-align:center;
  }

  ::v-deep .player-progress-bar {
    max-width: 100%;
  }

  #header-carousel {
    // Overflow page margins as a hero element.
    margin-top: -$page-margin-top;
    margin-left: -$page-margin-side;
    margin-right: -$page-margin-side;
  }

  #header-carousel ::v-deep .carousel-inner {
    min-height: 300px;
  }

  #header-carousel ::v-deep .carousel-control-prev,
  ::v-deep .carousel-control-next {
    max-width: 100px;
  }

  #header-carousel ::v-deep .carousel-caption {
    left: min(100px, 15%) !important;
    right: min(100px, 15%) !important;
  }
</style>
