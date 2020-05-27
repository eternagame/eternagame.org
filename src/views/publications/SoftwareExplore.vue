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
    </div>

    <Gallery :sm="12" :md="6">
      <SoftwareCard v-for="project in projects" :key="project.title" :project="project" />
    </Gallery>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  // Assets need to be imported; can't hardcode '@/assets/...'
  import EternaBrainLogo from '@/assets/software/logo_eternabrain.svg';
  import EternaBrainThumbnail from '@/assets/software/thumb_eternabrain_paper.png';
  import NemoLogo from '@/assets/software/logo_nemo.svg';
  import NemoThumbnail from '@/assets/software/thumb_nemo_paper.png';
  import EternaBotLogo from '@/assets/software/logo_eternabot.svg';
  import EternaBotThumbnail from '@/assets/software/thumb_eternabot_paper.jpg';
  import SentRNALogo from '@/assets/software/logo_sentrna.svg';
  import SentRNAThumbnail from '@/assets/software/thumb_sentrna_paper.png';
  import RNAMakeLogo from '@/assets/software/logo_rnamake.svg';
  import RNAMakeThumbnail from '@/assets/software/thumb_rnamake_paper.png';

  import SoftwareCard from './SoftwareCard.vue';

  export interface SoftwareProject {
    title: string;
    logoUrl: string;
    description: string;
    thumbnailUrl: string;
    paperTitle: string;
    paperUrl: string;
    journal: string;
    date: string;
    // HTML string for license. If present, we'll use the license approval flow.
    licenseTerms?: string;
    // Otherwise, we allow user to download the content immediately.
    downloadTooltip?: string;
    downloadUrl?: string;
    helpTooltip?: string;
    helpUrl?: string;
  }

  const projects: SoftwareProject[] = [
    {
      title: 'EternaBrain',
      logoUrl: EternaBrainLogo,
      description:
        'The Eterna project has collected over 1 million player moves by crowdsourcing RNA designs in the form of puzzles that reach extraordinary difficulty. EternaBrain is a multilayer convolutional neural network trained on this player data, which surpasses all six other prior algorithms that were not informed by Eterna strategies and suggests a path for automated RNA design to achieve human-competitive performance.',
      thumbnailUrl: EternaBrainThumbnail,
      paperTitle:
        'EternaBrain: Automated RNA design through move sets from an Internet-scale RNA videogame',
      paperUrl: 'https://doi.org/10.1101/326736',
      journal: 'bioRxiv',
      date: 'May 2018',
      downloadTooltip: 'Download via GitHub',
      downloadUrl: 'https://github.com/EteRNAgame/EternaBrain',
      helpTooltip: 'View on GitHub',
      helpUrl: 'https://github.com/EteRNAgame/EternaBrain/blob/master/README.md',
    },
    {
      title: 'NEMO',
      logoUrl: NemoLogo,
      description:
        'Solving the RNA inverse folding problem, also known as the RNA design problem, is critical to advance several scientific fields like bioengineering, yet existing approaches have had limited success. NEMO combines a different technique, Nested Monte Carlo Search (NMCS), with domain-specific knowledge to create an algorithm that outperforms all prior published methods by wide margins and solves 95 of the 100 puzzles listed in a recently proposed RNA solving difficulty benchmark.',
      thumbnailUrl: NemoThumbnail,
      paperTitle:
        'An unexpectedly effective Monte Carlo technique for the RNA inverse folding problem',
      paperUrl: 'https://doi.org/10.1101/345587',
      journal: 'bioRxiv',
      date: 'June 2018',
      downloadTooltip: 'Download via SimTK',
      downloadUrl: 'https://simtk.org/projects/nemo',
      helpTooltip: 'Coming soon',
    },
    {
      title: 'EternaBot',
      logoUrl: EternaBotLogo,
      description:
        'A community of 37,000 nonexperts leveraged continuous remote laboratory feedback to learn new design rules that substantially improve the experimental accuracy of RNA structure designs. These rules, distilled by machine learning into an automated algorithm EternaBot, also significantly outperform prior algorithms in a gauntlet of independent tests.',
      thumbnailUrl: EternaBotThumbnail,
      paperTitle: 'RNA design rules from a massive open laboratory',
      paperUrl: 'https://doi.org/10.1073/pnas.1313039111',
      journal: 'PNAS',
      date: 'Feb 2014',
      downloadTooltip: 'Run via eternabot.org',
      downloadUrl: 'http://eternabot.org/',
      helpTooltip: 'View on eternabot.org',
      helpUrl: 'http://eternabot.org/about',
    },
    {
      title: 'SentRNA',
      logoUrl: SentRNALogo,
      description:
        'SentRNA is a fully-connected neural network trained using the eternasolves dataset. The agent first predicts an initial sequence for a target using the trained network, and then refines that solution if necessary using a short adaptive walk utilizing a canon of standard design moves. Through this approach, SentRNA can learn and apply human-like design strategies to solve several complex targets previously unsolvable by any computational approach.',
      thumbnailUrl: SentRNAThumbnail,
      paperTitle:
        'SentRNA: Improving computational RNA design by incorporating a prior of human design strategies',
      paperUrl: 'https://arxiv.org/abs/1803.03146',
      journal: 'arxiv',
      date: 'Mar 2018',
      downloadTooltip: 'Download via GitHub',
      downloadUrl: 'https://github.com/jadeshi/SentRNA',
      helpTooltip: 'View on GitHub',
      helpUrl: 'https://github.com/jadeshi/SentRNA/blob/master/README.md',
    },
    {
      title: 'RNAmake',
      logoUrl: RNAMakeLogo,
      description:
        'RNAMake is a toolkit for designing and optimizing RNA 3D structure. It allows the alignment between RNA motifs. These motif are small modular peices of RNA that are believed to fold independently, thus attaching them together with helix flanking both sides allows users of RNAMake to build large segments of RNA with a high success rate of forming the predicted structure in vitro.',
      thumbnailUrl: RNAMakeThumbnail,
      paperTitle:
        'Computational design of asymmetric three-dimensional RNA structures and machines',
      paperUrl: 'https://doi.org/10.1101/223479',
      journal: 'bioRxiv',
      date: 'Nov 2017',
      downloadTooltip: 'Download via SimTK',
      downloadUrl: 'https://simtk.org/frs/?group_id=1749',
      helpTooltip: 'View documentation',
      helpUrl: 'https://ribokit.github.io/RNAMake/',
    },
  ];

  @Component({
    components: {
      EternaPage,
      SoftwareCard,
    },
  })
  export default class SoftwareExplore extends Vue {
    projects: SoftwareProject[] = projects;
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
