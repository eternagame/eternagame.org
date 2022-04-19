<template>
  <EternaPage :title="$t('nav-bar:create-collection')">
    <div class="page-content">
      <div class="flex">
        <div class="row">
          <div class="col-md-6">
            <CollectionInfo
              :title="title"
              :body="desc"
              @update:title="(text) => (title = text)"
              @update:body="(text) => (newBody = text)"
            />
          </div>
          <div class="col-md-6">
            <CollectionPuzzles :puzzlelist="puzzlelist" :puzzlenames="puzzlenames" />
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
    private title = '';

    private desc = '';

    private newBody: string | null = null;

    private targetName = '';

    private puzzlenames: PuzzleItem[] = [];

    private puzzlelist: PuzzleItem[] = [];

    private picture: string = '';

    private newPicture: File | null = null;

    private idInput: String = '';

    fetchData: () => Promise<void> | undefined = async () => {};

    async dofetchData() {
      const res = await axios.get(
        `/get/?type=puzzles&puzzle_type=All&size=10${
          this.targetName ? `&search=${this.targetName}` : ''
        }`,
      );
      this.puzzlenames = res.data.data.puzzles as PuzzleItem[];
    }

    created() {
      this.fetchData = debounce(this.dofetchData, 200);
    }

    @Watch('targetName', { immediate: true, deep: true })
    getPuzzleNames() {
      this.fetchData();
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

    @Ref('typeahead') readonly typeahead!: { inputValue: string };

    mounted() {
      this.fetch();
      if (this.$route.query.message) {
        this.typeahead.inputValue = String(this.$route.query.message);
        this.targetName = String(this.$route.query.message);
      }
    }

    async addPuzzle(nid: String) {
      this.puzzlelist.push(
        (await (
          await axios.get(`/get/?type=puzzle&nid=${nid}`)
        ).data.data.puzzle) as PuzzleItem,
      );
    }

    removePuzzle(puzzle: PuzzleItem) {
      this.puzzlelist.splice(this.puzzlelist.indexOf(puzzle), 1);
    }

    @Ref('fileUpload') private fileUpload!: HTMLInputElement;

    @Prop() private loading!: boolean;

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.newPicture = file;
      this.picture = URL.createObjectURL(this.newPicture);
    }

    getImage(nid: string) {
      const image = Utils.getPuzzleMiddleThumbnail(nid);
      return image;
    }

    viewPuzzle(nid: string) {
      const route = this.$router.resolve({ path: `/puzzles/${nid}` });
      window.open(route.href);
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('collection-title-input', this.title);
      data.set('nid', this.$route.params.id);
      data.set(
        'collection-description-input',
        this.newBody === null ? this.desc : this.newBody,
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
