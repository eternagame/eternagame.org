<template>
  <!--
    Tacking on the `&& puzzle` just to make our lives easier with typing,
    as TS doesn't know that fetchState.firstFetchComplete correlates to it being filled out
  -->
  <EternaPage v-if="fetchState.firstFetchComplete && puzzle" :title="puzzle.title">
    <div class="page-content">
      <h2>About the Puzzle</h2>
      <div class="d-flex flex-wrap justify-content-between" xs="12" sm="8">
        <div style="text-align:center" class="order-sm-2 image-col">
          <div class="puzzle-image">
            <img alt="" v-if="imageURL" :src="imageURL" />
          </div>
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            :to="`/puzzles/${puzzle.id}/play`"
          >
            {{ $t('puzzle-view:main-action') }}
          </b-button>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="puzzle-description"
            style="overflow-wrap: break-word;"
            v-dompurify-html="puzzle.body"
          />
        </div>
      </div>
    </div>
    <Comments :comments="comments" :nid="puzzle.id" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('puzzle-view:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" alt="info" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="puzzle">
          <li v-if="madeByPlayer">
            <router-link :to="`/players/${puzzle.uid}`">
              <img :src="avatar" alt="author" class="icon" />{{ puzzle.username }}
            </router-link>
          </li>
          <li v-if="puzzle.folder">
            <img src="@/assets/chemical_bond.svg" alt="folding engine" class="icon" />{{ puzzle.folder }}
          </li>
          <li v-if="puzzle.reward">
            <img src="@/assets/dollar.svg" alt="reward" class="icon" />{{ puzzle.reward }}
          </li>
          <li>
            <img src="@/assets/people.svg" alt="players solved" class="icon" />
            {{ puzzle['num-cleared'] ? puzzle['num-cleared'] : 0 }}
          </li>
          <li v-if="puzzle.created">
            <img src="@/assets/calendar.svg" alt="created on" class="icon" />{{ puzzle.created }}
          </li>
          <li v-if="clearedThisPuzzle">
            <img src="@/assets/noun_check.svg" alt="cleared" class="icon" />Cleared
          </li>
        </ul>
      </SidebarPanel>
      <div>
        <div v-if="editRights && isInSidebar">
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            :to="`/puzzles/${nid}/edit`"
          >
            {{ $t('edit-puzzle-title-description') }}
          </b-button>
        </div>
        <div v-if="editRights && isInSidebar">
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            :to="`/puzzles/${nid}/edit-tutorial`"
          >
            {{ $t('edit-puzzle-tutorial') }}
          </b-button>
        </div>
        <FollowPanel class="submit-button" :nid="$route.params.id" :isInSidebar="isInSidebar" v-if="isInSidebar && $vxm.user.loggedIn" />
      </div>
      <!-- <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { PuzzleResponse, Puzzle, CommentItem, ClearedPuzzle } from '@/types/common-types';
  import FollowPanel from '@/components/Sidebar/FollowPanel.vue';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      SidebarPanel,
      Preloader,
      Comments,
      FollowPanel
    },
  })
  export default class PuzzleView extends Mixins(FetchMixin) {
    editRights: boolean = false;

    puzzle: Puzzle | null = null;

    nid: string | null = null;

    comments: CommentItem[] = [];

    clearedPuzzles: ClearedPuzzle[] = [];

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=puzzle&nid=${this.$route.params.id}&script=-1`, {
          params: {
            order: this.$route.query.sort,
            filters: this.$route.query.filters && (this.$route.query.filters as string).split(','),
          },
        })
      ).data.data as PuzzleResponse;
      this.puzzle = res.puzzle;
      this.nid = res.nid;
      this.comments = res.comments;
      this.clearedPuzzles = res.cleared || [];
      if(this.puzzle.username === this.$vxm.user.username) this.editRights = true;
    }

    get madeByPlayer() {
      return this.puzzle && this.puzzle['made-by-player'] !== '0';
    }

    get clearedThisPuzzle() {
      return this.puzzle && this.clearedPuzzles.some(puzzle => this.nid === puzzle.id);
    }

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.nid);
    }

    get avatar() {
      return Utils.getAvatar(this.puzzle?.userpicture || null);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .description-col {
    width: calc(60% - 15px);
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
    /* Ensure play button is always visible on short screens */
    height: min(calc(100vh - 300px), 450px);
    padding: min(1.6rem, (100vh - 300px) * 0.05) 2.2rem;
    img {
      width: 100%;
      height: 100%;
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
