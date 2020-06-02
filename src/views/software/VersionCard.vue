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
        :disabled="showSpinner"
        @click="startDownload(version.version_id, 'zip')"
        class="mr-3"
      >
        {{ showSpinner ? 'DOWNLOADING...' : 'DOWNLOAD' }}
        <b-spinner v-if="showSpinner" small />
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

    showSpinner = false;

    // Which asset to download as.
    asset = 'zip';

    assets = ['zip', 'tarball'];

    // Unfortunately we can't just use <a download href="url>...
    async startDownload(versionid: string, asset: string) {
      this.showSpinner = true;
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
      this.showSpinner = false;
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
