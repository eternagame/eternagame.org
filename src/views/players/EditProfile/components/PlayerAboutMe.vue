<template>
  <div class="b-container">
    <div class="row">
      <div class="col-md-8">
        <h4 class="about-me">{{ $t('player-view:about-me') }}</h4>
        <EditField :content="pageData.Profile" />
        <PlayerNewSection v-show="addingSection" :pageData="pageData" />
        <b-button
          style="margin-top:19px;"
          @click="addingSection = !addingSection"
          v-show="!addingSection"
          variant="secondary"
          >{{ $t('edit-profile:custom-section-add') }}</b-button
        >
      </div>
      <div class="col-md-4">
        <PlayerFeaturedAchievement :pageData="pageData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import PlayerFeaturedAchievement from './PlayerFeaturedAchievement.vue';
  import PlayerNewSection from './PlayerNewSection.vue';

  Vue.use(VueDOMPurifyHTML);

  @Component({
    components: { PlayerFeaturedAchievement, EditField, PlayerNewSection },
  })
  export default class PlayerAboutMe extends Vue {
    @Prop({ required: true }) pageData!: object;

    private addingSection: boolean = false;
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

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
  }
</style>
