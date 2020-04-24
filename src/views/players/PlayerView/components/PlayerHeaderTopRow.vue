<template>
  <div class="d-flex justify-content-between">
    <h1 class="player-name">{{ pageData.name }}</h1>
    <div class="d-sm-flex">
      <div class="order-sm-2">
        <b-button type="submit" style="margin-left:10px" variant="primary">{{
          $t('player-view:message')
        }}</b-button>
      </div>
      <div class="order-sm-1">
        <b-form-checkbox
          id="checkbox-1"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
          >{{ $t('player-view:following') }}
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  @Component({})
  export default class PlayerHeaderTopRow extends Vue {
    @Prop({ required: true }) pageData!: object;
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
