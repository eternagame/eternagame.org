<template>
  <div class="login-row">
    <b-form inline class="my-2 my-lg-0" name="loginform" id="loginform" onsubmit="return false">
      <b-form-group class="d-flex flex-wrap">
        <b-btn
          type="submit"
          id="loginButton"
          variant="primary"
          class="button"
          v-b-modal.modal-login
        >
          {{ $t('login-row:main-action') }}
        </b-btn>
        <b-btn variant="secondary" class="button" v-b-modal.modal-register>{{
          $t('login-row:secondary-action')
        }}</b-btn>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class LoginRow extends Vue {}
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .button + .button {
    margin-left: 7.5px;
  }
  .button {
    width: 129px;
    font-size: 18px;
    @include media-breakpoint-up(xs) {
      width: 90px;
      font-size: 12px;
    }
  }
</style>
