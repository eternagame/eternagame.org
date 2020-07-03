<template>
  <v-facebook-login @sdk-init="handleSdkInit" :app-id="fbID" @login="fbLogIn()"></v-facebook-login>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  // @ts-ignore
  import VFacebookLogin from 'vue-facebook-login-component';

  @Component({
    components: {
      VFacebookLogin,
    },
  })
  export default class FacebookAuthentication extends Vue {
    private FB = null;

    private fbID = process.env.VUE_APP_FACEBOOK_API_ID;

    async fbLogIn() {
      const data = await this.$vxm.user.fbLogin(this.FB);
      this.$emit('fb-verify', data);
    }

    // @ts-ignore
    handleSdkInit({ FB }) {
      this.FB = FB;
    }
  }
</script>

<style scoped lang="scss">
  .submit-button {
    margin-top: 22.5px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  p {
    font-size: 11.25px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  ::v-deep .modal-header {
    -webkit-backdrop-filter: blur(28.125px);
    backdrop-filter: blur(28.125px);
    background-color: #4a90e2;
    padding: 8.4375px;

    .modal-title {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.38;
      margin: 0 auto;
      padding-left: 28.125px;
    }

    .close {
      opacity: 0.5;
      color: var(--white);
      margin-left: 0;

      &:focus {
        outline: none;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  ::v-deep .modal-dialog {
    max-width: 375px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .modal-body {
      padding: 0 32.8125px;
      margin-top: 22.5px;

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
