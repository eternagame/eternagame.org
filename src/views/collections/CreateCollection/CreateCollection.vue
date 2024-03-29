<template>
  <EternaPage :title="$t('nav-bar:create-collection')">
    <div class="page-content">
      <div class="flex">
        <div class="row">
          <div class="col-md-6">
            <CollectionInfo
              :title="title"
              :body="body"
              :picture="picture"
              @update:title="(text) => (title = text)"
              @update:body="(text) => (body = text)"
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
              {{ $t('create-collection:collection-info:main-action') }}
            </b-button>
            <b-button
                type="submit"
                variant="secondary"
                style="margin-left: 10px"
                :to="`/collections`"
              >
                {{ 'Cancel' }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
// @ts-ignore
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import { PuzzleItem } from '@/types/common-types';
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
  export default class CreateCollection extends Vue {
    title = '';

    body = '';

    puzzlelist: PuzzleItem[] = [];

    private currentPicture?: string;

    newPicture: File | null = null;

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getCollectionAvatar(this.currentPicture || null);
    }

    private loading!: boolean;

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('collection-title', this.title);
      data.set('collection-description', this.body);
      const puzzleids: String[] = this.puzzlelist.map((e) => e.id);
      data.set('collection-puzzles', puzzleids.toString());
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'create_collection');

      try {
        const res = await this.$http.post('/post/', data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/collections/${res.data.data.nid}`);
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
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
