<template>
  <b-container v-if="user">
    <b-row>
      <b-col md="6">
        <div class="player-profile d-flex mt-4">
          <PlayerHeaderImage :user="user" />
          <div class="hi">
            <h1 class="player-name mt-4">{{ user.name }}</h1>
            <PlayerHeaderRank :user="user" class="mt-3" />
          </div>
        </div>
      </b-col>
      <b-col md="6" class="player-details">
        <PlayerHeaderTopRow class="header-top-row" :user="user" :followList="followList" />
        <PlayerHeaderIcons class="header-icons" :user="user" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { UserData } from '@/types/common-types';
  import PlayerHeaderImage from './PlayerHeaderImage.vue';
  import PlayerHeaderTopRow from './PlayerHeaderTopRow.vue';
  import PlayerHeaderRank from './PlayerHeaderRank.vue';
  import PlayerHeaderIcons from './PlayerHeaderIcons.vue';

  @Component({
    components: { PlayerHeaderImage, PlayerHeaderRank, PlayerHeaderIcons, PlayerHeaderTopRow },
  })
  export default class PlayerHeader extends Vue {
    @Prop({ required: true }) readonly user!: UserData;

    @Prop({ required: true }) readonly followList!: UserData[];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }

  ::v-deep {
    font-weight: bold;
  }

  .player-profile,
  .header-top-row,
  .header-icons {
    justify-content: center;
  }

  .header-icons {
    margin: 0 auto;
    margin-top: 1rem;
  }

  .header-top-row {
    margin: 0 auto;
  }

  @include media-breakpoint-up(md) {
    .player-profile {
      float: left;
    }

    .header-icons {
      margin-top: 2.8rem;
      float: right;
    }

    .header-top-row {
      float: right;
    }
  }

  .player-name {
    font-size: 24.375px;
    font-weight: bold;
    margin-bottom: 0px;
    width: 100px;
  }
</style>
