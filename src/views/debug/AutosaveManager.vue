<template>
  <EternaPage
    title="Autosave Manager"
  >
    <notifications position="bottom center" width="50%"/>
    <b-form-group label="Puzzles">
      <b-input placeholder="Puzzle ID" v-model="puzzleId"></b-input>
      <b-button @click="resetPuzzle">Reset Puzzle</b-button>
    </b-form-group>
    <b-form-group label="Puzzlemaker">
      <b-input placeholder="Number of states" v-model="numStates"></b-input>
      <b-button @click="resetPuzzlemaker">Reset Puzzlemaker</b-button>
    </b-form-group>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import * as localforage from 'localforage';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: { EternaPage },
  })
  export default class AutosaveManager extends Vue {
    puzzleId: string = '';

    numStates: string = '';

    async resetPuzzle() {
      const store = localforage.createInstance({ name: 'EternaSaveGame' });
      const key = `puz_${this.puzzleId}`;
      await store.removeItem(key);
      this.$notify({type: 'success', text: `Successfully removed ${key}`});
    }

    async resetPuzzlemaker() {
      const store = localforage.createInstance({ name: 'EternaSaveGame' });
      const key = `puzeditv2_${this.numStates}`;
      store.removeItem(key);
      this.$notify({type: 'success', text: `Successfully removed ${key}`});
    }
  }
</script>
<style lang="scss" scoped>
  input {
    display: inline-block;
    width: 200px;
    margin-right: 5px;
  }

  button {
    display: inline-block;
  }
</style>
