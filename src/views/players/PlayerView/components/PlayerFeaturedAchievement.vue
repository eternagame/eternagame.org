<template>
  <div class="d-none d-sm-block">
    <b class="d-flex justify-content-center">{{ $t('player-view:featured-achievement') }}</b>
    <div class="d-flex justify-content-center" style="margin-top:15px">
      <img :src="user.featuredAchievement" />
    </div>
    <div class="d-flex justify-content-center" style="margin-top:23px">
      <b-button type="submit" variant="secondary">{{
        $t('player-view:featured-achievement-update')
      }}</b-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PlayerFeaturedAchievement extends Vue {
    @Prop({ required: true }) readonly user!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
