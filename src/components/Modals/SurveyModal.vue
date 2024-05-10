<template>
  <b-modal
    header-border-variant="primary"
    footer-border-variant="primary"
    centered
    v-model="shown"
  >
    <template #modal-title>
      Who Are We?
    </template>
    <div>
      Did you know the last time we surveyed player demographics was in
      <router-link to="/news/6163840">2015</router-link>?
      Help us understand who we are by participating in our newly revised survey!
      Results of the Eterna Player Profile Survey will be shared with the Eterna
      community.
    </div>
    <div style="text-align: center;">
      <br/>
      The survey will close Sunday, May 14th.
      <br/>
      Would you like to participate?
    </div>
    <template #modal-footer>
      <div class="d-flex" style="gap: 10px;">
        <b-button variant="primary" @click="handleYes">Yes</b-button>
        <b-button variant="danger" @click="handleNo">No</b-button>
        <b-button variant="secondary" @click="handleLater">Remind me later</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';

  const ROUTE = '/post/';

  @Component({})
  export default class AcceptTermsModal extends Vue {
    get shown() {
      if (this.$vxm.user.userDetailsLoaded) {
        if (Date.now() > Date.UTC(2023, 4, 15, 12, 0)) return false;
        const entries = this.$vxm.user.surveyRecord.split(',');
        if (entries.includes('DIV_SURVEY_2023_DISMISSED')) return false;
        const delays = entries
          .filter(entry => entry.startsWith('DIV_SURVEY_2023_DELAY:'))
          .map(entry => parseInt(entry.split(':')[1], 10))
          .filter(delay => !Number.isNaN(delay));
        return Math.max(...delays) < Date.now();
      }
      return false;
    }

    async handleYes() {
      // Note: $vxm.user.surveyRecord won't update until the next page RELOAD, since that's the
      // only time it gets set. This should be fine though, as we only open this modal on mounted
      // and that happens at page load
      await axios.post(
        ROUTE,
        new URLSearchParams({
          type: 'survey',
          action: 'update',
          value: 'DIV_SURVEY_2023_DISMISSED',
          uid: String(this.$vxm.user.uid),
        }),
      );
      // To reload user profile
      await this.$vxm.user.authenticate();
      window.open('https://stanfordmedicine.qualtrics.com/jfe/form/SV_26otHCclO1zC850', '_blank');
    }

    async handleNo() {
      // Note: $vxm.user.surveyRecord won't update until the next page RELOAD, since that's the
      // only time it gets set. This should be fine though, as we only open this modal on mounted
      // and that happens at page load
      await axios.post(
        ROUTE,
        new URLSearchParams({
          type: 'survey',
          action: 'update',
          value: 'DIV_SURVEY_2023_DISMISSED',
          uid: String(this.$vxm.user.uid),
        }),
      );
      // To reload user profile
      await this.$vxm.user.authenticate();
    }

    async handleLater() {
      // Note: $vxm.user.surveyRecord won't update until the next page RELOAD, since that's the
      // only time it gets set. This should be fine though, as we only open this modal on mounted
      // and that happens at page load
      await axios.post(
        ROUTE,
        new URLSearchParams({
          type: 'survey',
          action: 'update',
          value: `DIV_SURVEY_2023_DELAY:${Date.now() + (1000 * 60 * 60 * 24)}`,
          uid: String(this.$vxm.user.uid),
        }),
      );
      // To reload user profile
      await this.$vxm.user.authenticate();
    }
  }
</script>

<style scoped lang="scss">
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  :deep(.modal-footer) {
    margin: 0 auto;
    text-align: center;
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

  :deep(.modal-header) {
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
