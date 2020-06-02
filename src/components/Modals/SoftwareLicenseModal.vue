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
      <b> {{ token ? 'CHOOSE VERSION' : 'LICENSE TERMS' }}</b>
    </template>
    <div class="content">
      <div v-if="!token">
        <div v-dompurify-html="licenseTerms"></div>
      </div>
      <div v-else class="p-2">
        <h2>Available Releases</h2>
        <div v-for="version in softwareVersions" :key="version.version_id" class="card mt-3 p-2">
          <h3>{{ version.name }} ({{ version.version_id }})</h3>
          <div class="flex">
            <b-btn
              :disabled="downloading"
              @click="startDownload(version.version_id, 'zip')"
              class="mr-3"
            >
              <b-spinner v-if="downloading" small />
              Download as .zip
            </b-btn>
            <b-btn :disabled="downloading" @click="startDownload(version.version_id, 'tarball')">
              <b-spinner v-if="downloading" small />
              Download as .tarball
            </b-btn>
          </div>
        </div>
      </div>
    </div>
    <template #modal-footer>
      <div v-if="!token">
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
          @click="acceptTerms"
          :disabled="!accepted"
        >
          {{ $t('terms-modal:submit') }}
        </b-button>
      </div>
      <div v-else>
        <h3>Thanks, {{ licenseRequest.name }}.</h3>
        <p>
          Your request for a software license has been granted. <br />
          Select the version you would like to download. <br />
          (Note: Downloads may be >100MB and take a while.)
        </p>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import axios from 'axios';

  const POST_ROUTE = '/post/';
  const LIST_RELEASES_ROUTE = '/get/?type=software_package_releases';
  const DOWNLOAD_SOFTWARE_ROUTE = '/get/?type=software_package_download';

  interface SoftwareVersion {
    name: string;
    version_id: string;
    description: string;
    published: string;
    // assets: string[]; // TODO: Or is this an array of typed objects?
  }

  @Component({})
  export default class SoftwareLicenseModal extends Vue {
    $refs!: {
      modal: BModal;
    };

    @Prop({})
    licenseTerms!: string;

    // Unique string used to refer to this popup.
    // TODO: Possibly merge with packageid, below.
    @Prop({})
    id!: string;

    // The id used by the server to refer to this software package.
    @Prop({})
    packageid!: string;

    private accepted = false;

    private downloading = false;

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

    // Unfortunately we can't just use <a download href="url>...
    async startDownload(versionid: string, asset: string) {
      this.downloading = true;
      const response = await axios({
        method: 'get',
        url: DOWNLOAD_SOFTWARE_ROUTE,
        params: {
          token: this.token,
          packageid: this.packageid,
          versionid,
          asset,
        },
        responseType: 'blob', // Hint axios so we can download the repsonse.
      });

      const filename = this.extractFilenameFromHeader(response.headers['content-disposition']);
      this.saveToFile(response.data, filename, response.headers['content-type']);
      this.downloading = false;
    }

    extractFilenameFromHeader(disposition?: string) {
      if (disposition && disposition.split('filename=').length > 1) {
        return disposition.split('filename=')[1];
      }
      return 'download.zip';
    }

    saveToFile(data: any, filename: string, type: string) {
      const blob = new Blob([data], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }

    async mounted() {
      console.log('mounted');
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
