<template>
  <EternaPage :title="$t('help:title')">
    <h3 class="mt-4">{{ $t('help:topics') }}</h3>
    <div class="card flex p-3">
      <template v-for="key in Object.keys(data)">
        <a class="section-link" :href="'#' + key" :key="key">{{ $t(key) }}</a>
        <hr class="options-divider m-0" :key="key" />
      </template>
    </div>
    <div v-for="[key, section] in Object.entries(data)" :key="key">
      <a href="#" @click="scrollToTop()" class="top-link">
        {{ $t('help:top') }} <b-icon-arrow-up></b-icon-arrow-up>
      </a>
      <h3>{{ $t(key) }}</h3>
      <div class="card p-3">
        <a :name="key"> <p class="section-text" v-dompurify-html="$t(section)"></p></a>
      </div>
    </div>
    <template #sidebar="{  }">
      <h3><b-icon-command></b-icon-command> {{ $t('help:key-commands') }}</h3>
      <div v-for="[key, command] in Object.entries(keycommands)" :key="key">
        <div class="section-link" style="float: right">{{ $t(command) }}</div>
        <div class="section-link">{{ $t(key) }}</div>
        <hr class="options-divider m-0" />
      </div>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import { BIconArrowUp, BIconCommand } from 'bootstrap-vue';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: {
      EternaPage,
      AspectRatioCard,
      BIconArrowUp,
      BIconCommand,
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
<style lang="scss" scoped>
  @import '@/styles/_variables.scss';

  h3 {
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  .top-link {
    float: right;
    font-weight: bold;
    color: $gray-200;
  }

  .section-link {
    color: $gray-200;
    font-weight: bold;
    line-height: 2rem;
  }

  .section-text {
    white-space: pre-wrap;
  }

  // TODO: Dedupe from DropdownSidebarPanel
  .options-divider {
    border-color: $gray-200;
    opacity: 0.15;
    margin: 9.375px 0;
  }
</style>
