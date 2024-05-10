<template>
  <div class="login-row">
    <b-form inline :style="{'justify-content': isInSideBar ? 'center' : 'end'}" name="loginform" id="loginform" onsubmit="return false">
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
  export default class LoginRow extends Vue {
    @Prop({ default: false }) readonly isInSideBar!: boolean;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .button + .button {
    margin-left: 0.5rem;
  }
  .button {
    font-size: 18px;
    padding: 0.3rem 1rem 0.3rem 1rem;
    @include media-breakpoint-up(xs) {
      font-size: 12px;
    }
  }
</style>
