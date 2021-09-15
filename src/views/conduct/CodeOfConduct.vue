<template>
  <EternaPage
    :title="$t('code-of-conduct:section1-title')"
    :header_title="$t('code-of-conduct:title')"
    :header_date="$t('terms:header-date')"
  >
    <!-- Note: If you make meaningful updates this page, make sure to update the header date -->
    <div class="page-content mt-2">
      <div class="p-2">
        <p>{{ $t('code-of-conduct:section1-text') }}</p>
        <ul style="padding-left: 20px;">
          <li>{{ $t('code-of-conduct:list-item-1') }}</li>
          <li>{{ $t('code-of-conduct:list-item-2') }}</li>
          <li>{{ $t('code-of-conduct:list-item-3') }}</li>
          <li>
            {{ $t('code-of-conduct:list-item-4') }}
            <a href="http://en.wikipedia.org/wiki/Troll_(Internet)" target="_blank">
              {{ $t('code-of-conduct:list-item-4-troll') }}
            </a>
          </li>
        </ul>
        <p>{{ $t('code-of-conduct:text1') }}</p>
        <p>
          {{ $t('code-of-conduct:text2') }}
          <a href="mailto:support@eternagame.org">support@eternagame.org</a>
          {{ $t('code-of-conduct:text3') }}
        </p>
        <p>{{ $t('code-of-conduct:text4') }}</p>
        <p>{{ $t('code-of-conduct:text5') }}</p>
      </div>
      <hr class="top-border" />
    </div>
    <template #sidebar="{ isInSidebar }">
        <SidebarPanel :isInSidebar="isInSidebar" :header="$t('terms-sidebar:section-1')" headerIcon="@/assets/sidebar/question.svg">
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
        </SidebarPanel>
      </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: { EternaPage },
  })
  export default class CodeOfConduct extends Vue {

  }
</script>
<style lang="scss" scoped>
  ul{
    padding: 0;
  }
</style>