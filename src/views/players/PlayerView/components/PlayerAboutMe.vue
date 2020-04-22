<template>
  <div class="d-flex">
    <div>
      <h4 class="about-me">
        {{ $t('player-view:about-me') }}
      </h4>
      <p v-dompurify-html="pageData.Profile" class="about-me-text"></p>
    </div>
    <PlayerFeaturedAchievement
      v-if="pageData.featuredAchievement"
      :pageData="pageData.featuredAchievement"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import PlayerFeaturedAchievement from './PlayerFeaturedAchievement.vue';

  Vue.use(VueDOMPurifyHTML);
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
