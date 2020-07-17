<template>
  <div class="card p-3">
    <h3>
      {{ version.name }}
    </h3>
    <div class="row mt-2">
      <div class="col-7">
        <p style="white-space: pre-line;">{{ version.description }}</p>
        <p class="version-info mb-0">
          Version {{ version.version_id }}, published {{ version.published.split('T')[0] }}
        </p>
      </div>
      <div class="col" style="position: relative;">
        <p class="download mb-1">
          <b-button variant="primary" class="mr-2 d-inline" target="_blank" :href="downloadLink">
            DOWNLOAD
          </b-button>
          as
          <b-form-select class="select-asset" v-model="asset" :options="assets" size="sm" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { SoftwareVersion } from './SoftwareLicenseModal.vue';

  const DOWNLOAD_SOFTWARE_ROUTE = '/get/?type=software_package_download';

  @Component({})
  export default class VersionCard extends Vue {
    @Prop({ required: true }) readonly version!: SoftwareVersion;

    @Prop({ required: true }) readonly token!: string;

    @Prop({ required: true }) readonly packageid!: string;

    // Which asset to download as.
    asset = 'zip';

    assets = ['zip', 'tarball'];

    get downloadLink() {
      return `${process.env.VUE_APP_API_BASE_URL}/get/?type=software_package_download&token=${this.token}&packageid=${this.packageid}&asset=${this.asset}&versionid=${this.version.version_id}`;
    }
  }
</script>

<style lang="scss" scoped>
  .version-info {
    color: grey;
  }

  .download {
    position: absolute;
    bottom: 0;
    right: 1rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  .select-asset {
    color: white;
    display: inline-block;
    width: 80px;
  }
</style>
