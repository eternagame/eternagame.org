<template>
  <div>
    <EternaPage
      :title="$t('terms:title')"
      :header_title="$t('terms:title-short')"
      :header_date="$t('terms:header-date')"
    >
      <div class="page-content mt-2">
        <TermsAndConditionsText />
        <hr class="top-border" />
      </div>
      <template #sidebar="{ isInSidebar }">
        <DropdownSidebarPanel
          :options="options"
          :isInSidebar="isInSidebar"
        />
        <div style="font-weight: bold; font-size: 1rem;">
          {{ $t('terms-sidebar:section-1') }}
        </div>
        <div>
          {{ $t('terms-sidebar:section-2') }}
        </div>
        <ul>
          {{ $t('terms-sidebar:section-3-start') }}
          <a href="https://forum.eternagame.org/">
            {{ $t('terms-sidebar:section-3-forum') }}
          </a>
          {{ $t('terms-sidebar:section-3-end') }}
        </ul>
        <ul>
          {{ $t('terms-sidebar:section-4-start') }}
          <a href="https://discord.com/invite/KYeTwux">
            {{ $t('terms-sidebar:section-4-discord') }}
          </a>
          {{ $t('terms-sidebar:section-4-end') }}
        </ul>
        <ul>
          {{ $t('terms-sidebar:section-5') }}
        </ul>
      </template>
    </EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import axios from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TermsAndConditionsText from './TermsAndConditionsText.vue';

  export const options: Option[] = [];

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      TermsAndConditionsText,
    },
  })
  export default class TermsAndConditions extends Vue {
    private options: Option[] = options;
  }
</script>
<style lang="scss" scoped>
  h3,
  p {
    font-size: 0.56rem;
    font-weight: normal;
    line-height: 1.36;
  }

  h3 {
    font-weight: bold;
  }
  h2 {
    font-size: 10.72rem;
    font-weight: bold;
  }
  ul{
    padding: 0;
  }
</style>
