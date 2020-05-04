<template>
  <b-modal
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <template #modal-title>
      <b>{{ $t('terms:title-short') }}</b>
    </template>
    <div class="content">
      <h3>{{ $t('terms-modal:eula') }}</h3>
      <TermsAndConditionsText />
    </div>
    <template #modal-footer>
      <b-checkbox v-model="status">
        {{ $t('terms-modal:accept') }}
      </b-checkbox>
      <b-button variant="primary" @click="acceptTerms">{{ $t('terms-modal:submit') }}</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';
  import TermsAndConditionsText from '@/views/terms/TermsAndConditionsText.vue';

  const ROUTE = '/post/?type=survey&value=true&uid=';

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
      if (!this.$vxm.user.userDetails.Survey.includes('EULA_Agree')) this.$refs.modal.show();
    }

    acceptTerms() {
      if (this.status) axios.post(ROUTE + this.$vxm.user.uid);
      this.$refs.modal.hide();
    }
  }
</script>

<style scoped lang="scss">
  .content {
    height: 500px;
    overflow: scroll;
  }
</style>
