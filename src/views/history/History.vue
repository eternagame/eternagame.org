<template>
  <EternaPage
    :title="$t('history:title')"
  >
    <!-- Note: Header date is copied from Terms & Conditions, so may not be correct. -->
    <div class="page-content mt-2">
      <div class="p-2">
        <h4 class="header">
          {{ $t('history:origins-header') }}
        </h4>
        <p class="description">
          {{ $t('history:origins-body-1') }}
          {{ $t('history:origins-body-2') }}
        </p>
        <br />
        <h4 class="header">
          {{ $t('history:science-header') }}
        </h4>
        <p class="description">
          {{ $t('history:science-body-1') }}
          <a href="https://en.wikipedia.org/wiki/Nucleic_acid_structure_determination#SHAPE" target="_blank">{{ $t('history:science-body-2') }}</a>
          {{ $t('history:science-body-3') }}
          <a href="https://en.wikipedia.org/wiki/Flavin_mononucleotide" target="_blank">{{ $t('history:science-body-4') }}</a>
          {{ $t('history:science-body-5') }}
          <a href="https://www.pnas.org/content/111/6/2122" target="_blank">{{ $t('history:science-body-6') }}</a>
          {{ $t('history:science-body-7') }}
        </p>
        <p class="description">
          {{ $t('history:science-body-8') }}
          <a href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub" target="_blank">{{ $t('history:science-body-9') }}</a>
          {{ $t('history:science-body-10') }}
          <a href="https://www.biorxiv.org/content/10.1101/281147v2" target="_blank">{{ $t('history:science-body-11') }}</a>
        </p>
        <p class="description">
          {{ $t('history:science-body-12') }}
          <a href="https://en.wikipedia.org/wiki/MS2_tagging" target="_blank">{{ $t('history:science-body-13') }}</a>
          {{ $t('history:science-body-14') }}
        </p>
        <p class="description">
          {{ $t('history:science-body-15') }}
        </p>
        <p class="description">
          {{ $t('history:science-body-16') }}
        </p>
        <br />
        <h4 class="header">
          {{ $t('history:software-header') }}
        </h4>
        <p class="description">
          {{ $t('history:software-body-1') }}
        </p>
        <p class="description">
          {{ $t('history:software-body-2') }}
        </p>
        <h4 class="header">
          {{ $t('history:community-header') }}
        </h4>
        <p class="description">
          {{ $t('history:community-body-1') }}
        </p>
      </div>
      <hr class="top-border" />
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TermsAndConditions, { options } from '@/views/terms/TermsAndConditions.vue';

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class CodeOfConduct extends Vue {
    private options: Option[] = options;
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .header {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .description {
    max-width: 70ch;
    padding-bottom: 2rem;
    margin: 0 auto;
  }
</style>
