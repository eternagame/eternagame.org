<template>
  <SmartLink :link="toCollection">
    <AspectRatioCard
      :aspectRatio="aspectRatio"
      :id="`popover-target-${nid}`"
      class="card"
    >
      <template #header>
        <div class="collection-card-title">
          {{ title }}
        </div>
      </template>
      <img
        v-if="quest == '0'"
        :src="getImage"
        alt=""
        style="width: 80%; margin: auto"
        class="scalable"
      />
      <img
        v-else
        :src="image"
        alt=""
        style="width: 80%; margin: auto"
        class="scalable"
      />
      <template #footer>
        <div
          style="width: 100%"
          class="d-flex justify-content-between"
          v-if="$slots.buttons"
        >
          <slot name="buttons" />
        </div>
        <b-row class="mb-2" style="margin-top: 10px">
          <b-col cols="6">
            <div class="left-col">
              <div v-b-tooltip.hover title="Author">
                <slot name="left-icon">
                  <img
                    :src="userpicture"
                    alt=""
                    class="icon"
                    id="avatarimage"
                    onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMy45OTkiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQiPg0KICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMiwyNEExMiwxMiwwLDEsMSwyNCwxMiwxMi4wMTMsMTIuMDEzLDAsMCwxLDEyLDI0Wk04LjE4NSwxMi44NzJhLjQ5LjQ5LDAsMCwxLC4xMzQuMDIuNDczLjQ3MywwLDAsMSwuMzE5LjMxOCw2LjEsNi4xLDAsMCwwLDEuMTA4LDIuMjE5LjQ3Mi40NzIsMCwwLDEsLjExMS4zdjEuMzM3YS45NjMuOTYzLDAsMCwxLS40OTEuODEyLjQ3Ny40NzcsMCwwLDEtLjExOC4wNDMsMTUuNTU0LDE1LjU1NCwwLDAsMC00Ljg0MiwyLjEsMTEuMDMsMTEuMDMsMCwwLDAsMTUuMTkxLDAsMTUuNCwxNS40LDAsMCwwLTQuODQxLTIuMS40NDMuNDQzLDAsMCwxLS4xMTctLjA0Mi45NTEuOTUxLDAsMCwxLS40OTItLjgxM1YxNS43MzJhLjQ2OS40NjksMCwwLDEsLjExMS0uMyw2LjEsNi4xLDAsMCwwLDEuMTA3LTIuMjE5LjQ2Ni40NjYsMCwwLDEsLjMxOS0uMzE5LjQ3OS40NzksMCwwLDEsLjEzNC0uMDIuNDY5LjQ2OSwwLDAsMSwuMjkyLjEsNi45NTgsNi45NTgsMCwwLDAsLjI0Ni0xLjgybC0uMDEzLDBoLS4wMzRhLjQ2OS40NjksMCwwLDEtLjQ2OC0uNTRjLjEyNS0uODI4LjMtMi44OTItLjgtNC4xNzFBMy44MTMsMy44MTMsMCwwLDAsMTIsNS4zMDksMy44MSwzLjgxLDAsMCwwLDguOTYyLDYuNDQ4Yy0xLjEsMS4yNzgtLjkyNiwzLjM0Mi0uOCw0LjE3YS40NjkuNDY5LDAsMCwxLS40NjguNTQuNDA3LjQwNywwLDAsMS0uMDQ3LDAsNi45MjUsNi45MjUsMCwwLDAsLjI0NSwxLjgyQS40NzEuNDcxLDAsMCwxLDguMTg1LDEyLjg3MlpNMTYuMSwxMy45NzdBNi43NSw2Ljc1LDAsMCwxLDE1LjA4NiwxNS45djEuMTM3YTE1LjgsMTUuOCwwLDAsMSw1LjE4LDIuMywxMS4wNTgsMTEuMDU4LDAsMSwwLTE2LjUzMywwLDE1Ljk4NiwxNS45ODYsMCwwLDEsNS4xODEtMi4zVjE1LjlBNi43Nyw2Ljc3LDAsMCwxLDcuOSwxMy45NzdsLS4wNjQsMGEuOC44LDAsMCwxLS42NTMtLjM1Miw1LjI0NSw1LjI0NSwwLDAsMS0uMzM4LTMuMTg3LjYxNi42MTYsMCwwLDEsLjMyMS0uMjQ4QTUuODg4LDUuODg4LDAsMCwxLDguMjQ5LDUuODM0LDQuNyw0LjcsMCwwLDEsMTIsNC4zNjlhNC43LDQuNywwLDAsMSwzLjc1MSwxLjQ2NCw1Ljg4OSw1Ljg4OSwwLDAsMSwxLjA4Niw0LjM2LjYyMy42MjMsMCwwLDEsLjMyMi4yNDgsNS4yNTIsNS4yNTIsMCwwLDEtLjMzOCwzLjE4Ni44LjgsMCwwLDEtLjY1NC4zNTNsLS4wNjQsMFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K'"
                  >
                </slot>
                {{ username }}
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="right-col">
              <div v-b-tooltip.hover title="Number of puzzles">
                <slot name="right-icon">
                  <img
                    src="@/assets/noun_puzzle.svg"
                    alt="number of puzzles"
                    class="icon"
                  />
                </slot>
                {{ getPuzzles.length }}
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2" style="margin-top: 10px">
          <b-col>
            <div style="text-align: center; margin-bottom: 0px">
              <img src="@/assets/noun_lock.svg" alt="locked" v-if="locked" />
              <div v-else>
                <p v-if="progress == 1">
                  <SmartLink :link="toGame">
                    <img src="@/assets/noun_check.svg" alt="completed" />
                    <b style="text-transform: uppercase">{{
                      $t('collection:completed')
                    }}</b>
                  </SmartLink>
                </p>
                <div v-else>
                  <b-button
                    variant="primary"
                    style="margin: 10px 0"
                    :[nav]="toGame"
                  >
                    {{ $t('quest-card:play') }}
                  </b-button>
                  <SmartLink v-if="started" :link="toGame">
                    <b-progress :value="progress" max="1"></b-progress>
                  </SmartLink>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </AspectRatioCard>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Mixins, Prop, Ref, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import Utils from '@/utils/utils';
  import {
    ClearedPuzzle,
    CollectionResponse,
    PuzzleItem,
  } from '@/types/common-types';

  @Component({
    components: {
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class CollectionCard extends Vue {
    @Prop({ required: true }) readonly image!: string;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly desc!: string;

    @Prop({ required: false }) readonly level!: string;

    @Prop({ required: true }) readonly nid!: string;

    @Prop({ required: true }) readonly userpicture!: string;

    @Prop({ required: true }) readonly username!: string;

    @Prop({ required: true }) readonly puzzles!: string;

    @Prop({ required: true }) readonly quest!: string;

    @Prop({ required: true }) readonly cleared!: PuzzleItem[];

    @Prop({ required: true }) readonly progress!: number;

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop() readonly collectionLink?: string;

    @Prop() readonly puzzleLink?: string;

    @Prop({ required: false }) readonly current_level!: string;

    @Prop() readonly current_puzzle?: string;

    get nav() {
      return Utils.isLinkInternal(this.toGame) ? 'to' : 'href';
    }

    get toGame() {
      return (
        this.puzzleLink ||
        (this.current_puzzle &&
          `${PUZZLE_ROUTE_PREFIX}${this.current_puzzle}/`) ||
        this.toCollection
      );
    }

    get toCollection() {
      return this.collectionLink || (this.title && `/collections/${this.nid}`);
    }

    get locked() {
      return Number(this.level) - 1 > Number(this.current_level);
    }

    get started() {
      return this.to_next > 0 && !this.locked;
    }

    get to_next() {
      const puzzleList = this.getPuzzles;
      const cleared = this.cleared.filter((x) =>
        puzzleList.includes(x.nid),
      );
      return cleared.length / puzzleList.length;
    }

    get getPuzzles() {
      return this.puzzles.replaceAll(" ", "").split(',');
    }

    get getImage() {
      return Utils.getPuzzleMiddleThumbnail(this.getPuzzles[0]);
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.btn {
  display: inline-block;
  width: 48%;
  margin-bottom: 0px;
}

:deep(.card-body) {
  padding: 11.25px !important;
}

.collection-card-title {
  height: 50px;
  text-align: center;
}

.icon {
  width: 19px;
  margin-right: 5px;
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

.middle-num {
  position: absolute;
  top: Calc(50%);
  left: 50%;
  transform: translate(-50%, -50%);
  color: #21508c;
  font-size: 8px;
  font-weight: 900;
}

.right-col {
  justify-content: flex-end;
}

.inner {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
  z-index: 1;
}

.card {
  transition: 0.3s ease;
  color: $white;
}

.card:hover {
  border: 1px solid gold;
}

.card:active {
  background-color: #01010188;
}
</style>
