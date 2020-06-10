<template>
  <div v-if="user.Profile" class="content">
    <hr class="top-border" />
    <div>
      <div>
        <h4 class="about-me">
          {{ $t('player-view:about-me') }}
        </h4>
        <p v-dompurify-html="user.Profile" class="about-me-text" style="word-wrap: break-word;"></p>
      </div>
      <PlayerFeaturedAchievement v-if="user.featuredAchievement" :user="user" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import PlayerFeaturedAchievement from './PlayerFeaturedAchievement.vue';
  
  @Component({
    components: { PlayerFeaturedAchievement },
  })
  export default class PlayerAboutMe extends Vue {
    @Prop({ required: true }) readonly user!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .content {
    margin: 1rem;
  }

  .about-me {
    font-size: 20.625px;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
    white-space: pre-wrap;
    overflow: hidden;
  }
</style>
