<template>
  <div class="d-flex">
    <div>
      <h4 class="about-me">
        {{ $t('player-view:about-me') }}
      </h4>
      <p v-html="pageData.aboutMeText" class="about-me-text"></p>
      <img :src="pageData.picture" style="width:100%;height:100%;object-fit:cover" />
    </div>
    <PlayerFeaturedAchievement :pageData="pageData" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import PlayerFeaturedAchievement from './PlayerFeaturedAchievement.vue';

  @Component({
    components: { PlayerFeaturedAchievement },
  })
  export default class PlayerAboutMe extends Vue {
    @Prop({ required: true }) pageData!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .about-me {
    font-size: 1.375rem;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
  }
</style>
