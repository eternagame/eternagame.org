<template>
  <EternaPage>
    <div class="overview">
      <h2 class="overview-title">
        Eterna is a citizen science game that recruits players to design RNA molecules for
        biomedical research.
      </h2>
      <h3 class="overview-subtitle text-muted">
        Players and researchers have created original software programs to aid in complex RNA
        design, which are now available for licensing.
      </h3>
      Questions? Contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a>.
    </div>

    <Gallery :sm="12" :md="6">
      <SoftwareCard v-for="project in projects" :key="project.nid" :project="project" />
    </Gallery>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  import SoftwareCard from './components/SoftwareCard.vue';

  export interface SoftwareProject {
    name: string;
    nid: string;
    logo: string;
    description: string;
    thumbnail: string;
    paper_name: string;
    paper_url: string;
    paper_journal: string;
    paper_date: string;
    // HTML string for license. If present, we'll use the license approval flow.
    license_terms?: string;
    // Otherwise, we allow user to download the content immediately.
    download_tooltip?: string;
    download_url?: string;
    help_tooltip?: string;
    help_url?: string;
  }

  const ROUTE = '/get/?type=software_packages';

  @Component({
    components: {
      EternaPage,
      SoftwareCard,
    },
  })
  export default class SoftwareExplore extends Vue {
    projects: SoftwareProject[] = [];

    async mounted() {
      const response = await this.$http.get(ROUTE);
      this.projects = response.data.data;
    }
  }
</script>

<style scoped lang="scss">
  .overview {
    max-width: 820px;
    margin: 2rem;
    margin-bottom: 4rem;
  }

  .overview-title {
    font-size: 1.9rem;
    line-height: 2.5rem;
  }

  .overview-subtitle {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: normal;
  }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }
</style>
