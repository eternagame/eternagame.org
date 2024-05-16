<template>
  <div class="page-content card">
    <a :href="editURL" class="edit-link" v-if="showEdit">Edit</a>
    <div class="container">
      <img alt="" class="logo mr-3" style="border:0;" :src="`/sites/default/files/${project.logo}`" />

      <h3 class="mb-2">
        {{ project.name }}
      </h3>
      <p class="text">{{ project.description }}</p>

      <div class="">
        <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            v-b-tooltip.hover.bottom
            :title="project.server_tooltip"
            :href="project.server_url"
            v-if="project.server_url"
        >
          <b-icon-hdd-stack />
          SERVER
        </b-btn>
        <template v-if="project.license_terms || project.commercial_license_disabled === '3'">
          <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            @click="$bvModal.show(id)"
            v-b-tooltip.hover.bottom
            title="Request license"
          >
            <b-icon-download />
            REQUEST LICENSE
          </b-btn>
          <TechLicenseModal
            :id="id"
            :packageid="packageid"
            :license-terms="project.license_terms"
            :licenseStatus="project.commercial_license_disabled"
          />
        </template>
        <b-btn
          type="button"
          class="btn btn-primary mt-3 mr-3 mb-3"
          v-b-tooltip.hover.bottom
          :title="project.download_tooltip"
          :href="project.download_url"
          v-if="project.download_url"
        >
          <b-icon-download />
          DOWNLOAD
        </b-btn>
        <b-btn
            type="button"
            class="btn btn-secondary mt-3 mr-3 mb-3"
            v-b-tooltip.hover.bottom
            :title="project.help_tooltip"
            :href="project.help_url"
            v-if="project.help_url"
        >
          <b-icon-book />
          TUTORIAL
        </b-btn>
      </div>

      <div class="row mt-4">
        <div class="col-lg-5 mb-3">
          <a :href="project.paper_url">
            <img
              v-if="project.thumbnail"
              alt="Publication"
              class="thumbnail"
              :src="`/sites/default/files/${project.thumbnail}`"
            />
          </a>
        </div>
        <div class="col-lg-7 text">
          <h3 class="paper-title">
            <a :href="project.paper_url">
              {{ project.paper_name }}
            </a>
          </h3>
          <p class="text-muted">{{ project.paper_journal }} - {{ project.paper_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BIconDownload, BIconBook, BIconHddStack } from 'bootstrap-vue';
  import TechLicenseModal from './TechLicenseModal.vue';
  import { TechProject } from '../TechExplore.vue';

  @Component({
    components: { BIconBook, BIconDownload, BIconHddStack, TechLicenseModal },
  })
  export default class TechCard extends Vue {
    @Prop({ required: true }) readonly project!: TechProject;

    get id() {
      return `tech-license-modal-${this.project.nid}`;
    }

    get packageid() {
      return this.project.nid;
    }

    get showEdit() {
      return this.$vxm.user.isAdmin;
    }

    get editURL() {
      return `${process.env.VUE_APP_API_BASE_URL}/node/${this.packageid}/edit`;
    }
  }
</script>

<style lang="scss" scoped>
  .paper-title {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .thumbnail {
    max-width: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5), 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .card {
    padding: 2rem 1rem;
  }

  .logo {
    float: left;
    width: 64px;
    height: 64px;
    object-fit: scale-down;
    border: 2px solid grey;

    transition: ease 0.5s;
  }
  .logo:hover {
    transform: rotateY(180deg);
  }

  .edit-link {
    position: absolute;
    top: 5px;
    right: 15px;
  }
</style>
