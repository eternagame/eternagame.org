<template>
  <div class="p-2">
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class TermsAndConditionsText extends Vue {}
</script>
<style lang="scss" scoped>
  h3 {
    font-size: 1rem;
    font-weight: bold;
    padding-top: 1rem;
    margin-bottom: 0.2rem;
  }
</style>
