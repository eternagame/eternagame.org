<template>
  <EternaPage :title="collection.title" v-if="fetchState.firstFetchComplete && collection">
    <div class="page-content">
      <h2>About the Collection</h2>
      <div class="d-flex flex-wrap justify-content-between" xs="12" sm="8">
        <div style="text-align:center" class="order-sm-2 image-col">
          <div class="puzzle-image">
            <img v-if="collection.image" :src="collection.image" />
          </div>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="puzzle-description"
            style="overflow-wrap: break-word;"
            v-dompurify-html="collection.desc"
          />
        </div>
      </div>
    </div>
    <h2>
      {{ $t('nav-bar:puzzles') }}
    </h2>
    <Gallery sm="4" md="3" v-if="puzzles">
      <PuzzleCard
        v-for="puzzle in puzzles"
        :key="puzzle.puzzle.id"
        :nid="puzzle.puzzle.id"
        v-bind="puzzle.puzzle"
        :cleared="puzzleCleared(puzzle.puzzle.id)"
      />
    </Gallery>
    <div v-else>
      <Preloader />
    </div>
    <Comments :comments="comments" :nid="collection.nid" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('collection-info:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="collection">
          <li>
            <img :src="collection.userpicture" class="icon" />{{ collection.username }}
          </li>
          <li>
            <img src="@/assets/calendar.svg" class="icon" />{{ collection.created }}
          </li>
          <div v-if="editRights">
            <li>  
              <b-button
              type="submit"
              variant="primary"
              class="submit-button"
              :href="`/collections/${nid}/edit`"
              >
                {{ "Edit" }}
              </b-button>
            </li>
          </div>
        </ul>
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import CollectionCard from '@/components/Cards/QuestCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { PuzzleList, PuzzleItem, ClearedPuzzle, RoadmapAchievement, CollectionItem, CollectionResponse, CommentItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import Comments from '@/components/PageLayout/Comments.vue';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      PuzzleCard,
      CollectionCard,
      SidebarPanel,
      Preloader,
      Comments,
    },
  })
  export default class CollectionView extends Mixins(FetchMixin) {
    puzzles: PuzzleItem[] = [];

    cleared: ClearedPuzzle[] = [];

    collection: CollectionItem | null = null;

    comments: CommentItem[] = [];

    editRights: Boolean = false;

    nid = this.$route.params.id;

    async fetch(){
      const res = (
        await this.$http.get(`/get/?type=collection&nid=${this.$route.params.id}`)
      ).data.data as CollectionResponse;
      this.collection = res.collection;
      this.comments = res.comments;
      this.nid = res.collection.nid;
      if(this.collection.username === this.$vxm.user.username) this.editRights = true;
      const puzzlelist = this.collection.puzzles.split(",");
      Object.values(puzzlelist).forEach(async puzz => this.puzzles.push((await this.$http.get(`/get/?type=puzzle&nid=${parseInt(puzz, 10)}`)).data.data as PuzzleItem));
      this.cleared = await (await this.$http.get(`/get/?type=puzzle&nid=${puzzlelist[0]}`)).data.data.cleared;
    }

    puzzleCleared(id: string) {
      return this.cleared.map(puzzle => puzzle.id).includes(id);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .collection-badge {
    max-width: 270px;
  }

  .collection-description {
    background-color: $med-dark-blue;
    object-fit: contain;
    padding: 2rem;
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
