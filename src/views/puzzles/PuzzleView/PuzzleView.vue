<template>
  <EternaPage v-if="puzzle" :title="puzzle.title">
    <div class="page-content">
      <h2>About the Puzzle</h2>
      <div class="d-flex flex-wrap " xs="12" sm="8">
        <div style="text-align:center" class="order-sm-2 image-col">
          <div class="puzzle-image">
            <img v-if="imageURL" :src="imageURL" />
          </div>
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            :href="`${puzzleRoute}${puzzle.id}/`"
          >
            {{ $t('puzzle-view:main-action') }}
          </b-button>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="puzzle-description" style="word-wrap: break-word;"
            v-dompurify-html="puzzle.body"
          />
        </div>
      </div>

    </div>

    <Comments
      :comments="pageData.comments"
      :nid="puzzle.id"
    />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('puzzle-view:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" />
        </template>
        <ul style="padding: 0; list-style-type:none">
          <li v-if="puzzle['made-by-player']">
            <img :src="avatar" class="icon" />{{ puzzle.username }}
          </li>
          <li v-if="puzzle.reward">
            <img src="@/assets/dollar.svg" class="icon" />{{ puzzle.reward }}
          </li>
          <li>
            <img src="@/assets/people.svg" class="icon" />
            {{ puzzle['num-cleared'] ? puzzle['num-cleared'] : 0 }}
          </li>
          <li v-if="puzzle.created">
            <img src="@/assets/calendar.svg" class="icon" />{{ puzzle.created }}
          </li>
        </ul>
      </SidebarPanel>
      <!-- <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import Utils from '@/utils/utils';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import PuzzleData from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=puzzle&nid=${route.params.id}&script=-1`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as PuzzleData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      SidebarPanel,
      Preloader,
      Comments
    },
  })
  export default class PuzzleView extends Mixins(PageDataMixin(fetchPageData)) {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    get puzzle() {
      return get(this.pageData, 'puzzle');
    }

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(get(this.pageData, 'nid', ''));
    }

    get avatar() {
      return Utils.getAvatar(this.puzzle.userpicture);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .description-col {
    width: 60%;
  }

  .image-col {
    width: 40%;
  }

  @include media-breakpoint-down(xs) {
    .description-col, .image-col {
      width: 100%;
    }
  }

  .quest-image {
    margin: 15px;
  }

  .puzzle-image {
    width: 100%;
    background-color: #041227;
    border-radius: 5px;
    padding: 50px 60px;

    img {
      width: 100%;
    }
  }

  .puzzle-description {
    white-space: pre-wrap;
  }

  .submit-button {
    margin-top: 15px;
  }
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  h3 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
  }
  p {
    font-size: 17px;
    line-height: 1.47;
  }

  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }

  li {
    margin-bottom: 20px;
  }
</style>
