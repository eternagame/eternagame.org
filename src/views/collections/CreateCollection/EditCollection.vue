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
              @update:puzzles="(puzzles) => (puzzlelist = puzzles)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-button type="submit" variant="primary" @click="submit()">
              {{ $t('update-collection:collection-info:main-action') }}
            </b-button>
            <b-button
                type="submit"
                variant="secondary"
                style="margin-left: 10px"
                :to="`/collections/${this.$route.params.id}`"
              >
                {{ 'Cancel' }}
            </b-button>
            <b-modal id="delete" title="Delete Collection?" hide-footer>
              <div class="d-block text-center">
                Warning: This will permanently delete the collection!
                <br/>
                <br/>
                Enter the title of the collection to continue:
              </div>
              <input v-model="deleteTitle"/>
              <b-button
                class="mt-3"
                type="submit"
                style="margin-left: 10px"
                variant="danger"
                :disabled="deleteTitle != title"
                @click="deleteCollection()"
              >
                {{ 'Delete' }}
              </b-button>
              <b-button
                class="mt-3"
                type="submit"
                style="margin-left: 10px"
                variant="secondary"
                @click="$bvModal.hide('delete')"
              >
                {{ 'Cancel' }}
              </b-button>
            </b-modal>
            <b-button
              type="submit"
              style="margin-left: 10px"
              variant="danger"
              v-b-modal.delete
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
  import {
    Component,
    Mixins,
    Prop,
  } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import { CollectionItem, PuzzleItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
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
  export default class EditCollection extends Mixins(FetchMixin) {
    @Prop({ required: true }) private loading!: boolean;

    title = '';

    deleteTitle = '';

    desc = '';

    puzzlelist: PuzzleItem[] = [];

    picture: string = '';

    newPicture: File | null = null;

    fetchData: () => Promise<void> | undefined = async () => {};

    async fetch() {
      const collection = (
        await this.$http.get(`/get/?type=collection&nid=${this.$route.params.id}`)
      ).data.data.collection as CollectionItem;
      if (collection.puzzles != null) {
        const puzzlelist = collection.puzzles.split(',');
        const res = await Promise.all(
          Object.values(puzzlelist).map((puzz) =>
            this.$http.get(`/get/?type=puzzle&nid=${puzz}`),
          ),
        );
        this.puzzlelist = res.map((puzz) => puzz.data.data.puzzle as PuzzleItem);
      }
      this.title = collection.title;
      this.desc = collection.desc;
      this.picture = collection.image;
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('collection-title', this.title);
      data.set('nid', this.$route.params.id);
      data.set('collection-description', this.desc);
      const puzzleids: String[] = this.puzzlelist.map((e) => e.id);
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
        this.$notify({
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
        .then(() => {
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
