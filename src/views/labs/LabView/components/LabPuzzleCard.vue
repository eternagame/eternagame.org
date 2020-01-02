<template>
  <PuzzleCard :title="puzzle.title" :nid="puzzle.nid" :aspectRatio="1.18"
              :leftNumber="puzzle.num_slots" :states="states" :rightNumber="puzzle.submitted">
    <div class="text-center image-container">
      <img :src="imageURL" class="image"/>
    </div>
    <template #buttons>
      <b-button href="" variant="primary"   size="sm">Design</b-button>
      <b-button href="" variant="secondary" size="sm">Review</b-button>
    </template>
  </PuzzleCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PuzzleData } from '../types';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      PuzzleCard,
    },
  })
  export default class LabPuzzleCard extends Vue {
    @Prop() private puzzle!: PuzzleData;

    @Prop({ default: '275px' }) private width!: string;

    get imageURL() {
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
</style>
