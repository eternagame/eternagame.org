<template>
  <div class="d-flex" v-if="user">
    <div>
      <h4 class="about-me">
        {{ $t('player-view:about-me') }}
      </h4>
      <p v-dompurify-html="user.Profile" class="about-me-text"></p>
    </div>
    <PlayerFeaturedAchievement v-if="user.featuredAchievement" :user="user" />
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
    @Prop() user!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .about-me {
    font-size: 20.625px;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
  }
</style>
