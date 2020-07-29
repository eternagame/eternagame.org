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
      <template v-if="page === 'select'">Choose A License</template>
      <template v-if="page === 'noncommercial'">License Terms</template>
      <template v-if="page === 'commercial'">Request License</template>
      <template v-if="page === 'download'">Available Versions</template>
    </template>

    <a
      v-if="page !== 'select'"
      href="javascript:void(0)"
      @click="page = 'select'"
    >
      <b-icon-chevron-left/> License Options
    </a>

    <div class="content">
      <template v-if="page === 'select'">
        <b-card class="mb-3">
          <div class="d-flex align-items-center">
            <p class="mb-0 mr-4">
              For noncommercial internal research purposes, you can immediately download our software
              after agreeing to the noncommercial license
            </p>
            <b-btn
              variant="primary" class="d-flex align-items-center text-left"
              @click="page = 'noncommercial'"
            >
              Noncommercial License
              <b-icon-chevron-right class="ml-2 mr-n2" aria-hidden="true"/>
            </b-btn>
          </div>
        </b-card>
        <b-card>
          <div class="d-flex align-items-center">
            <p class="mb-0 mr-4">
              For commercial purposes, you can request a license, including royalte-free licenses
              that comply with the <a href="https://opencovidpledge.org/" target="_blank">Open COVID Pledge</a>
            </p>
            <b-btn
              variant="primary" class="d-flex align-items-center text-left"
              @click="page = 'commercial'"
            >
              Commercial License
              <b-icon-chevron-right class="ml-2 mr-n2" aria-hidden="true"/>
            </b-btn>
          </div>
        </b-card>
      </template>
      <template v-if="page === 'noncommercial'">
        <p style="white-space: pre-wrap;" v-dompurify-html="licenseTerms"></p>
      </template>
      <template v-if="page === 'commercial'">
        <p>
          <strong>We can't wait to work with you!</strong> Fill out this form, and we'll get in touch by email
          with further information about our commercial licensing process after you provide some additional
          details about your project.
        </p>
      </template>
      <template v-if="page === 'download'">
        <VersionCard
          v-for="version in softwareVersions"
          :token="token"
          :packageid="packageid"
          :version="version"
          :key="version.version_id"
        />
      </template>
      <template v-if="page === 'thanks'">
        Thank you for your request! You should recieve an automated introductory email from us within a few minutes.
        Please contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a> with any concerns.
      </template>
    </div>

    <template #modal-footer>
      <template v-if="page === 'noncommercial'">
        <b-form @submit.prevent="acceptTerms" class="text-center my-0 mx-auto">
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
      </template>
      <template v-if="page === 'commercial'">
        <b-form @submit.prevent="acceptTerms" class="text-center mt-n4 mx-auto">
          <b-input placeholder="Name" v-model="licenseRequest.name" required />
          <b-input
            type="email"
            :placeholder="$t('register-modal:email')"
            v-model="licenseRequest.email"
            required
          />
          <b-input placeholder="Institution" v-model="licenseRequest.institution" required />
          <b-input placeholder="Position" v-model="licenseRequest.position" required />
          <b-button
            class="accept-button"
            variant="primary"
            type="submit"
            :disabled="showSpinner"
          >
            {{ $t('terms-modal:submit') }}
            <b-spinner v-if="showSpinner" small />
          </b-button>
        </b-form>
      </template>
      <template v-if="page === 'download'">
        <div class="text-right">
          <h3>Thanks, {{ licenseRequest.name }}.</h3>
          <p>
            Your request for a software license has been granted. <br />
            Select the version you would like to download. <br />
          </p>
        </div>
      </template>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue';
  import axios from 'axios';
  import VersionCard from './VersionCard.vue';

  const POST_ROUTE = '/post/';
  const LIST_RELEASES_ROUTE = '/get/?type=software_package_releases';

  export interface SoftwareVersion {
    name: string;
    version_id: string;
    description: string;
    published: string;
    assets: {
      name: string; 
    }[];
  }

  @Component({
    components: {
      VersionCard,
      BIconChevronLeft,
      BIconChevronRight,
    }
  })
  export default class SoftwareLicenseModal extends Vue {
    @Prop({ required: true }) readonly licenseTerms!: string;

    // Unique string used to refer to this popup.
    @Prop({ required: true }) readonly id!: string;

    // The id used by the server to refer to this software package.
    @Prop({ required: true }) readonly packageid!: string;

    private accepted = false;

    private showSpinner = false;

    private page: 'select' | 'noncommercial' | 'commercial' | 'download' | 'thanks' = 'select';

    private token = '';

    // The parameters needed by the server when requesting a new license
    private licenseRequest = {
      name: '',
      email: '',
      institution: '',
      department: '',
      position: '',
    };

    private softwareVersions: SoftwareVersion[] = [];

    async acceptTerms() {
      this.showSpinner = true;
      const licenseResponse = await axios({
        method: 'post',
        url: POST_ROUTE,
        data: new URLSearchParams({
          type: this.page === 'commercial' ?
            'request_software_license_commercial' :
            'request_software_license',
          ...this.licenseRequest,
          packageid: this.packageid,
        }),
      });

      if (this.page === 'commercial') {
        this.page = 'thanks';
      } else {
        this.token = licenseResponse.data.data.token;

        const versionsResponse = await axios({
          method: 'get',
          url: LIST_RELEASES_ROUTE,
          params: {
            packageid: this.packageid,
          },
        });
        this.softwareVersions = versionsResponse.data.data;

        this.page = 'download';
      }

      this.showSpinner = false;
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/_variables.scss';

  ::v-deep .modal-title {
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  ::v-deep .modal-dialog {
    max-width: 675px;
    width: 100%;
  }

  .content {
    padding: 1rem 0;
    max-height: 500px;
    overflow: auto;
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
