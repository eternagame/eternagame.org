<template>
  <EternaPage :title="$t('nav-bar:create-quest')">
    <div class="page-content">
      <div class="d-flex">
        <div>
          <h2>{{ $t('create-quest:quest-info:header') }}</h2>

          <h3>{{ $t('create-quest:quest-info:title') }}</h3>
          <input :placeholder="$t('create-quest:quest-info:title-description')" v-model="title" />

          <h3>{{ $t('create-quest:quest-info:description') }}</h3>
          <input
            :placeholder="$t('create-quest:quest-info:description-description')"
            :style="{ paddingBottom: '120px' }"
            v-model="body"
          />

          <h3>
            {{ $t('create-quest:quest-info:image') }}
            <span style="font-weight:normal">{{
              $t('create-quest:quest-info:image-optional')
            }}</span>
          </h3>
          <div class="input-group">
            <input type="file" @change="handleFile" hidden ref="fileUpload" />
            <button type="button" class="btn secondary" @click="fileUpload.click()">
              {{ $t('create-quest:quest-info:image-button-text') }}
            </button>
          </div>
          <p>
            {{ $t('create-quest:quest-info:image-tip') }}
          </p>

          <button type="button" class="btn btn-primary save" @click="submit()">
            {{ $t('create-quest:quest-info:main-action') }}
          </button>
        </div>

        <div>
          <h2>
            {{ $t('create-quest:puzzle-info:header') }}
          </h2>

          <h3>{{ $t('create-quest:puzzle-info:add-puzzle') }}</h3>
           <vue-bootstrap-typeahead
            ref="typeahead"
            :placeholder="$t('create-quest:puzzle-info:add-puzzle-description')"
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
                {{ $t('create-quest:puzzle-info:secondary-action') }}
              </button>
            </div>
            <h3>
              {{ $t('create-quest:puzzle-info:puzzle-list') }}
            <span style="font-weight:normal">
              {{ $t('create-quest:puzzle-info:puzzle-list-tip') }}
            </span>
          </h3>
          <draggable v-model="puzzlelist" group="people" @start="drag=true" @end="drag=false">
            <transition-group>
              <div v-for="element in puzzlelist" :key="element.id">{{element.title}} by {{element.username}} </div>
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
  import LabViewData, { LabData } from './types';
  import Utils from "@/utils/utils";

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      VueBootstrapTypeahead,
      draggable,
    },
  })
  export default class CreateQuest extends Vue 
  {
    private nid = '';

    private title = '';

    private body = '';

    private newBody: string | null = null;

    private targetName = '';

    private puzzlenames = [];

    private puzzlelist = [];

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
      this.getPuzzleNames();
      if (this.puzzlenames.length === 1){
        this.puzzlelist.push(this.puzzlenames[0]);
      }
    }

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getGroupAvatar(this.currentPicture || null);
    }

    @Ref("fileUpload") private fileUpload!: HTMLInputElement;

    @Prop({required: true}) private loading!: boolean;

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.$emit('update:picture', file);
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('nid', this.nid);
      data.set('quest-title-input', this.title);
      data.set('quest-description-input', this.newBody === null ? this.body : this.newBody);
      data.set('quest-puzzles', this.puzzlelist[0].id);
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'create_quest');

      try {
        const res = await this.$http.post("/post/", data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/quests/`);
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
</style>
