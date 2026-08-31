<template>
  <PuzzleCard
    :title="puzzle.title"
    :nid="puzzle.nid"
    :aspectRatio="1.18"
    :numSlots="puzzle.type === 'Experimental' ? puzzle.num_slots : undefined"
    :numSynths="puzzle.type === 'Experimental' ? puzzle.num_synthesized : undefined"
    :mySolutions="puzzle.type === 'Experimental' ? puzzle.num_solutions : undefined"
    :maxSubmissions="puzzle.type === 'Experimental' ? puzzle.player_max_submissions : undefined"
    :states="states"
    :numSubmitted="puzzle.type === 'Experimental' ? puzzle.submitted : undefined"
    :numSolutions="puzzle.type !== 'Experimental' ? puzzle.submitted : undefined"
    :backgroundLink="false"
    :is3d="puzzle['has3d'] === '1'"
    :cleared="puzzle.num_solutions > 0"
    :madeByPlayer="puzzle.madeByPlayer !== 0"
    :username="puzzle.username"
    :userpicture="puzzle.userpicture"
  >
    <div class="text-center image-container">
      <img :src="imageURL" alt="" class="image" />
    </div>
    <template #buttons>
      <template v-if="puzzle.type === 'Challenge'">
        <b-button :to="`/puzzles/${puzzle.nid}/play`" variant="primary" size="sm" class="btn-full">Solve</b-button>
      </template>
      <template v-else>
        <b-button :to="`/puzzles/${puzzle.nid}/play`" variant="primary" size="sm" class="btn-split">{{
          closed ? $t('lab-puzzle-card:closed-main') : $t('lab-puzzle-card:main')
        }}</b-button>
        <b-button :to="`/puzzles/${puzzle.nid}/browse`" variant="secondary" size="sm" class="btn-split">{{
          closed ? $t('lab-puzzle-card:closed-secondary') : $t('lab-puzzle-card:secondary')
        }}</b-button>
      </template>
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
  .btn-full {
    display: inline-block;
    width: 100%;
    margin-bottom: 0px;
  }
  .btn-split {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }
</style>
