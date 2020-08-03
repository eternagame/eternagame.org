<template>
  <div id="app">
    <VueBootstrapBreakpointIndicator v-if="isDevelopment" class="breakpoint" />
    <Navbar />
    <Modals />
    <router-view />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Navbar from '@/components/PageLayout/Navbar/Navbar.vue';
  import Modals from '@/components/Modals/Modals.vue';
  import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_KEY_NAME } from '@/plugins/i18n';
  // @ts-ignore
  import browserLanguage from 'in-browser-language';
  import VueBootstrapBreakpointIndicator from 'vue-bootstrap-breakpoint-indicator';

  @Component({
    components: {
      Navbar,
      Modals,
      VueBootstrapBreakpointIndicator,
    },
  })
  export default class App extends Vue {
    get isDevelopment() {
      return process.env.NODE_ENV !== 'production';
    }
  }
</script>

<style lang="scss">
  @import '@/styles/global.scss';

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  @import '@/styles/_bootswatch.scss';
  @import '@/styles/custom.scss';

  .breakpoint {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1500;
    padding: .2rem .3rem;
    background-color: #2a5ea2;
    border-radius: 5px;
    display: inline;
  }
</style>
