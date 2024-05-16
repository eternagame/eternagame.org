<template>
  <EternaPage>
    <div class="overview">
      <h2 class="overview-title">
        Eterna is an open science platform leading to fundamental advances in RNA biomedical research.
      </h2>
      <h3 class="overview-subtitle text-muted">
        Eterna has created current state-of-the-art technologies to aid in complex RNA design, which are now available for licensing
      </h3>
      Questions? Contact <a href="mailto:licensing@eternagame.org">licensing@eternagame.org</a>.
    </div>

    <div class="masonry">
      <TechCard v-for="project in projects" :key="project.nid" :project="project" />
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  import TechCard from './components/TechCard.vue';

  export interface TechProject {
    name: string;
    nid: string;
    logo: string;
    description: string;
    thumbnail: string;
    paper_name: string;
    paper_url: string;
    paper_journal: string;
    paper_date: string;
    server_tooltip?: string;
    server_url?: string;
    // HTML string for license. If present, we'll use the license approval flow.
    license_terms?: string;
    // Otherwise, we allow user to download the content immediately.
    download_tooltip?: string;
    download_url?: string;
    help_tooltip?: string;
    help_url?: string;
    // This field is now misnamed. It actually refers to licensing status:
    // 0: Normal (license available if license text is provided)
    // 1: Commercial License Unavailable
    // 2: Commercial License Sponsored Research Only
    // 3: Future Technology
    commercial_license_disabled?: "0" | "1" | "2" | "3";
  }

  const ROUTE = '/get/?type=software_packages';

  @Component({
    components: {
      EternaPage,
      TechCard,
    },
  })
  export default class TechExplore extends Vue {
    projects: TechProject[] = [];

    async mounted() {
      const response = await this.$http.get(ROUTE);
      this.projects = response.data.data;
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

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

  .masonry {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-template-rows: masonry;
  }
</style>
