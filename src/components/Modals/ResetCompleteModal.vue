<template>
  <b-modal
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <template #modal-title>
      <b>{{ $t('reset-complete:title') }}</b>
    </template>
    {{ $t('reset-complete:explanation') }}
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">{{
        $t('reset-complete:secondary-action')
      }}</b-button>
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
      this.$vxm.user.$subscribe('showResetCompleteModal', payload => {
        this.$refs.modal.show();
      });
    }

    hideModal() {
      this.$refs.modal.hide();
    }
  }
</script>

<style scoped lang="scss"></style>
