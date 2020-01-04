<template>
  <div class="login-sub">
    <b-btn class="forgot-password mt-0" variant="secondary"
            size="sm" v-b-modal.modal-reset-password>
      Forgot password?
    </b-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class LoginSub extends Vue {
    private username: string = '';

    private password: string = '';

    async login() {
      if (this.username && this.password) {
        const data = await this.$vxm.user.login({
          username: this.username,
          password: this.password,
        });
        if (data.success) {
          this.$router.push('/labs/explore');
        } else {
          this.$vxm.user.showLoginFailedModal({ errorMessage: data.error });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .forgot-password {
    font-size: 0.7rem;
    line-height: 1;
  }
</style>
