<template>
  <SmartLink :link="backgroundLink ? `/puzzles/${nid}` : ''">
    <AspectRatioCard :aspectRatio="aspectRatio" :id="`popover-target-${nid}`" class="card">
      <template #header>
        <div class="puzzle-card-title" v-if="title">
          <img src="@/assets/noun_check.svg" alt="cleared" v-if="cleared" style="float:right" />

          <SmartLink :link="`/puzzles/${nid}`"><img src="@/assets/info.svg" alt="info" v-if="!backgroundLink" style="float:right" /></SmartLink>

          <b>{{ title }}</b>
        </div>
      </template>
      <img :src="imageURL" style="width: 80%; margin: auto;" class="scalable" alt="" />
      <img src="@/assets/noun_lock.svg" alt="" v-if="locked" class="inner" />
      <template #footer>
        <!-- Puzzle gameplay info -->
        <div class="meta-row meta-gameplay" v-if="folder || stateCount > 1 || is3d">
          <div v-if="folder" v-b-tooltip.hover title="Folding engine">
            <img src="@/assets/chemical_bond.svg" alt="Folding engine" />
            {{ folder }}
          </div>
          <div v-if="stateCount > 1 || is3d">
            <StateCounter v-if="stateCount > 1" :value="stateCount" v-b-tooltip.hover :title="`${stateCount} state switch`"/>
            <div v-if="is3d" class="icon-3d" v-b-tooltip.hover title="3D puzzle">3D</div>
          </div>
        </div>

        <!-- Lab puzzle metadata -->
        <b-row class="meta-row" v-if="numSynths || numSlots || numSubmitted !== undefined || mySolutions !== undefined || maxSubmissions">
          <div v-if="numSynths" v-b-tooltip.hover title="Number synthesized">
            <img src="@/assets/test-tube.svg" alt="Number synthesized"/>
            {{ numSynths }}
          </div>
          <div v-else-if="numSlots" v-b-tooltip.hover title="Number to be synthesized">
            <img src="@/assets/test-tube.svg" alt="Number to be synthesized"/>
            {{ numSlots }}
          </div>

          <div v-if="numSubmitted !== undefined" v-b-tooltip.hover title="Total solutions submitted">
            <img src="@/assets/noun_globe.svg" alt="Total solutions submitted" />
            {{ numSubmitted }}
          </div>
          <div v-if="mySolutions !== undefined || maxSubmissions" v-b-tooltip.hover title="My solutions submitted">
            <img src="@/assets/noun_max.svg" alt="My solutions submitted">
            {{mySolutions || 0}}<template v-if="maxSubmissions">/{{maxSubmissions}}</template>
          </div>
        </b-row>

        <!-- Challenge puzzle metadata -->
        <b-row class="meta-row" v-if="reward || (username && madeByPlayer) || numCleared !== undefined">
          <div v-if="username && madeByPlayer" v-b-tooltip.hover title="Author">
            <img :src="avatar" alt="Author" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMy45OTkiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQiPg0KICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMiwyNEExMiwxMiwwLDEsMSwyNCwxMiwxMi4wMTMsMTIuMDEzLDAsMCwxLDEyLDI0Wk04LjE4NSwxMi44NzJhLjQ5LjQ5LDAsMCwxLC4xMzQuMDIuNDczLjQ3MywwLDAsMSwuMzE5LjMxOCw2LjEsNi4xLDAsMCwwLDEuMTA4LDIuMjE5LjQ3Mi40NzIsMCwwLDEsLjExMS4zdjEuMzM3YS45NjMuOTYzLDAsMCwxLS40OTEuODEyLjQ3Ny40NzcsMCwwLDEtLjExOC4wNDMsMTUuNTU0LDE1LjU1NCwwLDAsMC00Ljg0MiwyLjEsMTEuMDMsMTEuMDMsMCwwLDAsMTUuMTkxLDAsMTUuNCwxNS40LDAsMCwwLTQuODQxLTIuMS40NDMuNDQzLDAsMCwxLS4xMTctLjA0Mi45NTEuOTUxLDAsMCwxLS40OTItLjgxM1YxNS43MzJhLjQ2OS40NjksMCwwLDEsLjExMS0uMyw2LjEsNi4xLDAsMCwwLDEuMTA3LTIuMjE5LjQ2Ni40NjYsMCwwLDEsLjMxOS0uMzE5LjQ3OS40NzksMCwwLDEsLjEzNC0uMDIuNDY5LjQ2OSwwLDAsMSwuMjkyLjEsNi45NTgsNi45NTgsMCwwLDAsLjI0Ni0xLjgybC0uMDEzLDBoLS4wMzRhLjQ2OS40NjksMCwwLDEtLjQ2OC0uNTRjLjEyNS0uODI4LjMtMi44OTItLjgtNC4xNzFBMy44MTMsMy44MTMsMCwwLDAsMTIsNS4zMDksMy44MSwzLjgxLDAsMCwwLDguOTYyLDYuNDQ4Yy0xLjEsMS4yNzgtLjkyNiwzLjM0Mi0uOCw0LjE3YS40NjkuNDY5LDAsMCwxLS40NjguNTQuNDA3LjQwNywwLDAsMS0uMDQ3LDAsNi45MjUsNi45MjUsMCwwLDAsLjI0NSwxLjgyQS40NzEuNDcxLDAsMCwxLDguMTg1LDEyLjg3MlpNMTYuMSwxMy45NzdBNi43NSw2Ljc1LDAsMCwxLDE1LjA4NiwxNS45djEuMTM3YTE1LjgsMTUuOCwwLDAsMSw1LjE4LDIuMywxMS4wNTgsMTEuMDU4LDAsMSwwLTE2LjUzMywwLDE1Ljk4NiwxNS45ODYsMCwwLDEsNS4xODEtMi4zVjE1LjlBNi43Nyw2Ljc3LDAsMCwxLDcuOSwxMy45NzdsLS4wNjQsMGEuOC44LDAsMCwxLS42NTMtLjM1Miw1LjI0NSw1LjI0NSwwLDAsMS0uMzM4LTMuMTg3LjYxNi42MTYsMCwwLDEsLjMyMS0uMjQ4QTUuODg4LDUuODg4LDAsMCwxLDguMjQ5LDUuODM0LDQuNyw0LjcsMCwwLDEsMTIsNC4zNjlhNC43LDQuNywwLDAsMSwzLjc1MSwxLjQ2NCw1Ljg4OSw1Ljg4OSwwLDAsMSwxLjA4Niw0LjM2LjYyMy42MjMsMCwwLDEsLjMyMi4yNDgsNS4yNTIsNS4yNTIsMCwwLDEtLjMzOCwzLjE4Ni44LjgsMCwwLDEtLjY1NC4zNTNsLS4wNjQsMFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K'">
            {{ username }}
          </div>
          <div v-if="reward" v-b-tooltip.hover title="Reward">
            <img src="@/assets/dollar.svg" alt="Reward">
            {{ reward }}
          </div>
          <div v-b-tooltip.hover title="Players cleared">
            <img src="@/assets/people.svg" alt="Players cleared" />
            {{ numCleared || 0 }}
          </div>
        </b-row>

        <div style="width: 100%;" class="d-flex mt-2 justify-content-between" v-if="$slots.buttons">
          <slot name="buttons" />
        </div>

      </template>
    </AspectRatioCard>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import { isUndefined } from 'lodash';
  import AspectRatioCard from './AspectRatioCard.vue';
  import StateCounter from './StateCounter.vue';
  import SmartLink from '../Common/SmartLink.vue';

  @Component({
    components: {
      StateCounter,
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class PuzzleCard extends Vue {
    @Prop({required: true}) readonly title!: string;

    @Prop({required: true}) readonly nid!: string;

    @Prop() readonly reward?: number;

    @Prop() readonly folder?: string;

    @Prop() readonly username?: string;

    @Prop() readonly userpicture?: string;

    @Prop() readonly number_of_states?: number;

    @Prop() readonly numSlots?: number;

    @Prop() readonly numSubmitted?: number;

    @Prop() readonly numSynths?: number;

    @Prop() readonly mySolutions?: number;

    @Prop() readonly maxSubmissions?: number;

    @Prop() readonly states?: number;

    @Prop() readonly image?: string;

    @Prop() readonly numSolutions?: number;

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop({ default: false }) readonly locked!: boolean;

    @Prop({ default: false }) readonly cleared!: boolean;

    @Prop({ default: false }) readonly madeByPlayer!: boolean;

    @Prop({ default: false }) readonly is3d?: boolean;

    // Whether clicking on the card background should link to the puzzle.
    @Prop({ default: true }) readonly backgroundLink!: boolean;

    get numCleared() {
      if (isUndefined(this.$attrs['num-cleared'])){
        return this.numSolutions;
      }
      return this.$attrs['num-cleared'];
    }

    get imageURL() {
      return this.image
        ? `${process.env.VUE_APP_API_BASE_URL}${this.image}`
        : Utils.getPuzzleMiddleThumbnail(this.nid);
    }

    get avatar() {
      return Utils.getAvatar(this.userpicture || null);
    }

    get stateCount() {
      return this.states ?? this.number_of_states ?? 1;
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

  .puzzle-card-title {
    height: 50px;
    text-align: center;
  }

  .meta-row {
    font-size: 11px;
    font-weight: bold;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    img {
      object-fit: contain;
      width: 14px;
      max-height: 14px;
      margin: 0 5px;
    }

    .icon-3d {
      background-color: $med-blue;
      padding: 1px 3px;
      border-radius: 2px;
      margin: 0 5px;
    }
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
