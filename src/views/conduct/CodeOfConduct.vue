<template>
  <EternaPage :title="$t('code-of-conduct:title')"
    ><div class="page">
      <div style="padding: 10px; text-align: justify;">
        <h3 style="padding-bottom: 16px;">{{ $t('code-of-conduct:section1-title') }}</h3>
        <p>{{ $t('code-of-conduct:section1-text') }}</p>
        <br /><br />
        <ul style="padding-left: 20px;">
          <li>
            {{ $t('code-of-conduct:list-item-1') }}
          </li>
          <li>{{ $t('code-of-conduct:list-item-2') }}</li>
          <li>{{ $t('code-of-conduct:list-item-3') }}/li></li>
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
        <br /><br />
        <p>
          {{ $t('code-of-conduct:text2') }}
          <a href="/web/player/48290/" target="_blank">{{ $t('code-of-conduct:text3') }}</a
          >{{ $t('code-of-conduct:text4') }}<br /><br /><br /><br />{{ $t('code-of-conduct:text5')
          }}<br /><br />{{ $t('code-of-conduct:text6') }}
        </p>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class CodeOfConduct extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
    padding: 20px;
  }
</style>
