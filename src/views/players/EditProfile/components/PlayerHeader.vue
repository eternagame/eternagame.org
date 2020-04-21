<template>
  <div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-3 justify-content-center">
          <PlayerHeaderImage :pageData="pageData" />
        </div>
        <div class="col-md-8  justify-content-start">
          <PlayerHeaderTopRow :pageData="pageData" @submit-data="submit" />
          <p style="margin-top:10px">{{ $t('edit-profile:replace-image-details') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import PlayerHeaderImage from './PlayerHeaderImage.vue';
import PlayerHeaderTopRow from './PlayerHeaderTopRow.vue';
import PlayerHeaderIcons from './PlayerHeaderIcons.vue';

@Component({
  components: { PlayerHeaderImage, PlayerHeaderIcons, PlayerHeaderTopRow },
})
export default class PlayerHeader extends Vue {
  @Prop({ required: true }) pageData!: object;

  submit() {
    this.$emit('submit-data');
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
</style>
