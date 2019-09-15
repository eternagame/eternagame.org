<template>
  <b-card>
    <div class="puzzle-card-title"><b>{{puzzle.title}}</b></div>
    <div class="text-center">
      <img :src="imageURL" style="width: 80%; margin: auto;"/>
    </div>
    <b-row class="mb-2">
      <b-col cols="4" class="slots">
        <img src="@/assets/test-tube.svg" alt="lab slots" class="icon">
        &nbsp;{{puzzle.num_slots}}
      </b-col>
      <b-col cols="4" class="text-center">
        <div style="position: relative;">
          <img src="@/assets/square-45.svg" alt="round" class="icon">
          <div class="state-num">{{states}}</div>
        </div>
      </b-col>
      <b-col cols="4" class="submissions">
        <img src="@/assets/people.svg" alt="submissions" class="icon">
        &nbsp;{{puzzle.submitted}}
      </b-col>
    </b-row>
    <div style="width: 100%;" class="d-flex justify-content-between">
      <b-button href="" variant="primary"   size="sm">Design</b-button>
      <b-button href="" variant="secondary" size="sm">Review</b-button>
    </div>
  </b-card>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PuzzleData } from '../types';
  import Utils from '@/utils/utils';

  @Component({
    components: {
    },
  })
  export default class LabPuzzleCard extends Vue {
    @Prop() private puzzle!: PuzzleData;

    @Prop({ default: '275px' }) private width!: string;

    get imageURL() {
      console.log(this.puzzle);
      return Utils.getPuzzleMiddleThumbnail(this.puzzle.nid);
    }

    get states() {
      return this.puzzle.switch_struct ? this.puzzle.switch_struct.length : 1;
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body{
    padding: 0.75rem !important;
  }

  .puzzle-card-title {
    height: 50px;
    text-align: center;
  }

  .state-num {
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
  }

  .slots, .submissions {
    font-size: 11px;
    display: flex;
    align-items : center;
    // height: 100%;
    font-weight: bold;

    & > .icon {
      width: 12.57px;
    }
  }

  .submissions {
    justify-content: flex-end;
  }
</style>
