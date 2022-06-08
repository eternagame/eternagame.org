<template>
  <div>
    <h4 style="font-weight:bold">{{ $t('edit-profile:danger-zone') }}</h4>
    <b-btn variant="danger" @click="$bvModal.show('account-delete')">Delete Account</b-btn>
    <b-modal
      id="account-delete"
      hide-footer
      size="xl"
      centered
      header-border-variant="primary"
      body-class="py-0"
    >
      <template #modal-title>
        <b>Are you sure you want to delete your account?</b>
      </template>
      <p>
        We're sorry to hear that you're leaving us! Something wrong that we can help with?
        Please get in touch at <a href="mailto:support@eternagame.org">support@eternagame.org</a>.
      </p>
      <p>
        Your account will be deactivated and scheduled to be deleted in 30 days.
        Per our privacy policy found at <a href="https://eternagame.org/terms">https://eternagame.org/terms</a>,
        your identifying information will be removed and your contributions will be anonymized
        (though we cannot retroactively remove names that may have been included in
        scientific publications). If you have used our forum, you will also need to separately
        delete your forum account at <a href="https://forum.eternagame.org/">https://forum.eternagame.org/</a>.
      </p>
      <p>
        Thank you for joining us on our mission to advance science! To confirm you want to delete
        your account, please enter your username and password below and click delete.
      </p>
      <b-form>
        <b-input
          type="text"
          placeholder="Username"
          v-model="username"
          required
        />
        <b-input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <transition name="fade">
          <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
            {{ errorMessage }}
          </b-alert>
        </transition>
        <b-btn variant="danger" @click="deleteAccount()" :disabled="loading">
          Delete Account
          <b-spinner v-if="loading" small />
        </b-btn>
        <b-button
          style="margin-left:10px"
          variant="secondary"
          @click="$bvModal.hide('account-delete')"
        >
          Cancel
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class EditPlayerDanger extends Vue {
    private loading = false;

    private username = '';

    private password = '';

    private errorMessage = '';

    async deleteAccount() {
      this.errorMessage = '';

      if (!this.username) {
        this.errorMessage = 'Please enter your username';
        return;
      }

      if (!this.password) {
        this.errorMessage = 'Please enter your password';
        return;
      }

      if (this.username !== this.$vxm.user.username) {
        this.errorMessage = 'This is not your current username';
        return;
      }

      this.loading = true;

      const { data } = (await this.$http.post('/login/', new URLSearchParams({
        type: 'delete',
        pass: this.password
      }))).data;

      if (data.success) {
        await this.$vxm.user.logout();
        await this.$router.push('/');
      } else {
        this.errorMessage = data.error;
      }

      this.loading = false;
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  ::v-deep .modal-dialog {
    max-width: 600px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .modal-body {
      padding: 0 32.8125px;
      margin: 22.5px 0;

      .login_modal_content {
        display: flex;
        flex-direction: column;
        margin-bottom: 12.1875px;

        .form-control {
          width: 100%;
          height: 40.3125px;
          margin: 0 auto 13.125px;
          border-radius: 4.6875px;
          opacity: 0.5;
          border: solid 1.0005px var(--white);
          background-color: #000000;
        }

        .custom-input-group {
          position: relative;
        }

        .custom-input-group {
          span {
            position: absolute;
            top: 9.375px;
            right: 11.25px;
          }

          .lock {
            right: 15.9375px;
          }
        }

        .submit-button {
          width: 173.4375px;
          height: 40.3125px;
          margin: 0 auto 15.9375px;
          font-size: 16.875px;
          font-weight: bold;
          line-height: 1.33;
        }

        p {
          font-size: 11.25px;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
</style>
