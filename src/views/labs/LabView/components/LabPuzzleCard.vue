<template>
  <PuzzleCard
    :title="puzzle.title"
    :nid="puzzle.nid"
    :aspectRatio="1.18"
    :numSlots="puzzle.num_slots"
    :numSynths="puzzle.num_synthesized"
    :mySolutions="puzzle.num_solutions"
    :maxSubmissions="puzzle.player_max_submissions"
    :states="states"
    :numSubmitted="puzzle.submitted"
    :backgroundLink="false"
    :is3d="puzzle['has3d'] === '1'"
  >
    <div class="text-center image-container">
      <img :src="imageURL" alt="" class="image" />
    </div>
    <template #buttons>
      <b-button :to="`/puzzles/${puzzle.nid}/play`" variant="primary" size="sm">{{
        closed ? $t('lab-puzzle-card:closed-main') : $t('lab-puzzle-card:main')
      }}</b-button>
      <b-button :to="`/puzzles/${puzzle.nid}/browse`" variant="secondary" size="sm">{{
        closed ? $t('lab-puzzle-card:closed-secondary') : $t('lab-puzzle-card:secondary')
      }}</b-button>
    </template>
  </PuzzleCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Utils from '@/utils/utils';
  import { PuzzleData } from '../types';

  @Component({
    components: {
      PuzzleCard,
    },
  })
  export default class LabPuzzleCard extends Vue {
    @Prop({ required: true }) readonly puzzle!: PuzzleData;

    @Prop({ default: '275px' }) readonly width!: string;

    @Prop({ default: true }) readonly closed!: boolean;

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.puzzle.nid);
    }

    get states() {
      return this.puzzle.switch_struct ? this.puzzle.switch_struct.length : 1;
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.btn) {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }
</style>
