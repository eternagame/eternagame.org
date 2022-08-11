<template>
  <div class="page">
    <div class="container">
      <div class="card mx-auto" style="max-width: 30rem; background-color: #21508c;">
        <div class="card-body">
          <h5 class="card-title">Update Email Preferences</h5>
          <div class="alert alert-danger" v-if="error">{{error}}</div>
          <div class="alert alert-success" v-if="success">Preferences updated successfully</div>
          <div id="authorizing" v-if="loading">
            <div style="text-align:center;"><img src="/puzzle-progression/images/loading.gif"></div>
            <p class="card-text" style="text-align: center;">
              Authorizing...
            </p>
          </div>
          <b-form @submit.prevent="doUpdate" v-else-if="!authorizationFailure">
            <div class="form-group">
              <section style="margin-top: 20px;" v-for="(subscription, username) in subscriptions" :key="username">
                <h6>{{username}}</h6>
                <b-form-checkbox v-model="subscriptions[username].message">
                  <b>{{ $t('edit-profile:email-private-messages') }}</b>
                </b-form-checkbox>
                <b-form-checkbox style="margin-top:15px" v-model="subscriptions[username].news">
                  <b>{{ $t('edit-profile:email-news-posts') }}</b>
                </b-form-checkbox>
              </section>
              <b-btn type="submit" class="btn btn-primary mt-3" :disabled="updating">
                Update Preferences
                <b-spinner v-if="updating" small />
              </b-btn>
              <b-btn variant="secondary" class="mt-3 mx-2" @click="unsubscribeAll" :disabled="updating">
                Unsubscribe All
                <b-spinner v-if="updating" small />
              </b-btn>
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

    updating: boolean = false;

    success: boolean = false;

    subscriptions: Record<string, {
      message: boolean;
      news: boolean;
      token: string;
    }> = {};

    // TODO: Rewrite for SSR?
    async mounted() {
      const {token, for: forUser} = this.$route.query;

      if (typeof token !== 'string' || typeof forUser !== 'string') {
        this.error = 'We couldn\'t verify this subscription update request. Please contact support@eternagame.org for assistance';
        this.loading = false;
        this.authorizationFailure = true;
        return;
      }

      const {data} = (await this.$http.post(
        '/login/',
        new URLSearchParams({ type: 'subscription_status', token, for: forUser }),
        { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
      )).data;

      if (!data.success) {
        this.authorizationFailure = true;
        this.error = data.error;
      }

      Object.entries(data.subscriptions).forEach(([username, subscription]: [string, any]) => {
        this.subscriptions[username] = {
          message: subscription.profile_mail_notification === 'on',
          news: subscription.profile_news_mail_notification === 'on',
          token: subscription.token
        };
      });

      this.loading = false;
    }

    async doUpdate() {
      this.error = '';
      this.updating = true;
      this.success = false;

      try {
        await Promise.all(Object.entries(this.subscriptions).map(async ([username, subscription]) => {
          const {data} = (await this.$http.post(
            '/login/',
            new URLSearchParams({
              type: 'subscription_update',
              token: subscription.token,
              for: username,
              profile_mail_notification: subscription.message ? 'on' : 'off',
              profile_news_mail_notification: subscription.news ? 'on' : 'off'
            }),
            { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
          )).data;

          if (!data.success) throw new Error(data.error);
        }));
        this.success = true;
      } catch (e) {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = `${e}`;
        }
      }

      this.updating = false;
    }

    async unsubscribeAll() {
      Object.keys(this.subscriptions).forEach(username => {
        this.subscriptions[username].message = false;
        this.subscriptions[username].news = false;
      });
      await this.doUpdate();
    }
  }
</script>

<style lang="scss" scoped>
.page {
  margin-top: 150px;
}
</style>
