<template>
  <p class="player-rank">
    {{ $t('player-view:global-rank') }} <span style="color:#fac244"> #{{ playerRank }}</span>
  </p>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  @Component({})
  export default class PlayerHeaderRank extends Vue {}
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-rank {
    font-size: 1.0625rem;
    font-weight: bold;
    margin-bottom: 0px;
    margin-top: 10px;
    margin-right: 250px;
  }
</style>
