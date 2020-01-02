<template>
  <AspectRatioCard :aspectRatio="aspectRatio">
    <template #header>
      <div class="puzzle-card-title">
        <b>{{title}}</b>
      </div>
    </template>
    <img :src="imageURL" style="width: 80%; margin: auto;" class="scalable"/>
    <template #footer>
      <b-row class="mb-2">
        <b-col cols="4" class="left-col">
          <slot name="left-icon">
            <img src="@/assets/test-tube.svg" alt="lab slots" class="icon">
          </slot>
          &nbsp;{{leftNumber}}
        </b-col>
        <b-col cols="4" class="text-center">
          <StateCounter :value="states"/>
        </b-col>
        <b-col cols="4" class="right-col">
          <slot name="right-icon">
            <img src="@/assets/people.svg" alt="submissions" class="icon">
          </slot>
          &nbsp;{{rightNumber}}
        </b-col>
      </b-row>
      <div style="width: 100%;" class="d-flex justify-content-between" v-if="$slots.buttons">
        <slot name="buttons"/>
      </div>
    </template>
  </AspectRatioCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import AspectRatioCard from './AspectRatioCard.vue';
  import StateCounter from './StateCounter.vue';

  @Component({
    components: {
      StateCounter,
      AspectRatioCard,
    },
  })
  export default class LabPuzzleCard extends Vue {
    @Prop({ required: true }) private title!: string;

    @Prop({ required: true }) private nid!: string;

    @Prop({ required: true }) private leftNumber!: number;

    @Prop({ required: true }) private states!: number;

    @Prop({ required: true }) private rightNumber!: number;

    @Prop({ default: 1 }) private aspectRatio!: number;

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.nid);
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
  }

  .left-col, .right-col {
    font-size: 11px;
    display: flex;
    align-items : center;
    font-weight: bold;

    & > .icon {
      width: 12.57px;
    }
  }

  .right-col {
    justify-content: flex-end;
  }
</style>
