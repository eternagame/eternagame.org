<template>
  <EternaPage :title="$t('nav-bar:create-collection')">
    <div class="page-content">
      <div class="d-flex">
        <div>
          <h2>{{ $t('create-collection:collection-info:header') }}</h2>

          <h3>{{ $t('create-collection:collection-info:title') }}</h3>
          <input :placeholder="$t('create-collection:collection-info:title-description')" v-model="title" />

          <h3>{{ $t('create-collection:collection-info:description') }}</h3>
          <input
            :placeholder="$t('create-collection:collection-info:description-description')"
            :style="{ paddingBottom: '120px' }"
            v-model="body"
          />

          <h3>
            {{ $t('create-collection:collection-info:image') }}
            <span style="font-weight:normal">{{
              $t('create-collection:collection-info:image-optional')
            }}</span>
          </h3>
            <img :src="picture" class="collection-image"/>
          <div class="input-group">
            <input type="file" @change="handleFile" hidden ref="fileUpload" />
            <button type="button" class="btn secondary" @click="fileUpload.click()">
              {{ $t('create-collection:collection-info:image-button-text') }}
            </button>
          </div>
          <p>
            {{ $t('create-collection:collection-info:image-tip') }}
          </p>

          <button type="button" class="btn btn-primary save" @click="submit()">
            {{ $t('create-collection:collection-info:main-action') }}
          </button>
        </div>

        <div>
          <h2>
            {{ $t('create-collection:puzzle-info:header') }}
          </h2>

          <h3>{{ $t('create-collection:puzzle-info:add-puzzle') }}</h3>
           <vue-bootstrap-typeahead
            ref="typeahead"
            :placeholder="$t('create-collection:puzzle-info:add-puzzle-description')"
            v-model="targetName"
            :data="puzzlenames"
            :serializer="puzzle => puzzle.title"
          >
            <template slot="suggestion" slot-scope="{ htmlText }">
              <div class="d-flex align-items-center">
                <span v-dompurify-html="htmlText" style="color: white"></span>
              </div>
            </template>
          </vue-bootstrap-typeahead>
            <div class="input-group">
              <button type="button" class="btn secondary" @click="addPuzzle">
                {{ $t('create-collection:puzzle-info:secondary-action') }}
              </button>
            </div>
            <h3>
              {{ $t('create-collection:puzzle-info:puzzle-list') }}
            <span style="font-weight:normal">
              {{ $t('create-collection:puzzle-info:puzzle-list-tip') }}
            </span>
          </h3>
          <draggable v-model="puzzlelist" group="people" @start="drag=true" @end="drag=false">
            <transition-group>
              <div v-for="element in puzzlelist" :key="element.id">
                <img :src="getImage(element.id)" style="width: 5%; margin: auto;" class="scalable" /> 
                <b>{{element.title}}</b> by {{element.username}}
                <button @click="removePuzzle(element)"/>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  // @ts-ignore
  import debounce from 'lodash.debounce';
  import { Component, Vue, Mixins, Watch, Ref, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import draggable from 'vuedraggable';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from "@/utils/utils";
  import { PuzzleItem } from '@/types/common-types';
  import LabViewData, { LabData } from './types';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      VueBootstrapTypeahead,
      draggable,
    },
  })
  export default class CreateCollection extends Vue 
  {
    private title = '';

    private body = '';

    private newBody: string | null = null;

    private targetName = '';

    private puzzlenames = [];

    private puzzlelist: PuzzleItem[] = [];

    private currentPicture?: string;

    private newPicture: File | null = null;

    fetchData: () => Promise<void> | undefined = async () => {};

    async dofetchData() {
      const res = await axios.get(
        `/get/?type=puzzles&puzzle_type=All&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.puzzlenames = res.data.data.puzzles;
    }

    created() {
      this.fetchData = debounce(this.dofetchData, 200);
    }

    @Watch('targetName', { immediate: true, deep: true })
    getPuzzleNames() {
      this.fetchData();
    }

    @Ref('typeahead') readonly typeahead!: { inputValue: string };

    mounted() {
      if (this.$route.query.message) {
        this.typeahead.inputValue = String(this.$route.query.message);
        this.targetName = String(this.$route.query.message);
      }
    }

    addPuzzle() {
      console.log(this.puzzlenames);
      this.getPuzzleNames();
      console.log(this.puzzlenames);
      if (this.puzzlenames.length === 1 ){
        this.puzzlelist.push(this.puzzlenames[0]);
      }
    }

    removePuzzle(puzzle: PuzzleItem) {
      this.puzzlelist.splice(this.puzzlelist.indexOf(puzzle), 1);
    }

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getCollectionAvatar(this.currentPicture || null);
    }

    @Ref("fileUpload") private fileUpload!: HTMLInputElement;

    @Prop({required: true}) private loading!: boolean;

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.newPicture = file;
    }

    getImage(nid: string) {
      const image = Utils.getPuzzleMiddleThumbnail(nid);
      return image;
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('collection-title-input', this.title);
      data.set('collection-description-input', this.newBody === null ? this.body : this.newBody);
      const puzzleids: String[] = [];
      this.puzzlelist.forEach(e => puzzleids.push(e.id));
      data.set('collection-puzzles', puzzleids.toString());
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'create_collection');

      try {
        const res = await this.$http.post("/post/", data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/collections/`);
      } catch (e: any) {
        const r = this.$notify({
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
    width: 370px;
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
</style>
