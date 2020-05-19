<template>
  <div class="page-content card">
    <div class="container">
      <h3 class="card-title mb-2">
        <a :href="project.paperUrl">{{ project.title }}</a>
      </h3>
      <div class="text">{{ project.description }}</div>

      <div class="mt-3 mb-3">
        <button type="button" class="btn btn-primary mr-3">
          <b-icon-download />
          DOWNLOAD
        </button>
        <button type="button" class="btn btn-secondary">
          <b-icon-book />
          TUTORIAL
        </button>
      </div>

      <div class="row mt-3">
        <div class="col-5">
          <img v-if="project.thumbnailUrl" class="thumbnail" :src="project.thumbnailUrl" />
        </div>
        <div class="col-7 text">
          <h3 class="card-title mb-2">
            <a :href="project.paperUrl">
              {{ project.paperTitle }}
            </a>
          </h3>
          <p>{{ project.journal }} - {{ project.date }}</p>
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
  .card-title a {
    color: white;
  }

  .card-title {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .thumbnail {
    max-width: 100%;
  }

  .card {
    padding: 2rem 1rem;
    margin-bottom: 1.5rem;
  }
</style>
