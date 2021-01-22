<template>
  <div class="d-flex justify-content-between">
    <b-button type="secondary" style="margin-left:10px" @click="fileUpload.click()">
      {{$t('edit-profile:replace-image')}}
    </b-button>
    <input type="file" @change="handleFile" hidden ref="fileUpload" />
    <b-button type="submit" style="margin-left:10px" variant="primary" @click="$emit('submit')">
      {{$t('edit-profile:save')}}
    </b-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Ref } from 'vue-property-decorator';

  @Component({})
  export default class PlayerHeaderTopRow extends Vue {
    @Ref("fileUpload") fileUpload!: HTMLInputElement;

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.$emit('update:picture', file);
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
