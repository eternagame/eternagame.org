<template>
  <div class="b-container">
    <div class="row">
      <!-- div class="col-md-8"-->
      <div class="col-md-12">
        <h4 class="about-me">{{ $t('player-view:about-me') }}</h4>
        <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:personal-name') }}</p>
        <input
          style="color:#fff"
          type="text"
          :placeholder="$t('edit-profile:personal-name')"
          :value="personalName"
          @input="e => $emit('update:personalName', e.target.value)"
        />
        <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:bio') }}</p>
        <EditField :content="aboutMe" @input="text => $emit('update:aboutMe', text)" />
        <!--
        <EditPlayerNewSection
          v-show="addingSection"
          @set-section="section => $emit('set-section', section)"
        />
        <b-button
          style="margin-top:19px;"
          @click="addingSection = !addingSection"
          v-show="!addingSection"
          variant="secondary"
        >
          {{ $t('edit-profile:custom-section-add') }}
        </b-button>
        -->
      </div>
      <!--div class="col-md-4">
        <EditPlayerFeaturedAchievement />
      </div-->
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  import EditPlayerFeaturedAchievement from './EditPlayerFeaturedAchievement.vue';
  import EditPlayerNewSection from './EditPlayerNewSection.vue';

  @Component({
    components: { EditPlayerFeaturedAchievement, EditField, EditPlayerNewSection },
  })
  export default class PlayerAboutMe extends Vue {
    @Prop({required: true}) aboutMe!: string;

    @Prop({required: true}) personalName!: string;

    private addingSection: boolean = false;
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

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
  }
</style>
