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

    @Prop() readonly number_of_states?: number;

    @Prop() readonly image?: string;

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop({ default: false }) readonly locked!: boolean;

    @Prop({ default: false }) readonly cleared!: boolean;

    // Whether clicking on the card background should link to the puzzle.
    @Prop({ default: true }) readonly backgroundLink!: boolean;

    get numCleared() {
      return this.$attrs['num-cleared'];
    }

    get imageURL() {
      return this.image
        ? `${process.env.VUE_APP_API_BASE_URL}${this.image}`
        : Utils.getPuzzleMiddleThumbnail(this.nid);
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
