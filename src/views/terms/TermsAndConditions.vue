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
          :defaultIndex="-1"
          paramName="sort"
          replace
          :isInSidebar="isInSidebar"
        />
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

  export const options: Option[] = [
    { value: 'leaderboard', text: 'side-panel-options:leaderboard', link: '/players' },
    { value: 'forum', text: 'side-panel-options:forum', link: 'https://forum.eternagame.org' },
    { value: 'discord', text: 'side-panel-options:discord', link: 'https://discord.gg/KYeTwux' },
    { value: 'wiki', text: 'side-panel-options:wiki', link: 'http://eternawiki.org' },
    { value: 'groups', text: 'side-panel-options:groups', link: `${process.env.VUE_APP_API_BASE_URL}/web/group/` },
    { value: 'terms', text: 'side-panel-options:terms', link: '/community/terms' },
    { value: 'code_conduct', text: 'side-panel-options:code_conduct', link: '/community/conduct' },
  ];

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
</style>
