<template
  ><div>
    <div class="d-flex">
      <EditGroupHeaderImage :picture="picture" />
      <div class="player-details">
        <EditGroupHeaderTopRow
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
  import EditGroupHeaderImage from './EditGroupHeaderImage.vue';
  import EditGroupHeaderTopRow from './EditGroupHeaderTopRow.vue';

  @Component({
    components: { EditGroupHeaderImage, EditGroupHeaderTopRow },
  })
  export default class GroupHeader extends Vue {
    @Prop({required: true}) picture!: File;

    @Prop({required: true}) loading!: boolean;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }
</style>
