<template>
  <EternaPage
    :title="$t('code-of-conduct:section1-title')"
    :header_title="$t('code-of-conduct:title')"
    :header_date="$t('terms:header-date')"
  >
    <!-- Note: Header date is copied from Terms & Conditions, so may not be correct. -->
    <div class="page-content mt-2">
      <div class="p-2">
        <p>{{ $t('code-of-conduct:section1-text') }}</p>
        <br />
        <ul style="padding-left: 20px;">
          <li>
            {{ $t('code-of-conduct:list-item-1') }}
          </li>
          <li>{{ $t('code-of-conduct:list-item-2') }}</li>
          <li>{{ $t('code-of-conduct:list-item-3') }}</li>
          <li>
            {{ $t('code-of-conduct:list-item-4') }}
            <a href="http://en.wikipedia.org/wiki/Troll_(Internet)" target="_blank">{{
              $t('code-of-conduct:list-item-4-troll')
            }}</a>
          </li>
        </ul>
        <p style="padding-top: 15px;">
          {{ $t('code-of-conduct:text1') }}
        </p>
        <br />
        <p>
          {{ $t('code-of-conduct:text2') }}
          <a href="/web/player/48290/" target="_blank">{{ $t('code-of-conduct:text3') }}</a>
          {{ $t('code-of-conduct:text4') }}
          <br /><br />
          <br /><br />
          {{ $t('code-of-conduct:text5') }}
          <br /><br />
          {{ $t('code-of-conduct:text6') }}
        </p>
      </div>
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
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class CodeOfConduct extends Vue {

  }
</script>
<style lang="scss" scoped>
  ul{
    padding: 0;
  }
</style>