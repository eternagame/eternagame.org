<template
  ><div>
    <div class="d-flex">
      <EditPlayerHeaderImage :picture="picture" />
      <div class="player-details">
        <EditPlayerHeaderTopRow
          :loading="loading"
          @submit="$emit('submit')"
          @update:picture="file => $emit('update:picture', file)"
        />
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
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditPlayerHeaderImage from './EditPlayerHeaderImage.vue';
  import EditPlayerHeaderTopRow from './EditPlayerHeaderTopRow.vue';

  @Component({
    components: { EditPlayerHeaderImage, EditPlayerHeaderTopRow },
  })
  export default class PlayerHeader extends Vue {
    @Prop({required: true}) private picture!: File;

    @Prop({required: true}) private loading!: boolean;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }
</style>
