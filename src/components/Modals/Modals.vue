<template>
  <div>
    <RegisterModal />
    <RegisterFBModal />
    <ResetCompleteModal />
    <ResetPasswordModal />
    <AcceptTermsModal />
    <LoginModal />
    <AchievementModal />
    <SurveyModal />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AcceptTermsModal from './AcceptTermsModal.vue';
  import RegisterModal from './RegisterModal.vue';
  import RegisterFBModal from './RegisterFBModal.vue';
  import ResetCompleteModal from './ResetCompleteModal.vue';
  import ResetPasswordModal from './ResetPasswordModal.vue';
  import LoginModal from './LoginModal.vue';
  import AchievementModal from './AchievementModal.vue';
  import SurveyModal from './SurveyModal.vue';

  @Component({
    components: {
      RegisterModal,
      RegisterFBModal,
      ResetCompleteModal,
      ResetPasswordModal,
      LoginModal,
      AcceptTermsModal,
      AchievementModal,
      SurveyModal
    },
  })
  export default class Modals extends Vue {}
</script>

<style scoped lang="scss"></style>
