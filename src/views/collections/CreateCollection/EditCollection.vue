<template>
  <EternaPage :title="$t('nav-bar:create-collection')">
    <div class="page-content">
      <div class="flex">
        <div class="row">
          <div class="col-md-6">
            <CollectionInfo
              :title="title"
              :body="desc"
              :picture="picture"
              @update:title="(text) => (title = text)"
              @update:body="(text) => (desc = text)"
              @update:image="(file) => (newPicture = file)"
            />
          </div>
          <div class="col-md-6">
            <CollectionPuzzles
              :puzzlelist="puzzlelist"
              @update:puzzle="(puzzles) => (puzzlelist = puzzles)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-button type="submit" variant="primary" @click="submit()">
              {{ $t('create-collection:collection-info:main-action') }}
            </b-button>
            <b-button
              type="submit"
              style="margin-left: 10px"
              variant="danger"
              @click="deleteCollection"
            >
              {{ 'Delete' }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
// @ts-ignore
  import debounce from 'lodash.debounce';
  import {
    Component,
    Vue,
    Mixins,
    Watch,
    Ref,
    Prop,
  } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import { CollectionItem, PuzzleItem } from '@/types/common-types';
  import CollectionInfo from './components/CollectionInfo.vue';
  import CollectionPuzzles from './components/CollectionPuzzles.vue';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      CollectionInfo,
      CollectionPuzzles,
    },
  })
  export default class EditCollection extends Vue {
    @Prop({ required: true }) private loading!: boolean;

    private title = '';

    private desc = '';

    private puzzlenames: PuzzleItem[] = [];

    private puzzlelist: PuzzleItem[] = [];

    private picture: string = '';

    private newPicture: File | null = null;

    private data: boolean = false;

    fetchData: () => Promise<void> | undefined = async () => {};

    mounted() {
      this.fetch();
    }

    async fetch() {
      const collection = (
        await this.$http.get(`/get/?type=collection&nid=${this.$route.params.id}`)
      ).data.data.collection as CollectionItem;
      if (collection.puzzles != null) {
        const puzzlelist = collection.puzzles.split(',');
        Object.values(puzzlelist).forEach(async (puzz) =>
          this.puzzlelist.push(
            (await (
              await this.$http.get(`/get/?type=puzzle&nid=${parseInt(puzz, 10)}`)
            ).data.data.puzzle) as PuzzleItem,
          ),
        );
      }
      this.title = collection.title;
      this.desc = collection.desc;
      this.picture = collection.image;
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('collection-title-input', this.title);
      data.set('nid', this.$route.params.id);
      data.set(
        'collection-description-input',
        this.desc
      );
      const puzzleids: String[] = [];
      this.puzzlelist.forEach((e) => puzzleids.push(e.id));
      data.set('collection-puzzles', puzzleids.toString());
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'edit_collection');

      try {
        const res = await this.$http.post('/post/', data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/collections/${this.$route.params.id}`);
      } catch (e: any) {
        const r = this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
    }

    async deleteCollection() {
      this.$http
        .post(
          '/post/',
          new URLSearchParams({
            type: 'delete_collection',
            nid: this.$route.params.id,
          }),
        )
        .then((res) => {
          this.$router.push({ path: `/collections` });
        });
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 7.8px;
  margin-top: 13.8px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 24px;
}

input {
  background-color: rgba(16, 16, 16, 0.5);
  color: white;
  border: solid 0.6px $dark-blue;
  padding: 13px;
  width: 100%;
  height: 40px;
  vertical-align: top;
}

.secondary {
  background-color: $med-blue;
  width: 124px;
  border-radius: 5px;
  color: white;
  margin-top: 9px;
}

.save {
  width: 185px;
  height: 40px;
  border-radius: 5px;
  margin: 50px 0px;
  font-size: 20px;
  font-weight: bold;
}

.collection-image {
  object-fit: contain;
  margin-right: 20px;
  width: 100px;
  height: 100px;
}

.card {
  background-color: #0a223c;
  margin-top: 10px;
}
</style>