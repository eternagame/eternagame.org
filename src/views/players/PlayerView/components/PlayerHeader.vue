<template
  ><div v-if="user">
    <div class="d-flex">
      <PlayerHeaderImage :user="user" />
      <div class="player-details">
        <PlayerHeaderTopRow :user="user" :follows="follows" />
        <div class="d-none d-sm-block">
          <div class="d-flex justify-content-between">
            <PlayerHeaderRank :user="user" />
            <PlayerHeaderIcons :user="user" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-sm-none">
      <div class="d-flex flex-wrap justify-content-between">
        <PlayerHeaderRank :user="user" />
        <PlayerHeaderIcons :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import PlayerHeaderImage from './PlayerHeaderImage.vue';
  import PlayerHeaderTopRow from './PlayerHeaderTopRow.vue';
  import PlayerHeaderRank from './PlayerHeaderRank.vue';
  import PlayerHeaderIcons from './PlayerHeaderIcons.vue';

  @Component({
    components: { PlayerHeaderImage, PlayerHeaderRank, PlayerHeaderIcons, PlayerHeaderTopRow },
  })
  export default class PlayerHeader extends Vue {
    @Prop() user!: object;

    @Prop() follows!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }
</style>
