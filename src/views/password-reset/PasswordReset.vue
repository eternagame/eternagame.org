<template>
  <div class="page">
    <div class="container">
      <div class="card mx-auto" style="max-width: 30rem; background-color: #21508c;">
        <div class="card-body">
          <h5 class="card-title">Reset Password</h5>
          <div id="reset-error" class="alert alert-danger" v-if="error">{{error}}</div>
          <div id="authorizing" v-if="loading">
            <div style="text-align:center;"><img src="/puzzle-progression/images/loading.gif" alt="Loading"></div>
            <p class="card-text" style="text-align: center;">
              Authorizing...
            </p>
          </div>
          <b-form @submit.prevent="doReset" id="password-form" v-else-if="!authorizationFailure">
            <div class="form-group">
              <b-input type="password" placeholder="password" required v-model="newPassword" />
              <b-input type="password" placeholder="re-enter password" v-model="confirmPassword" required />
              <input type="submit" id="submit" value="Change Password" class="btn btn-primary mt-3" />
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PasswordReset extends Vue {
    loading: boolean = true;

    authorizationFailure: boolean = false;

    error: string = '';

    newPassword: string = '';

    confirmPassword: string = '';

    // TODO: Rewrite for SSR?
    async mounted() {
      // If we're logged in while viewing this screen, we could wind up with some weird behavior
      // (at the very least, it would be confusing, but this also avoids any potential issues with
      // having an active session)
      await this.$vxm.user.logout();

      const {uid, ts, token} = this.$route.query;

      if (typeof uid !== 'string' || typeof ts !== 'string' || typeof token !== 'string') {
        this.error = 'We couldn\'t verify this password reset request. Please contact support@eternagame.org for assistance';
        this.loading = false;
        this.authorizationFailure = true;
        return;
      }

      const {data} = (await this.$http.post(
        '/login/',
        new URLSearchParams({ type: 'validatereset', uid, ts, token }),
        { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
      )).data;

      if (!data.success) {
        this.authorizationFailure = true;
        this.error = data.error;
      }

      this.loading = false;
    }

    async doReset() {
      if (this.newPassword !== this.confirmPassword) {
        this.error = 'Password and confirmation do not match';
        return;
      }

      const {uid, ts, token} = this.$route.query;

      if (typeof uid !== 'string' || typeof ts !== 'string' || typeof token !== 'string') {
        this.error = 'We couldn\'t verify this password reset request. Please contact support@eternagame.org for assistance';
        this.authorizationFailure = true;
        return;
      }

      this.error = '';
      this.loading = true;

      const {data} = (await this.$http.post(
        '/login/',
        new URLSearchParams({ type: 'doreset', uid, ts, token, pass: this.newPassword }),
        { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
      )).data;

      if (data.success) {
        this.$router.push('/');
      } else {
        this.loading = false;
        this.error = data.error;
      }
    }
  }
</script>

<style lang="scss" scoped>
.page {
  margin-top: 150px;
}
</style>
