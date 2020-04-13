<template>
  <AspectRatioCard>
    <template #header>
      <div class="player-card-title">
        <p>#{{ index }}</p>
        <p>{{ player.name }}</p>
        <img :src="imageLink" :alt="player.name" />
        <p>points: {{ player.points }}</p>
        <p>created: {{ player.created }}</p>
      </div>
    </template>
    <router-link :to="playerUrl">
      <b-img
        :src="player.cover_image || '/puzzle-progression/badges/default-eterna-badge.png'"
        small
        fluid-grow
        class="mb-3 image scaplayerle"
      />
    </router-link>
  </AspectRatioCard>
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
  .player-card-title {
    height: 70px;
  }
</style>
