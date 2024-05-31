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
            <p class="mb-0 mr-4" v-if="licenseStatus === '3'">
              For noncommercial purposes, including sponsored research and collaborations, you can sign up to be notified when this
              technology is available for download
            </p>
            <p class="mb-0 mr-4" v-else>
              For noncommercial purposes, including sponsored research and collaborations, you can immediately download our technology
              after agreeing to the noncommercial license
            </p>
            <b-btn
              variant="primary" class="d-flex align-items-center text-left"
              @click="page = licenseStatus === '3' ? 'noncommercial-future' : 'noncommercial'"
            >
              Noncommercial License
              <b-icon-chevron-right class="ml-2 mr-n2" aria-hidden="true"/>
            </b-btn>
          </div>
        </b-card>
        <b-card>
          <div class="d-flex align-items-center">
            <p class="mb-0 mr-4" v-if="licenseStatus === '1'">
              Commercial licenses for this package are currently unavailable. For questions, please
              contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a>.
            </p>
            <p class="mb-0 mr-4" v-else-if="licenseStatus === '2'">
              Commercial licenses for this package or derived products are currently unavailable,
              except through sponsored research. Get in touch for more details
            </p>
            <p class="mb-0 mr-4" v-else-if="licenseStatus === '3'">
              For commercial purposes, you can sign up to be notified when this technology is available
              for licensing
            </p>
            <p class="mb-0 mr-4" v-else>
              For commercial purposes, you can request a license
            </p>
            <b-btn
              variant="primary" class="d-flex align-items-center text-left"
              @click="page = 'commercial'"
              :disabled="licenseStatus === '1'"
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
      <template v-if="page === 'noncommercial-future'">
        <p>
          <strong>We're excited to provide you with this technology!</strong> Fill out this form, and we'll
          get in touch by email once it is available to download.
        </p>
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
          v-for="version in techVersions"
          :token="token"
          :packageid="packageid"
          :version="version"
          :key="version.version_id"
        />
      </template>
      <template v-if="page === 'error'">
        <b-alert variant="danger" show>{{ error }}</b-alert>
        Please contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a> for assistance.
      </template>
      <template v-if="page === 'thanks'">
        Thank you for your request! You should receive an automated introductory email from us within a few minutes.
        Please contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a> with any questions or concerns.
      </template>
      <template v-if="page === 'noncommercial-future-thanks'">
        Thank you for your request! We've sent you a confirmation email and we'll reach out once this
        technology is available. Please contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a>
        with any questions or concerns.
      </template>
    </div>

    <template #modal-footer>
      <template v-if="page === 'noncommercial'">
        <b-form @submit.prevent="submitRequest" class="text-center my-0 mx-auto">
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
        <b-form @submit.prevent="submitRequest" class="text-center mt-n4 mx-auto">
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
      <template v-if="page === 'noncommercial-future'">
        <b-form @submit.prevent="submitRequest" class="text-center my-0 mx-auto">
          <b-input placeholder="Name" v-model="licenseRequest.name" required />
          <b-input
            type="email"
            :placeholder="$t('register-modal:email')"
            v-model="licenseRequest.email"
            required
          />
          <b-input placeholder="Institution" v-model="licenseRequest.institution" required />
          <b-input placeholder="Department" v-model="licenseRequest.department" required />
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
            Your request for a license has been granted. <br />
            Select the version you would like to download. <br />
          </p>
        </div>
      </template>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue';
  import axios from 'axios';
  import VersionCard from './VersionCard.vue';

  const POST_ROUTE = '/post/';
  const LIST_RELEASES_ROUTE = '/get/?type=software_package_releases';

  export interface TechVersion {
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
  export default class TechLicenseModal extends Vue {
    @Prop({ required: true }) readonly licenseTerms!: string;

    // Unique string used to refer to this popup.
    @Prop({ required: true }) readonly id!: string;

    // The id used by the server to refer to this tech package.
    @Prop({ required: true }) readonly packageid!: string;

    @Prop({ required: true }) readonly licenseStatus?: "0" | "1" | "2" | "3";

    accepted = false;

    showSpinner = false;

    page: 'select' | 'noncommercial' | 'noncommercial-future' | 'commercial' | 'download' | 'thanks' | 'noncommercial-future-thanks' | 'error' = 'select';

    token = '';

    error = '';

    // The parameters needed by the server when requesting a new license
    licenseRequest = {
      name: '',
      email: '',
      institution: '',
      department: '',
      position: '',
    };

    techVersions: TechVersion[] = [];

    async submitRequest() {
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

      const err = licenseResponse.data.data?.error;
      if (err) {
        this.error = err;
        this.page = 'error';
      } else if (this.page === 'commercial') {
        this.page = 'thanks';
      } else if (this.page === 'noncommercial-future') {
        this.page = 'noncommercial-future-thanks';
      }
      else {
        this.token = licenseResponse.data.data.token;

        const versionsResponse = await axios({
          method: 'get',
          url: LIST_RELEASES_ROUTE,
          params: {
            packageid: this.packageid,
          },
        });
        this.techVersions = versionsResponse.data.data;

        this.page = 'download';
      }

      this.showSpinner = false;
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/_variables.scss';

  :deep(.modal-title) {
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  :deep(.modal-dialog) {
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
