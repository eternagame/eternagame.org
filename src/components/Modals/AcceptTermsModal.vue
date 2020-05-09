<template>
  <b-modal
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <template #modal-title>
      <b>{{ $t('terms:title-short').toUpperCase() }}</b>
    </template>
    <div class="content">
      <h3 class="p-2 mt-3 mb-0">{{ $t('terms-modal:eula') }}</h3>
      <TermsAndConditionsText />
    </div>
    <template #modal-footer>
      <div>
        <b-checkbox class="font-weight-bold" v-model="status">
          {{ $t('terms-modal:accept') }}
        </b-checkbox>
        <b-button class="accept-button" variant="primary" @click="acceptTerms">
          {{ $t('terms-modal:submit') }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';
  import TermsAndConditionsText from '@/views/terms/TermsAndConditionsText.vue';

  const ROUTE = '/post/?type=survey&action=update&value=EULA_Agree&uid=';

  @Component({
    components: { TermsAndConditionsText },
  })
  export default class AcceptTermsModal extends Vue {
    errorMessage: string = '';

    $refs!: {
      modal: BModal;
    };

    private status: boolean = false;

    mounted() {
      console.log(this.$vxm.user.userDetails);
      if (this.$vxm.user.loggedIn && !this.$vxm.user.userDetails.Survey.includes('EULA_Agree')) {
        this.$refs.modal.show();
      }
    }

    acceptTerms() {
      if (this.status) axios.post(ROUTE + this.$vxm.user.uid);
      this.$refs.modal.hide();
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
