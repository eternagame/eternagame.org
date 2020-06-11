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
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';

  @Component({
    components: {},
  })
  export default class ResetCompleteModal extends Vue {
    errorMessage: string = '';

    @Ref() readonly modal!: BModal;

    created() {
      this.$vxm.user.$subscribe('showResetCompleteModal', payload => {
        this.modal.show();
      });
    }

    hideModal() {
      this.modal.hide();
    }
  }
</script>

<style scoped lang="scss"></style>
