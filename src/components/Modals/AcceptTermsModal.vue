<template>
  <b-modal
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <template #modal-title>
      <b class="text-uppercase">{{ $t('terms:title-short') }}</b>
    </template>
    <div class="content">
      <h3 class="p-2 mt-3 mb-0">{{ $t('terms-modal:eula') }}</h3>
      <TermsAndConditionsText />
    </div>
    <template #modal-footer>
      <div>
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
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';
  import TermsAndConditionsText from '@/views/terms/TermsAndConditionsText.vue';

  const ROUTE = '/post/';

  @Component({
    components: { TermsAndConditionsText },
  })
  export default class AcceptTermsModal extends Vue {
    errorMessage: string = '';

    @Ref() readonly modal!: BModal;

    private accepted: boolean = false;

    mounted() {
      const surveyValue = this.$vxm.user.loggedIn && this.$vxm.user.userDetails?.Survey;
      if (surveyValue && !surveyValue.includes('EULA_Agree') && surveyValue !== 'Yes') {
        this.modal.show();
      }
    }

    acceptTerms() {
      if (this.accepted) {
        axios.post(
          ROUTE,
          new URLSearchParams({
            type: 'survey',
            action: 'update',
            value: 'EULA_AGREE',
            uid: String(this.$vxm.user.uid),
          }),
        );
      }
      this.modal.hide();
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
