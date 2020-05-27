<template>
  <div class="d-flex justify-content-between">
    <b-button type="secondary" style="margin-left:10px" @click="chooseFiles()">{{
      $t('edit-profile:replace-image')
    }}</b-button>
    <input id="fileUpload" type="file" hidden />
    <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit">{{
      $t('edit-profile:save')
    }}</b-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

  @Component({})
  export default class PlayerHeaderTopRow extends Vue {
    submit() {
      this.$emit('submit-data');
    }

    chooseFiles() {
      const item = document.getElementById('fileUpload');
      if (item) item.click();
    }

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.$emit('set-picture', file);
    }

    mounted() {
      const item = document.getElementById('fileUpload');
      if (item) item.addEventListener('change', this.handleFile, false);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-name {
    font-size: 24.375px;
    font-weight: bold;
    margin-bottom: 0px;
    width: 100px;
  }
</style>
