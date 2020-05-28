<template
  ><div>
    <div class="d-flex">
      <EditPlayerHeaderImage :uploadedPicture="uploadedPicture" />
      <div class="player-details">
        <EditPlayerHeaderTopRow @submit-data="submit" @set-picture="setPicture" />
        <div class="d-none d-sm-block">
          <div class="d-flex justify-content-between">
            <p>{{ $t('edit-profile:replace-image-details') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-sm-none">
      <div class="d-flex flex-wrap justify-content-between">
        <p>{{ $t('edit-profile:replace-image-details') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import EditPlayerHeaderImage from './EditPlayerHeaderImage.vue';
  import EditPlayerHeaderTopRow from './EditPlayerHeaderTopRow.vue';

  @Component({
    components: { EditPlayerHeaderImage, EditPlayerHeaderTopRow },
  })
  export default class PlayerHeader extends Vue {
    submit() {
      this.$emit('submit-data');
    }

    private uploadedPicture: File | null = null;

    setPicture(file: File) {
      this.uploadedPicture = file;
      this.$emit('set-picture', file);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }
</style>
