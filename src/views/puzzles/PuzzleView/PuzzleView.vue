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

        <div v-if="!isEditing" class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="puzzle-description"
            style="word-wrap: break-word;"
            v-dompurify-html="puzzle.body"
          />
        </div>
        <div v-else class="order-sm-1 edit-col">
          <hr class="top-border d-sm-none" />
          <input class="form-control" v-model="puzzle.title" />
          <textarea class="form-control" v-model="puzzle.body"/>
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
          <img src="@/assets/info.svg" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="puzzle">
          <li v-if="madeByPlayer">
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
        <section v-if="madeByUser">
          <button class="btn btn-primary" @click="isEditing = !isEditing">{{ isEditing ? 'Submit' : 'Edit'}}</button>
          <br>
          <a :href="`${tutorialRoute}${nid}`" class="btn btn-primary mt-2">
            {{ puzzle.rscript ? 'Edit' : 'Create'}} Tutorial
          </a>
        </section>
      </SidebarPanel>
      <!-- <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import { PUZZLE_ROUTE_PREFIX,  PUZZLE_ROUTE_TUTORIAL_PREFIX} from '@/utils/constants';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { PuzzleResponse, Puzzle, CommentItem } from '@/types/common-types';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      SidebarPanel,
      Preloader,
      Comments,
    },
  })
  export default class PuzzleView extends Mixins(FetchMixin) {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    private tutorialRoute: string = PUZZLE_ROUTE_TUTORIAL_PREFIX;

    puzzle: Puzzle | null = null;

    nid: string | null = null;

    comments: CommentItem[] = [];

    private isEditing = false;

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
    }

    get madeByPlayer() {
      return this.puzzle && this.puzzle['made-by-player'] !== '0';
    }

    get madeByUser() {
      return this.puzzle && this.$vxm.user.uid && this.puzzle.uid === this.$vxm.user.uid.toString();
    }

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.nid);
    }

    get avatar() {
      return Utils.getAvatar(this.puzzle?.userpicture || null);
    }

    @Watch('isEditing')
    async submit() {
      if (!this.isEditing) return;
      const data = new URLSearchParams();
      data.set('type', 'edit_puzzle');
      data.set('nid', this.nid!.toString());
      data.set('title', this.puzzle!.title);
      data.set('description', this.puzzle!.body);
      const res = await this.$http.post(`${process.env.VUE_APP_API_BASE_URL}/post/`, data);
      console.log(res);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .description-col, .edit-col {
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
    padding: 1.6rem 2.2rem;
    img {
      width: 100%;
      max-height: 400px;
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

  .bottom-button {
    position: relative;
    bottom: 0px;
    margin-bottom: 0px;
  }
</style>
