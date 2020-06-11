<template>
  <b-modal
    ref="modal"
    :id="id"
    body-class="py-0"
    header-border-variant="primary"
    footer-border-variant="primary"
  >
    <!-- TODO: i18nify -->
    <template #modal-title>
      <b> {{ token ? 'AVAILABLE RELEASES' : 'LICENSE TERMS' }}</b>
    </template>
    <div class="content">
      <div v-if="!token">
        <div style="white-space: pre-wrap;" v-dompurify-html="licenseTerms"></div>
      </div>
      <div v-else class="p-2">
        <VersionCard
          v-for="version in softwareVersions"
          :token="token"
          :packageid="packageid"
          :version="version"
          :key="version.version_id"
        />
      </div>
    </div>
    <template #modal-footer>
      <b-form @submit.prevent="acceptTerms" v-if="!token">
        <b-input placeholder="Name" v-model="licenseRequest.name" required />
        <b-input
          type="email"
          :placeholder="$t('register-modal:email')"
          v-model="licenseRequest.email"
          required
        />
        <b-input placeholder="Institution" v-model="licenseRequest.institution" required />
        <b-input placeholder="Department" v-model="licenseRequest.department" required />
        <b-checkbox class="font-weight-bold" v-model="accepted">
          {{ $t('terms-modal:accept') }}
        </b-checkbox>
        <b-button
          class="accept-button"
          variant="primary"
          type="submit"
          :disabled="!accepted || showSpinner"
        >
          {{ $t('terms-modal:submit') }}
          <b-spinner v-if="showSpinner" small />
        </b-button>
      </b-form>
      <div v-else>
        <h3>Thanks, {{ licenseRequest.name }}.</h3>
        <p>
          Your request for a software license has been granted. <br />
          Select the version you would like to download. <br />
        </p>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';
  import VersionCard from '@/views/software/VersionCard.vue';

  const POST_ROUTE = '/post/';
  const LIST_RELEASES_ROUTE = '/get/?type=software_package_releases';

  export interface SoftwareVersion {
    name: string;
    version_id: string;
    description: string;
    published: string;
    // assets: string[]; // TODO: Or is this an array of typed objects?
  }

  @Component({ components: { VersionCard } })
  export default class SoftwareLicenseModal extends Vue {
    @Prop({ required: true }) readonly licenseTerms!: string;

    // Unique string used to refer to this popup.
    // TODO: Possibly merge with packageid, below.
    @Prop({ required: true }) readonly id!: string;

    // The id used by the server to refer to this software package.
    @Prop({ required: true }) readonly packageid!: string;

    private accepted = false;

    private showSpinner = false;

    private token = '';

    // The parameters needed by the server when requesting a new license
    private licenseRequest = {
      name: '',
      email: '',
      institution: '',
      department: '',
    };

    private softwareVersions: SoftwareVersion[] = [];

    async acceptTerms() {
      this.showSpinner = true;
      const response = await axios({
        method: 'post',
        url: POST_ROUTE,
        data: new URLSearchParams({
          type: 'request_software_license',
          ...this.licenseRequest,
          packageid: this.packageid,
        }),
      });
      await this.fetchVersions();
      this.token = response.data.data.token;
      this.showSpinner = false;
    }

    async fetchVersions() {
      const response = await axios({
        method: 'get',
        url: LIST_RELEASES_ROUTE,
        params: {
          packageid: this.packageid,
        },
      });
      this.softwareVersions = response.data.data;
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
