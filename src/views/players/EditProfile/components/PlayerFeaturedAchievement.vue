<template>
  <div class="d-none d-sm-block ">
    <b>{{ $t('player-view:featured-achievement') }}</b>
    <div>
      <img :src="pageData.featuredAchievement" />
    </div>
    <b-button type="submit" style="margin-left:10px" variant="secondary">{{
      $t('player-view:featured-achievement-update')
    }}</b-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PlayerFeaturedAchievement extends Vue {
    @Prop({ required: true }) pageData!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
