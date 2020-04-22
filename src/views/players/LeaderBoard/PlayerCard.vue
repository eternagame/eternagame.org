<template>
  <div class="card">
    <div class="player-card-title d-flex" style="width:100%">
      <p>#{{ index }}</p>
      <img class="rounded-circle" :src="imageLink" v-if="imageLink" alt="player-image" />
      <p
        class="player-name"
        style="font-size: 17px;font-weight: bold;margin-top:20px;margin-left:5px"
      >
        {{ player.name }}
      </p>
    </div>
    <div style="float:right;position:absolute;right:0px;margin-top:40px;margin-right:5px">
      <img src="@/assets/dollar.svg" class="icon" /> {{ player.points }}
    </div>

    <hr class="bottom-border" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import { PlayerCardData } from './types';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class PlayerCard extends Vue {
    @Prop() private player!: PlayerCardData;

    @Prop() private index!: number;

    get imageLink() {
      return `${process.env.VUE_APP_API_BASE_URL}/${this.player.picture}`;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-card-title {
    height: 80px;
  }

  .bottom-border {
    border-top-color: $light-blue;
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }
</style>
