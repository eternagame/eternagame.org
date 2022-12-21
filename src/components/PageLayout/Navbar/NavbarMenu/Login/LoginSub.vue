<template>
  <div class="login-sub">
    <b-btn
      class="forgot-password mt-0"
      variant="secondary"
      size="sm"
      v-b-modal.modal-reset-password
    >
      {{ $t('login-sub:main-action') }}
    </b-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class LoginSub extends Vue {}
</script>

<style lang="scss" scoped>
  .forgot-password {
    font-size: 10.5px;
    line-height: 1;
  }
</style>
