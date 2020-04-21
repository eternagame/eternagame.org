<template>
  <div class="d-flex justify-content-between">
    <b-button type="secondary">{{
      $t('edit-profile:replace-image')
    }}</b-button>
    <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit">{{
      $t('edit-profile:save')
    }}</b-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  @Component({})
  export default class PlayerHeaderTopRow extends Vue {
    @Prop({ required: true }) pageData!: object;

    submit() {
      this.$emit('submit-data');
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-name {
    font-size: 1.625rem;
    font-weight: bold;
    margin-bottom: 0px;
    width: 100px;
  }
</style>
