<template>
  <SmartLink :link="backgroundLink ? `/puzzles/${nid}` : ''">
    <AspectRatioCard :aspectRatio="aspectRatio" :id="`popover-target-${nid}`" class="card">
      <template #header>
        <div class="puzzle-card-title" v-if="title">
          <img src="@/assets/noun_check.svg" v-if="cleared" style="float:right" />

          <b>{{ title }}</b>
        </div>
      </template>
      <img :src="imageURL" style="width: 80%; margin: auto;" class="scalable" />
      <img src="@/assets/noun_lock.svg" v-if="locked" class="inner" />
      <template #footer>
        <b-row class="mb-2" style="margin-top:10px">
          <b-col cols="4">
            <div class="left-col" v-if="folder">
              <slot name="left-icon">
                <img src="@/assets/chemical_bond.svg" alt="folder slots" class="icon" />
              </slot>
              {{ folder }}
            </div>
          </b-col>
          <b-col cols="4">
            <div class="text-center" v-if="number_of_states > 1">
              <StateCounter :value="number_of_states" style="position:relative;top:-5px" />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="right-col" v-if="reward">
              <slot name="right-icon">
                <img src="@/assets/dollar.svg" alt="reward slots" class="icon" />
              </slot>
              {{ reward }}
            </div>
          </b-col>
        </b-row>
        <div style="width: 100%;" class="d-flex justify-content-between" v-if="$slots.buttons">
          <slot name="buttons" />
        </div>


        <b-row class="mb-2" style="margin-top:10px">
          <b-col cols="6">
            <div class="left-col" v-if="folder">
              <slot name="left-icon">
                <img :src="avatar" id="avatarimage" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMy45OTkiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQiPg0KICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMiwyNEExMiwxMiwwLDEsMSwyNCwxMiwxMi4wMTMsMTIuMDEzLDAsMCwxLDEyLDI0Wk04LjE4NSwxMi44NzJhLjQ5LjQ5LDAsMCwxLC4xMzQuMDIuNDczLjQ3MywwLDAsMSwuMzE5LjMxOCw2LjEsNi4xLDAsMCwwLDEuMTA4LDIuMjE5LjQ3Mi40NzIsMCwwLDEsLjExMS4zdjEuMzM3YS45NjMuOTYzLDAsMCwxLS40OTEuODEyLjQ3Ny40NzcsMCwwLDEtLjExOC4wNDMsMTUuNTU0LDE1LjU1NCwwLDAsMC00Ljg0MiwyLjEsMTEuMDMsMTEuMDMsMCwwLDAsMTUuMTkxLDAsMTUuNCwxNS40LDAsMCwwLTQuODQxLTIuMS40NDMuNDQzLDAsMCwxLS4xMTctLjA0Mi45NTEuOTUxLDAsMCwxLS40OTItLjgxM1YxNS43MzJhLjQ2OS40NjksMCwwLDEsLjExMS0uMyw2LjEsNi4xLDAsMCwwLDEuMTA3LTIuMjE5LjQ2Ni40NjYsMCwwLDEsLjMxOS0uMzE5LjQ3OS40NzksMCwwLDEsLjEzNC0uMDIuNDY5LjQ2OSwwLDAsMSwuMjkyLjEsNi45NTgsNi45NTgsMCwwLDAsLjI0Ni0xLjgybC0uMDEzLDBoLS4wMzRhLjQ2OS40NjksMCwwLDEtLjQ2OC0uNTRjLjEyNS0uODI4LjMtMi44OTItLjgtNC4xNzFBMy44MTMsMy44MTMsMCwwLDAsMTIsNS4zMDksMy44MSwzLjgxLDAsMCwwLDguOTYyLDYuNDQ4Yy0xLjEsMS4yNzgtLjkyNiwzLjM0Mi0uOCw0LjE3YS40NjkuNDY5LDAsMCwxLS40NjguNTQuNDA3LjQwNywwLDAsMS0uMDQ3LDAsNi45MjUsNi45MjUsMCwwLDAsLjI0NSwxLjgyQS40NzEuNDcxLDAsMCwxLDguMTg1LDEyLjg3MlpNMTYuMSwxMy45NzdBNi43NSw2Ljc1LDAsMCwxLDE1LjA4NiwxNS45djEuMTM3YTE1LjgsMTUuOCwwLDAsMSw1LjE4LDIuMywxMS4wNTgsMTEuMDU4LDAsMSwwLTE2LjUzMywwLDE1Ljk4NiwxNS45ODYsMCwwLDEsNS4xODEtMi4zVjE1LjlBNi43Nyw2Ljc3LDAsMCwxLDcuOSwxMy45NzdsLS4wNjQsMGEuOC44LDAsMCwxLS42NTMtLjM1Miw1LjI0NSw1LjI0NSwwLDAsMS0uMzM4LTMuMTg3LjYxNi42MTYsMCwwLDEsLjMyMS0uMjQ4QTUuODg4LDUuODg4LDAsMCwxLDguMjQ5LDUuODM0LDQuNyw0LjcsMCwwLDEsMTIsNC4zNjlhNC43LDQuNywwLDAsMSwzLjc1MSwxLjQ2NCw1Ljg4OSw1Ljg4OSwwLDAsMSwxLjA4Niw0LjM2LjYyMy42MjMsMCwwLDEsLjMyMi4yNDgsNS4yNTIsNS4yNTIsMCwwLDEtLjMzOCwzLjE4Ni44LjgsMCwwLDEtLjY1NC4zNTNsLS4wNjQsMFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K'" class="icon">
              </slot>
              {{ username }}
            </div>
          </b-col>
          <b-col cols="6">
            <div class="right-col">
              <slot name="right-icon">
                <img src="@/assets/people.svg" alt="reward slots" class="icon" />
              </slot>
              {{ numCleared }}
            </div>
          </b-col>
        </b-row>


      </template>
    </AspectRatioCard>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
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

    @Prop() readonly image?: string;

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop({ default: false }) readonly locked!: boolean;

    @Prop({ default: false }) readonly cleared!: boolean;

    // Whether clicking on the card background should link to the puzzle.
    @Prop({ default: true }) readonly backgroundLink!: boolean;

    get numCleared() {
      if (this.$attrs['num-cleared']){
        return this.$attrs['num-cleared'];
      } 
        return 0;
    }

    get imageURL() {
      return this.image
        ? `${process.env.VUE_APP_API_BASE_URL}${this.image}`
        : Utils.getPuzzleMiddleThumbnail(this.nid);
    }

    get avatar() {
      return Utils.getAvatar(this.userpicture || null);
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

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .puzzle-card-title {
    height: 50px;
    text-align: center;
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
