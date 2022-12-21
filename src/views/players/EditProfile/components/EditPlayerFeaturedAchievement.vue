<template>
  <div class="d-none d-sm-block" v-if="featuredAchievementURL">
    <b class="d-flex justify-content-center">{{ $t('player-view:featured-achievement') }}</b>
    <div class="d-flex justify-content-center" style="margin-top:15px">
      <!-- TODO: If we actually support featured achievement, the alt should be the achievement name -->
      <img alt="featured achievement" :src="featuredAchievementURL" />
    </div>
    <div class="d-flex justify-content-center" style="margin-top:23px">
      <b-button type="submit" variant="secondary">{{
        $t('player-view:featured-achievement-update')
      }}</b-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PlayerFeaturedAchievement extends Vue {
    @Prop({required: true}) featuredAchievementURL!: string;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
