<template>
  <div>
    <EternaPage
      :title="$t('terms:title')"
      :header_title="$t('terms:title-short')"
      :header_date="$t('terms:header-date')"
    >
      <div class="page-content">
        <h3>{{ $t('terms:section-1-title') }}</h3>
        <p>
          {{ $t('terms:section-1-text') }}
        </p>

        <h3>{{ $t('terms:section-2-title') }}</h3>
        <p>
          {{ $t('terms:section-2-text-paragraph1') }}
        </p>

        <p>
          {{ $t('terms:section-2-text-paragraph2') }}
        </p>

        <p>
          {{ $t('terms:section-2-text-paragraph3') }}
        </p>

        <h3>{{ $t('terms:section-3-title') }}</h3>
        <p>
          {{ $t('terms:section-3-text-paragraph1') }}
        </p>

        <h3>{{ $t('terms:section-4-title') }}</h3>
        <p>
          {{ $t('terms:section-4-text-paragraph1') }}
        </p>

        <h3>{{ $t('terms:section-5-title') }}</h3>
        <p>
          {{ $t('terms:section-5-text-paragraph1') }}
        </p>

        <p>
          {{ $t('terms:section-5-text-paragraph2') }}
        </p>

        <p>
          {{ $t('terms:section-5-text-paragraph3') }}
        </p>

        <p>
          {{ $t('terms:section-5-text-paragraph4') }}
        </p>

        <h3>{{ $t('terms:section-6-title') }}</h3>
        <p>
          {{ $t('terms:section-6-text-paragraph1') }}
        </p>

        <h3>{{ $t('terms:section-7-title') }}</h3>
        <p>
          {{ $t('terms:section-7-text-paragraph1') }}
        </p>

        <h3>{{ $t('terms:section-8-title') }}</h3>
        <p>
          {{ $t('terms:section-8-text-paragraph1') }}
        </p>
        <hr class="top-border" />
        <b-form-checkbox
          v-model="status"
          value="accepted"
          unchecked-value="not_accepted"
          @change="toggleAgreement"
        >
          {{ $t('terms:checkbox-accept') }}
        </b-form-checkbox>
      </div>
      <template #sidebar="{ isInSidebar }">
        <DropdownSidebarPanel
          :options="options"
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

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class TermsAndConditions extends Vue {
    private options: Option[] = [
      { value: 'about', text: 'side-panel-options:about' },
      { value: 'publications', text: 'side-panel-options:publications' },
      { value: 'software', text: 'side-panel-options:software' },
      { value: 'terms', text: 'side-panel-options:terms' },
      { value: 'code_conduct', text: 'side-panel-options:code_conduct' },
    ];

    private status: boolean = false;

    toggleAgreement(checked: boolean) {
      axios.post('/post/?type=survey&action=update&value=EULA_Agree').then(response => {
        console.log(response);
      });
    }

    get loggedIn() {
      return this.$vxm.user.loggedIn; // TODO change
    }
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
