<template>
  <div>
    <h2>
      {{ $t('create-collection:puzzle-info:header') }}
    </h2>

    <h3>{{ $t('create-collection:puzzle-info:add-puzzle') }}</h3>
    <input placeholder="Enter ID" v-model="idInput" />
    <button type="button" class="btn secondary" @click="addPuzzle(idInput)">
      Add By ID
    </button>
    <vue-bootstrap-typeahead
      ref="typeahead"
      :placeholder="$t('create-collection:puzzle-info:add-puzzle-description')"
      v-model="targetName"
      :data="puzzlenames"
      :serializer="(puzzle) => puzzle.title"
    >
      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <div class="d-flex align-items-center" :key="renderKey">
          <div class="d-flex justify-content-between w-100" style="flex-wrap: nowrap">
            <div class="left-col">
              <img
                class="rounded-circle"
                :src="getImage(data.id)"
                style="width: 40px; height: 40px; margin-right: 10px"
              />
              <span v-dompurify-html="htmlText" style="color: white; margin-right: 3px;"></span>
              by {{ data.username }}
            </div>
            <div class="right-col">
              <!--
                Why add the vbst-item class? So the blur handler for the typeahead text input
                doesn't close the list before we fire our event handler. For some reason, this is only
                an issue on Chrome but not Firefox
              -->
              <button
                type="button"
                class="vbst-item btn secondary"
                @click="addPuzzle(data.id)"
              >
                {{ $t('create-collection:puzzle-info:secondary-action') }}
              </button>
              <button
                type="button"
                class="vbst-item btn secondary ml-2"
                @click="viewPuzzle(data.id)"
              >
                View Puzzle
              </button>
            </div>
          </div>
        </div>
      </template>
    </vue-bootstrap-typeahead>
    <div class="input-group"></div>
    <h3>
      {{ $t('create-collection:puzzle-info:puzzle-list') }}
      <span style="font-weight: normal">
        {{ $t('create-collection:puzzle-info:puzzle-list-tip') }}
      </span>
    </h3>
    <draggable
      v-model="puzzlelist"
      group="people"
      @input="$emit('update:puzzles', puzzlelist)"
    >
      <transition-group>
        <div v-for="element in puzzlelist" :key="element.id">
          <div class="card flex">
            <div class="row m-2 justify-content-between">
              <div class="align-self-center p-0">
                <img
                  class="rounded-circle"
                  :src="getImage(element.id)"
                  style="width: 40px; max-height: 36px; margin: 0 15px 0 5px;"
                />
                <b>{{ element.title }}</b> by {{ element.username }}
              </div>
              <div class="align-self-center p-0">
                <button
                  type="button"
                  class="btn secondary"
                  @click="removePuzzle(element)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Ref,
    Watch,
  } from 'vue-property-decorator';
  import draggable from 'vuedraggable';
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import { PuzzleItem } from '@/types/common-types';
  import axios from 'axios';
  import { debounce } from 'lodash';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      VueBootstrapTypeahead,
      draggable,
    },
  })
  export default class CollectionPuzzles extends Vue {
    @Prop({required: true}) puzzlelist!: PuzzleItem[];

    private puzzlenames: PuzzleItem[] = [];

    private targetName = '';

    private idInput: String = '';

    private renderKey: number = 0;

    fetchData: () => Promise<void> | undefined = async () => {};

    async dofetchData() {
      const res = await axios.get(
        `/get/?type=puzzles&puzzle_type=AllChallengesPuzzle&size=10${
          this.targetName ? `&search=${this.targetName}` : ''
        }`,
      );
      this.puzzlenames = res.data.data.puzzles as PuzzleItem[];
    }

    created() {
      this.fetchData = debounce(this.dofetchData, 200);
    }

    @Ref('typeahead') readonly typeahead!: Vue & { inputValue: string };

    mounted() {
      if (this.$route.query.message) {
        this.typeahead.inputValue = String(this.$route.query.message);
        this.targetName = String(this.$route.query.message);
      }
    }

    @Watch('targetName', { immediate: true, deep: true })
    getPuzzleNames() {
      this.fetchData();
    }

    async addPuzzle(nid: String) {
      console.log('adding', nid);
      const puzzle = (await axios.get(`/get/?type=puzzle&nid=${nid}`)).data.data.puzzle as PuzzleItem;
      this.$emit('update:puzzles', [
        ...this.puzzlelist,
        puzzle,
      ]);
    }

    removePuzzle(puzzle: PuzzleItem) {
      this.$emit('update:puzzles', this.puzzlelist.filter(puz => puz !== puzzle));
    }

    @Ref('fileUpload') private fileUpload!: HTMLInputElement;

    viewPuzzle(nid: string) {
      const route = this.$router.resolve({ path: `/puzzles/${nid}` });
      window.open(route.href, '_blank');
    }

    getImage(nid: string) {
      const image = Utils.getPuzzleMiddleThumbnail(nid);
      return image;
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

::v-deep .vbst-item.active {
  background-color: rgb(33, 80, 140);
}

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

.left-col,
.right-col {
  font-size: 11px;
  display: flex;
  align-items: center;
  font-weight: bold;

  & > .icon {
    width: 12.57px;
  }
}

.left-col {
  flex-wrap: wrap;
}

.right-col {
  justify-content: flex-end;
  margin-left: 5px;
}
</style>
