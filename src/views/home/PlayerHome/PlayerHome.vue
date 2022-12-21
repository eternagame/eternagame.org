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
        style="text-shadow: 1px 1px 2px #333"
      >
        <template v-if="hasLabAccess">
          <LabSlide
            v-for="lab in labCarouselLabs"
            v-bind="lab"
            :key="lab.nid"
          />
          <POTWSlide v-bind="potwSlideData" v-if="potwSlideData" />
        </template>
        <template v-else>
          <TutorialTeaserSlide :nextPuzzleID="nextPuzzleID" />
        </template>
      </b-carousel>
      <br />
      <div class="flex">
        <h3>Latest News</h3>
        <div class="row">
          <div class="col-md-4">
            <NewsCard :key="newsItems[0].nid" v-bind="newsItems[0]"></NewsCard>
          </div>
          <div class="col-md-4">
            <NewsCard :key="newsItems[1].nid" v-bind="newsItems[1]"></NewsCard>
          </div>
          <div class="col-md-4">
            <NewsCard :key="newsItems[2].nid" v-bind="newsItems[2]"></NewsCard>
            <p class="text-right"><a href="/news">View All ></a></p>
          </div>
        </div>
      <!-- <div class="row">
          <div class="col-md-6">
            <h3>Latest News</h3>
            <Gallery :sm="12" :md="12">
              <NewsActivity
                v-for="article in newsItems"
                :key="article.nid"
                :article="article"
              />
            </Gallery>
            <Pagination :key="newsItems.length" />
            <p class="text-right"><a href="/news">View All ></a></p>
          </div>

          <div class="col-md-6">
            <h3>Upcoming Events</h3>
            <FullCalendar :options="calendarOptions" />
            <p class="text-right"><a href="/calendar">View All ></a></p>
          </div>
        </div> -->
      </div>
      <template v-if="hasLabAccess">
        <div>
          <QuestActivity
            :sideQuests="masteringEternaAchievements"
            :collections="collections"
          />
        </div>
        <div class="section-spacing">
          <TutorialActivity
            :stages="tenToolsAchievements"
            :collections="collections"
            :heading="$t('player-home:advanced-tutorials')"
          />
        </div>
        <div class="section-spacing">
          <TutorialActivity
            :stages="eternaEssentialsAchievements"
            :collections="collections"
            :heading="$t('player-home:eterna-essentials-completed')"
          />
        </div>
      </template>
      <template v-else>
        <div>
          <TutorialActivity
            :stages="eternaEssentialsAchievements"
            :collections="collections"
            :heading="$t('player-home:eterna-essentials')"
          />
        </div>
        <div class="section-spacing">
          <TutorialActivity
            :stages="tenToolsAchievements"
            :collections="collections"
            :heading="$t('player-home:advanced-tutorials')"
          />
        </div>
      </template>
    </template>
    <Preloader v-else />
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import {
    RoadmapAchievement,
    ProcessedRoadmapAchievement,
    BlogItem,
    NewsItem,
    CollectionItem,
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Carousel from '@/components/Common/Carousel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FullCalendar from '@fullcalendar/vue';
  import interactionPlugin from '@fullcalendar/interaction';
  import googleCalendarPlugin from '@fullcalendar/google-calendar';
  import listPlugin from '@fullcalendar/list';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import { LabData } from '../../labs/LabView/types';
  import TutorialTeaserSlide from './components/banner/TutorialTeaserSlide.vue';
  import POTWSlide from './components/banner/POTWSlide.vue';
  import LabSlide from './components/banner/LabSlide.vue';
  import IdeaJamSlide from './components/banner/IdeaJamSlide.vue';
  import QuestActivity from './components/activities/QuestActivity.vue';
  import TutorialActivity from './components/activities/TutorialActivity.vue';
  import '@fullcalendar/core/vdom'; // solves problem with Vite
  import NewsActivity from './components/activities/NewsActivity.vue';
  import NewsCard from '../../news/NewsExplore/components/NewsCard.vue';

  @Component({
    components: {
      EternaPage,
      Carousel,
      POTWSlide,
      LabSlide,
      TutorialTeaserSlide,
      Preloader,
      QuestActivity,
      TutorialActivity,
      IdeaJamSlide,
      Pagination,
      FullCalendar,
      NewsActivity,
      NewsCard
    },
  })
  export default class PlayerHome extends Mixins(FetchMixin) {
    potwSlideData: object | null = null;

    labCarouselLabs: LabData[] = [];

    tenToolsAchievements: RoadmapAchievement[] = [];

    eternaEssentialsAchievements: RoadmapAchievement[] = [];

    masteringEternaAchievements: ProcessedRoadmapAchievement[] = [];

    newsItems: (NewsItem | BlogItem)[] = [];

    collections: CollectionItem[] = [];

    async fetch() {
      const res = await Promise.all([
        this.$http.get('/get/?type=side_project_roadmap'),
        this.$http.get('/get/?type=carousel'),
        this.$http.get('/get/?type=puzzle_of_the_week'),
        this.$http.get('/get/?type=newsandblogslist&size=3'),
        this.$http.get('/get/?type=collections&quest=true&size=30'),
      ]);

      const roadmap = res[0].data.data
        .achievement_roadmap as RoadmapAchievement[];
      this.tenToolsAchievements = roadmap.filter((p) => p.key === 'ten_tools');
      this.eternaEssentialsAchievements = roadmap.filter(
        (p) => p.key === 'eterna_essentials',
      );
      this.masteringEternaAchievements = roadmap
        .filter((p) => p.key.includes('side_quest'))
        .map((p) => ({
          ...p,
          prereqSatisfied:
            p.prereq === undefined ||
            roadmap.some(
              (ach) =>
                `${ach.key}${ach.level}` === ach.prereq &&
                Number(ach.current_level) >= ach.level,
            ),
        }));

      this.labCarouselLabs = res[1].data.data.labs;
      this.potwSlideData = res[2].data.data;
      this.newsItems = res[3].data.data.entries;
      this.collections = res[4].data.data.collections;

      this.$vxm.user.refreshAchievements();
    }

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }

    get nextPuzzleID() {
      return this.eternaEssentialsAchievements[0].current_puzzle;
    }

    data() {
      return {
        calendarOptions: {
          initialView: 'upcoming',
          headerToolbar: false,
          plugins: [
            dayGridPlugin,
            interactionPlugin,
            googleCalendarPlugin,
            listPlugin,
          ],
          views: {
            upcoming: {
              type: 'list',
              duration: { days: 14 },
            },
          },
          height: 'auto',
          eventClick: this.handleEventClick,
          googleCalendarApiKey: process.env.VUE_APP_GOOGLE_API_ID,
          events: {
            googleCalendarId: process.env.VUE_APP_GOOGLE_CALENDAR_ID,
            success: (content: [{start: string}]) => {
              // This function is called after FullCalendar has loaded the events
              // from the Google Calendar. EventSourceSuccess allows us to transform
              // the events before display. Here we sort them and filter down to the
              // first N events. This is necessary because FullCalendar's Google
              // integration doesn't support the maxResults or orderBy options.
              const numberOfEventsToDisplay = 4;
              const filteredEvents = content.sort((a, b) => {
                const aStart = new Date(a.start).valueOf();
                const bStart = new Date(b.start).valueOf();
                if (a.start == null || b.start == null) { return 0; }
                return aStart - bStart;
              })
                .slice(0, numberOfEventsToDisplay);

              return filteredEvents;
            }
          },
        },
      };
    }

    handleEventClick(info: {
      jsEvent: { preventDefault: () => void };
      event: { url: string | URL | undefined };
    }) {
      info.jsEvent.preventDefault(); // don't let the browser navigate

      if (info.event.url) {
        window.open(info.event.url);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

:deep(section) {
  text-align: center;
}

:deep(.player-progress-bar) {
  max-width: 100%;
}

.fc {
  --fc-list-event-hover-bg-color: #043468;
  --fc-page-bg-color: #043468;
  --fc-border-color: #043468;
  --fc-neutral-bg-color: #043468;
}

#header-carousel {
  // Overflow page margins as a hero element.
  margin-top: -$page-margin-top;
  margin-left: -$page-margin-side;
  margin-right: -$page-margin-side;
}

#header-carousel :deep(.carousel-inner) {
  min-height: 300px;
}

#header-carousel :deep(.carousel-control-prev),
:deep(.carousel-control-next) {
  max-width: 100px;
}

#header-carousel :deep(.carousel-caption) {
  left: min(100px, 15%) !important;
  right: min(100px, 15%) !important;
}

.section-spacing {
  margin-top: 32px;
}
</style>
