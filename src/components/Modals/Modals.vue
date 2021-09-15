<template>
  <div>
    <RegisterModal />
    <ResetCompleteModal />
    <ResetPasswordModal />
    <AcceptTermsModal />
    <LoginModal />
    <AchievementModal />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AcceptTermsModal from './AcceptTermsModal.vue';
  import RegisterModal from './RegisterModal.vue';
  import ResetCompleteModal from './ResetCompleteModal.vue';
  import ResetPasswordModal from './ResetPasswordModal.vue';
  import LoginModal from './LoginModal.vue';
  import AchievementModal from './AchievementModal.vue';

  @Component({
    components: {
      RegisterModal,
      ResetCompleteModal,
      ResetPasswordModal,
      LoginModal,
      AcceptTermsModal,
      AchievementModal
    },
  })
  export default class Modals extends Vue {}
</script>

<style scoped lang="scss"></style>
