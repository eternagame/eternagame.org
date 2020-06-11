<template>
  <PuzzleCard
    :title="puzzle.title"
    :nid="puzzle.nid"
    :aspectRatio="1.18"
    :leftNumber="puzzle.num_slots"
    :states="states"
    :rightNumber="puzzle.submitted"
    :backgroundLink="false"
  >
    <div class="text-center image-container">
      <img :src="imageURL" class="image" />
    </div>
    <template #buttons>
      <b-button :href="`${mainRoute}${puzzle.nid}/`" variant="primary" size="sm">{{
        closed ? $t('lab-puzzle-card:closed-main') : $t('lab-puzzle-card:main')
      }}</b-button>
      <b-button :href="`${secondaryRoute}${puzzle.nid}/`" variant="secondary" size="sm">{{
        closed ? $t('lab-puzzle-card:closed-secondary') : $t('lab-puzzle-card:secondary')
      }}</b-button>
    </template>
  </PuzzleCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Utils from '@/utils/utils';
  import {
    PUZZLE_ROUTE_PREFIX,
    PUZZLE_ROUTE_BROWSE_PREFIX,
    PUZZLE_ROUTE_SOLUTIONS_PREFIX,
  } from '@/utils/constants';
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

    private secondaryRoute: string = this.closed
      ? PUZZLE_ROUTE_SOLUTIONS_PREFIX
      : PUZZLE_ROUTE_BROWSE_PREFIX;

    private mainRoute: string = PUZZLE_ROUTE_PREFIX;

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(this.puzzle.nid);
    }

    get states() {
      return this.puzzle.switch_struct ? this.puzzle.switch_struct.length : 1;
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }
</style>
