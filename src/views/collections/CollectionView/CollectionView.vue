<template>
  <EternaPage
    :title="collection.title"
    v-if="fetchState.firstFetchComplete && collection"
  >
    <div class="page-content">
      <h2>About the Collection</h2>
      <div class="d-flex flex-wrap justify-content-between" xs="12" sm="8">
        <div style="text-align: center" class="order-sm-2 image-col">
          <div class="puzzle-image">
            <img v-if="collection.image" :src="collection.image" alt="" />
          </div>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="puzzle-description"
            style="overflow-wrap: break-word"
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
        :key="puzzle.id"
        :nid="puzzle.id"
        v-bind="puzzle"
        :cleared="puzzleCleared(puzzle.id)"
        :madeByPlayer="puzzle['made-by-player'] !== '0'"
      />
    </Gallery>
    <div v-else>
      <Preloader />
    </div>
    <Comments :comments="comments" :nid="collection.nid" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('collection-info-sidebar:title')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" alt="info" />
        </template>
        <ul style="padding: 0; list-style-type: none" v-if="collection">
          <li>
            <img
              :src="'../' + collection.userpicture"
              class="icon"
              alt=""
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMy45OTkiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQiPg0KICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMiwyNEExMiwxMiwwLDEsMSwyNCwxMiwxMi4wMTMsMTIuMDEzLDAsMCwxLDEyLDI0Wk04LjE4NSwxMi44NzJhLjQ5LjQ5LDAsMCwxLC4xMzQuMDIuNDczLjQ3MywwLDAsMSwuMzE5LjMxOCw2LjEsNi4xLDAsMCwwLDEuMTA4LDIuMjE5LjQ3Mi40NzIsMCwwLDEsLjExMS4zdjEuMzM3YS45NjMuOTYzLDAsMCwxLS40OTEuODEyLjQ3Ny40NzcsMCwwLDEtLjExOC4wNDMsMTUuNTU0LDE1LjU1NCwwLDAsMC00Ljg0MiwyLjEsMTEuMDMsMTEuMDMsMCwwLDAsMTUuMTkxLDAsMTUuNCwxNS40LDAsMCwwLTQuODQxLTIuMS40NDMuNDQzLDAsMCwxLS4xMTctLjA0Mi45NTEuOTUxLDAsMCwxLS40OTItLjgxM1YxNS43MzJhLjQ2OS40NjksMCwwLDEsLjExMS0uMyw2LjEsNi4xLDAsMCwwLDEuMTA3LTIuMjE5LjQ2Ni40NjYsMCwwLDEsLjMxOS0uMzE5LjQ3OS40NzksMCwwLDEsLjEzNC0uMDIuNDY5LjQ2OSwwLDAsMSwuMjkyLjEsNi45NTgsNi45NTgsMCwwLDAsLjI0Ni0xLjgybC0uMDEzLDBoLS4wMzRhLjQ2OS40NjksMCwwLDEtLjQ2OC0uNTRjLjEyNS0uODI4LjMtMi44OTItLjgtNC4xNzFBMy44MTMsMy44MTMsMCwwLDAsMTIsNS4zMDksMy44MSwzLjgxLDAsMCwwLDguOTYyLDYuNDQ4Yy0xLjEsMS4yNzgtLjkyNiwzLjM0Mi0uOCw0LjE3YS40NjkuNDY5LDAsMCwxLS40NjguNTQuNDA3LjQwNywwLDAsMS0uMDQ3LDAsNi45MjUsNi45MjUsMCwwLDAsLjI0NSwxLjgyQS40NzEuNDcxLDAsMCwxLDguMTg1LDEyLjg3MlpNMTYuMSwxMy45NzdBNi43NSw2Ljc1LDAsMCwxLDE1LjA4NiwxNS45djEuMTM3YTE1LjgsMTUuOCwwLDAsMSw1LjE4LDIuMywxMS4wNTgsMTEuMDU4LDAsMSwwLTE2LjUzMywwLDE1Ljk4NiwxNS45ODYsMCwwLDEsNS4xODEtMi4zVjE1LjlBNi43Nyw2Ljc3LDAsMCwxLDcuOSwxMy45NzdsLS4wNjQsMGEuOC44LDAsMCwxLS42NTMtLjM1Miw1LjI0NSw1LjI0NSwwLDAsMS0uMzM4LTMuMTg3LjYxNi42MTYsMCwwLDEsLjMyMS0uMjQ4QTUuODg4LDUuODg4LDAsMCwxLDguMjQ5LDUuODM0LDQuNyw0LjcsMCwwLDEsMTIsNC4zNjlhNC43LDQuNywwLDAsMSwzLjc1MSwxLjQ2NCw1Ljg4OSw1Ljg4OSwwLDAsMSwxLjA4Niw0LjM2LjYyMy42MjMsMCwwLDEsLjMyMi4yNDgsNS4yNTIsNS4yNTIsMCwwLDEtLjMzOCwzLjE4Ni44LjgsMCwwLDEtLjY1NC4zNTNsLS4wNjQsMFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K'"
            />{{ collection.username }}
          </li>
          <li>
            <img src="@/assets/calendar.svg" class="icon" alt="created on" />{{
              collection.created
            }}
          </li>
          <li>
            <img
              src="@/assets/noun_puzzle.svg"
              alt="number of puzzles"
              class="icon"
            />
            {{ puzzles.length }}
          </li>
          <div v-if="editRights">
            <li>
              <b-button
                type="submit"
                variant="primary"
                class="submit-button"
                :href="`/collections/${nid}/edit`"
              >
                {{ 'Edit' }}
              </b-button>
            </li>
          </div>
        </ul>
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import CollectionCard from '@/components/Cards/QuestCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import {
    PuzzleItem,
    ClearedPuzzle,
    CollectionItem,
    CollectionResponse,
    CommentItem,
  } from '@/types/common-types';
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

    nid: string | undefined;

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=collection&nid=${this.$route.params.id}`)
      ).data.data as CollectionResponse;
      this.collection = res.collection;
      this.comments = res.comments;
      this.nid = res.collection.nid;
      this.puzzles = res.puzzles;
      if (this.collection.username === this.$vxm.user.username) {
        this.editRights = true;
      }
      this.cleared = (
        await this.$http.get(`/get/?type=puzzle&nid=${this.puzzles[0].nid}`)
      ).data.data?.cleared ?? [];
    }

    puzzleCleared(id: string) {
      return this.cleared.map((puzzle) => puzzle.id).includes(id);
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

.puzzle-image {
  width: 100%;
  //background-color: #041227;
  border-radius: 5px;
  padding: 1.6rem 2.2rem;
  img {
    width: 100%;
    max-height: 400px;
  }
}
.description-col {
  width: calc(60% - 15px);
}

.image-col {
  width: 40%;
}

@include media-breakpoint-down(xs) {
  .description-col,
  .image-col {
    width: 100%;
  }
}

.quest-image {
  margin: 15px;
}

.group-description {
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

#modal-members ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 10px;
  }
}
</style>
