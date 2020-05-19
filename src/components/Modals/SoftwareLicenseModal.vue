<template>
  <b-modal
    ref="modal"
    id="software-license-modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <!-- TODO: i18nify -->
    <template #modal-title>
      <b>LICENSE TERMS</b>
    </template>
    <div class="content">
      <h3 class="p-2 mt-3 mb-0">{{ $t('terms-modal:eula') }}</h3>
      <TermsAndConditionsText />
    </div>
    <template #modal-footer>
      <div v-if="!signed">
        <b-input placeholder="Name" v-model="name" required />
        <b-input type="email" :placeholder="$t('register-modal:email')" v-model="email" required />
        <b-checkbox class="font-weight-bold" v-model="accepted">
          {{ $t('terms-modal:accept') }}
        </b-checkbox>
        <b-button
          class="accept-button"
          variant="primary"
          @click="acceptTerms"
          :disabled="!accepted"
        >
          {{ $t('terms-modal:submit') }}
        </b-button>
      </div>
      <div v-else>
        <h3>Thanks, {{ name }}.</h3>
        <p>
          Your license request has been sent to Rhiju Das (rhiju@stanford.edu). You will receive a
          confirmation at your email ({{ email }}) when it has been approved.
        </p>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';
  import TermsAndConditionsText from '@/views/terms/TermsAndConditionsText.vue';

  const ROUTE = '/post/';

  @Component({
    components: { TermsAndConditionsText },
  })
  export default class SoftwareLicenseModal extends Vue {
    errorMessage: string = '';

    $refs!: {
      modal: BModal;
    };

    private accepted: boolean = false;

    private signed: boolean = false;

    private name!: string;

    private email!: string;

    acceptTerms() {
      this.signed = true;
      // if (this.status) {
      //   axios.post(
      //     ROUTE,
      //     new URLSearchParams({
      //       type: 'survey',
      //       action: 'update',
      //       value: 'EULA_AGREE',
      //       uid: String(this.$vxm.user.uid),
      //     }),
      //   );
      // }
      // this.$refs.modal.hide();
    }
  }
</script>

<style scoped lang="scss">
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  ::v-deep .modal-dialog {
    max-width: 675px;
    width: 100%;
  }

  .content {
    height: 500px;
    overflow: auto;
  }

  ::v-deep .modal-footer {
    margin: 0 auto;
    text-align: center;
  }

  .accept-button {
    margin-top: 1rem;
    font-size: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-transform: uppercase;
  }

  /* Following styles are copied from LoginModal */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
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
</style>
