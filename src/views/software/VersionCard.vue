<template>
  <div class="card mt-3 mr-2 p-3">
    <h3>{{ version.name }}</h3>
    <p class="">
      Version: {{ version.version_id }}<br />
      Published: {{ version.published }}<br />
      Download as:
      <b-form-select class="select-asset" v-model="asset" :options="assets" size="sm" />
    </p>
    <div class="flex">
      <b-button
        variant="primary"
        class="mr-3"
        target="_blank"
        :href="downloadLink"
      >
        DOWNLOAD
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';

  import { SoftwareVersion } from '../../components/Modals/SoftwareLicenseModal.vue';

  const DOWNLOAD_SOFTWARE_ROUTE = '/get/?type=software_package_download';

  @Component({})
  export default class VersionCard extends Vue {
    @Prop({})
    version!: SoftwareVersion;

    @Prop({})
    token!: string;

    @Prop({})
    packageid!: string;

    // Which asset to download as.
    asset = 'zip';

    assets = ['zip', 'tarball'];

    get downloadLink() {
      return `${process.env.VUE_APP_API_BASE_URL}/get/?type=software_package_download&token=${this.token}&packageid=${this.packageid}&asset=${this.asset}&versionid=${this.version.version_id}`;
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
  }
</script>

<style lang="scss" scoped>
  .select-asset {
    color: white;
    display: inline;
    width: 100px;
  }
</style>
