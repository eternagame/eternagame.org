<template>
  <div>
    <LoginFailedModal />
    <RegisterModal />
    <ResetCompleteModal />
    <ResetPasswordModal />
    <LoginModal />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import LoginFailedModal from './LoginFailedModal.vue';
  import RegisterModal from './RegisterModal.vue';
  import ResetCompleteModal from './ResetCompleteModal.vue';
  import ResetPasswordModal from './ResetPasswordModal.vue';
  import LoginModal from './LoginModal.vue';

  @Component({
    components: {
      LoginFailedModal,
      RegisterModal,
      ResetCompleteModal,
      ResetPasswordModal,
      LoginModal,
    },
  })
  export default class Modals extends Vue {}
</script>

<style scoped lang="scss"></style>
