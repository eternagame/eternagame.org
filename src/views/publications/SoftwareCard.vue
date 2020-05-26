<template>
  <div class="page-content card">
    <div class="container">
      <img class="logo rounded-circle mr-3" :src="project.logoUrl" />

      <h3 class="mb-2">
        {{ project.title }}
      </h3>
      <p class="text">{{ project.description }}</p>

      <div class="">
        <template v-if="project.licenseTerms">
          <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            v-b-modal.software-license-modal
            v-b-tooltip.hover.bottom
            title="Request software license"
          >
            <b-icon-download />
            REQUEST
          </b-btn>
        </template>
        <template v-else>
          <b-btn
            type="button"
            class="btn btn-primary mt-3 mr-3 mb-3"
            v-b-tooltip.hover.bottom
            :title="project.downloadTooltip"
            :href="project.downloadUrl"
          >
            <b-icon-download />
            DOWNLOAD
          </b-btn>
          <b-btn
            type="button"
            class="btn btn-secondary"
            v-b-tooltip.hover.bottom
            :title="project.helpTooltip"
            :href="project.helpUrl"
          >
            <b-icon-book />
            TUTORIAL
          </b-btn>
        </template>
      </div>

      <div class="row mt-4">
        <div class="col-lg-5 mb-3">
          <a :href="project.paperUrl">
            <img v-if="project.thumbnailUrl" class="thumbnail" :src="project.thumbnailUrl" />
          </a>
        </div>
        <div class="col-lg-7 text">
          <h3 class="paper-title">
            <a :href="project.paperUrl">
              {{ project.paperTitle }}
            </a>
          </h3>
          <p class="text-muted">{{ project.journal }} - {{ project.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BIconDownload, BIconBook } from 'bootstrap-vue';
  import { SoftwareProject } from './SoftwareExplore.vue';

  @Component({
    components: { BIconBook, BIconDownload },
  })
  export default class SoftwareCard extends Vue {
    @Prop() private project!: SoftwareProject;
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
