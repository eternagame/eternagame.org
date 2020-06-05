<template>
  <b-modal
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <template #modal-title>
      <b>{{ $t('login-failed:failure-text') }}</b>
    </template>
    {{ $t('login-failed:failure-text-description') }}
    <b-alert class="mt-3" show variant="danger">{{ errorMessage }}</b-alert>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal" v-b-modal.modal-login>Close</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';

  @Component({
    components: {},
  })
  export default class LoginFailedModal extends Vue {
    errorMessage: string = '';

    $refs!: {
      modal: BModal;
    };

    created() {
      this.$vxm.user.$subscribe('showLoginFailedModal', payload => {
        this.errorMessage = payload.errorMessage;
        this.$refs.modal.show();
      });
    }

    hideModal() {
      this.$refs.modal.hide();
    }
  }
</script>

<style scoped lang="scss"></style>
