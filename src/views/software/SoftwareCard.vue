<template>
  <div class="page-content card">
    <div class="container">
      <img class="logo rounded-circle mr-3" :src="`/sites/default/files/${project.logo}`" />

      <h3 class="mb-2">
        {{ project.name }}
      </h3>
      <p class="text">{{ project.description }}</p>

      <div class="">
        <template v-if="project.license_terms">
          <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            @click="$bvModal.show(id)"
            v-b-tooltip.hover.bottom
            title="Request software license"
          >
            <b-icon-download />
            REQUEST
          </b-btn>
          <SoftwareLicenseModal
            :id="id"
            :packageid="packageid"
            :license-terms="project.license_terms"
          />
        </template>
        <template v-else>
          <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            v-b-tooltip.hover.bottom
            :title="project.download_tooltip"
            :href="project.download_url"
          >
            <b-icon-download />
            DOWNLOAD
          </b-btn>
          <b-btn
            type="button"
            class="btn btn-secondary"
            v-b-tooltip.hover.bottom
            :title="project.help_tooltip"
            :href="project.help_url"
          >
            <b-icon-book />
            TUTORIAL
          </b-btn>
        </template>
      </div>

      <div class="row mt-4">
        <div class="col-lg-5 mb-3">
          <a :href="project.paper_url">
            <img
              v-if="project.thumbnail"
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
  import { BIconDownload, BIconBook } from 'bootstrap-vue';
  import SoftwareLicenseModal from '@/components/Modals/SoftwareLicenseModal.vue';
  import { SoftwareProject } from './SoftwareExplore.vue';

  @Component({
    components: { BIconBook, BIconDownload, SoftwareLicenseModal },
  })
  export default class SoftwareCard extends Vue {
    @Prop({ required: true }) readonly project!: SoftwareProject;

    get id() {
      return `software-license-modal-${this.project.nid}`;
    }

    get packageid() {
      return this.project.nid;
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
    margin-bottom: 1.5rem;
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
</style>
