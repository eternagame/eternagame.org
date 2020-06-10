<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4>
        <b>{{ $t('lab-view:round') }} {{ round.round }}</b>
      </h4>
      <span>
        <b
          ><span class="gray-header">Status:</span>&nbsp;{{
            $t(round.status || 'lab-round:accepting-submissions')
          }}</b
        >
      </span>
    </div>
    <Gallery>
      <LabPuzzleCard
        v-for="puzzle in round.puzzles"
        :key="puzzle.nid"
        :puzzle="puzzle"
        :closed="closed"
      />
    </Gallery>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { RoundData } from '../types';
  import LabPuzzleCard from './LabPuzzleCard.vue';

  @Component({
    components: {
      LabPuzzleCard,
    },
  })
  export default class LabRound extends Vue {
    @Prop({ required: true }) readonly round!: RoundData;

    @Prop({ default: false }) closed!: boolean;
  }
</script>

<style scoped lang="scss"></style>
