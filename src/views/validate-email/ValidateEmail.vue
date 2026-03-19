<template>
  <div class="page">
    <div class="container">
      <div class="card mx-auto" style="max-width: 30rem; background-color: #21508c;">
        <div class="card-body">
          <h5 class="card-title">Validate Email</h5>
          <div id="reset-error" class="alert alert-danger" v-if="error">{{error}}</div>
          <div id="authorizing" v-if="loading">
            <div style="text-align:center;"><img src="/puzzle-progression/images/loading.gif" alt="Loading"></div>
            <p class="card-text" style="text-align: center;">
              Validating...
            </p>
          </div>
          <div id="authorizing" v-if="!loading">
            <p class="card-text" style="text-align: center;">
              Email successfully validated! Redirecting to homepage in 5 seconds...
            </p>
          </div>
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

    // TODO: Rewrite for SSR?
    async mounted() {
      // If we're logged in while viewing this screen, we could wind up with some weird behavior
      // (at the very least, it would be confusing, but this also avoids any potential issues with
      // having an active session)
      await this.$vxm.user.logout();

      const {uid, ts, token} = this.$route.query;

      if (typeof uid !== 'string' || typeof ts !== 'string' || typeof token !== 'string') {
        this.error = 'We couldn\'t verify this email validation request. Please contact support@eternagame.org for assistance';
        this.loading = false;
        this.authorizationFailure = true;
        return;
      }

      const {data} = (await this.$http.post(
        '/login/',
        new URLSearchParams({ type: 'validateemail', uid, ts, token }),
        { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
      )).data;

      if (!data.success) {
        this.authorizationFailure = true;
        this.error = data.error;
      }

      this.loading = false;
      // eslint-disable-next-line
      await new Promise(resolve => setTimeout(resolve, 5000));
      this.$router.push('/');
    }
  }
</script>

<style lang="scss" scoped>
.page {
  margin-top: 150px;
}
</style>
