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
          v-model="personalName"
          @change="setPersonalName()"
        />
        <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:bio') }}</p>
        <EditField :content="aboutMeText" @input="setProfile" />
        <!--EditPlayerNewSection v-show="addingSection" @set-section="setSection" />
        <b-button
          style="margin-top:19px;"
          @click="addingSection = !addingSection"
          v-show="!addingSection"
          variant="secondary"
          >{{ $t('edit-profile:custom-section-add') }}</b-button
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
  import { UserData } from '@/types/common-types';
  import EditPlayerFeaturedAchievement from './EditPlayerFeaturedAchievement.vue';
  import EditPlayerNewSection from './EditPlayerNewSection.vue';

  @Component({
    components: { EditPlayerFeaturedAchievement, EditField, EditPlayerNewSection },
  })
  export default class PlayerAboutMe extends Vue {
    private aboutMeText = this.$vxm.user.userDetails?.Profile;
    
    private personalName = this.$vxm.user.userDetails != null && this.$vxm.user.userDetails['Personal Name'] ? this.$vxm.user.userDetails['Personal Name'] : '';

    setProfile(text: string | undefined) {
      if (text) this.$emit('set-profile', text);
    }

    setSection(section: object) {
      this.$emit('set-section', section);
    }

    setPersonalName() {
      this.$emit('set-personal-name', this.personalName);
    }

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
