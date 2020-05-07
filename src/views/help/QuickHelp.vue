<template>
  <EternaPage>
    <h1>{{ $t('help:title') }}</h1>
    <h2>{{ $t('help:topics') }}</h2>
    <div class="card flex">
      <p v-for="key in Object.keys(data)" :key="key">
        <a :href="'#' + key">{{ $t(key) }}</a>
      </p>
    </div>
    <div v-for="[key, section] in Object.entries(data)" :key="key">
      <a @click="scrollToTop()">{{ $t('help:top') }}</a>
      <h3>{{ $t(key) }}</h3>
      <div class="card">
        <a :name="key"> <p v-dompurify-html="$t(section)"></p></a>
      </div>
    </div>
    <template #sidebar="{  }">
      <h1>{{ $t('help:key-commands') }}</h1>
      <div
        v-for="[key, command] in Object.entries(keycommands)"
        :key="key"
        class="d-flex space-between"
      >
        <div>{{ $t(key) }}</div>
        <div>{{ $t(command) }}</div>
      </div>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import VueDOMPurifyHTML from 'vue-dompurify-html';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: {
      EternaPage,
      AspectRatioCard,
    },
  })
  export default class QuickHelp extends Vue {
    private data = {
      'help:tips-and-tricks': 'help:tips-and-tricks-text',
      'help:four-bases': 'help:four-bases-text',
      'help:moving-and-magnifying-RNA': 'help:moving-and-magnifying-RNA-text',
      'help:objectives': 'help:objectives-text',
      'help:click-and-drag-painting': 'help:click-and-drag-painting-text',
      'help:bonds': 'help:bonds-text',
      'help:stacks-and-loops': 'help:stacks-and-loops-text',
      'help:painting-pairs-of-bases': 'help:painting-pairs-of-bases-text',
      'help:bond-strength': 'help:bond-strength-text',
      'help:natural-and-target-modes': 'help:natural-and-target-modes-text',
      'help:end-of-stacks': 'help:end-of-stacks-text',
      'help:shape-guide': 'help:shape-guide-text',
      'help:placing-A-U': 'help:placing-A-U-text',
      'help:slides': 'help:slides-text',
      'help:swap-tool': 'help:swap-tool-text',
      'help:placing-U-G': 'help:placing-U-G-text',
      'help:boosting-loops': 'help:boosting-loops-text',
      'help:base-numbers': 'help:base-numbers-text',
      'help:bulges': 'help:bulges-text',
      'help:1-1-loops': 'help:1-1-loops-text',
      'help:energy': 'help:energy-text',
      'help:switch-puzzles': 'help:switch-puzzles-text',
      'help:highlighting-bases': 'help:highlighting-bases-text',
    };

    private keycommands = {
      'help:mode': 'Space',
      'help:zoom-in': '+',
      'help:zoom-out': '-',
      'help:undo': 'Z',
      'help:redo': 'Y',
      'help:paint-A': '1',
      'help:paint-U': '2',
      'help:paint-G': '3',
      'help:paint-C': '4',
      'help:paint-au-pair': 'Q',
      'help:paint-ug-pair': 'W',
      'help:paint-gc-pair': 'E',
      'help:swap-pair': '5',
    };

    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
</script>
<style lang="scss" scoped></style>
