<template>
  <div class="login-row">
    <b-form inline class="my-2 my-lg-0" name="loginform" id="loginform" onsubmit="return false">
      <b-form-group>
        <b-form-input class="form-control" placeholder="username" required v-model="username"/>
        <b-form-input type="password" class="form-control" placeholder="password"
         required v-model="password"/>
        <b-btn type="submit" id="loginButton" value="Log In" class="btn btn-primary" @click="login">
          Log In
        </b-btn>
        <b-btn variant="secondary" v-b-modal.modal-register>Register</b-btn>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class LoginRow extends Vue {
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
  .form-group > * > *:not(:first-child) {
    margin-left: .5rem;
  }
</style>
