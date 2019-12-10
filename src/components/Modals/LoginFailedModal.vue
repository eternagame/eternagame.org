<template>
  <b-modal ref="modal" body-class="py-0"
           header-border-variant="primary"
           footer-border-variant="primary">
    <template #modal-title>
      <b>Something's wrong...</b>
    </template>
    Sorry, there was a problem loading you in.
    <b-alert class="mt-3" show variant="danger">{{errorMessage}}</b-alert>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">Close</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';

  @Component({
    components: {

    },
  })
  export default class LoginFailedModal extends Vue {
    errorMessage: string = '';

    $refs!: {
      modal: BModal
    };

    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'showLoginFailedModal') {
          this.errorMessage = mutation.payload.errorMessage;
          this.$refs.modal.show();
        }
      });
    }

    hideModal() {
      this.$refs.modal.hide();
    }
  }
</script>

<style scoped lang="scss">
</style>
