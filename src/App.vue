<template>
  <div id="app">
    <Navbar />
    <VueBootstrapBreakpointIndicator style="z-index: 1070" />
    <Modals />
    <router-view />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueBootstrapBreakpointIndicator from 'vue-bootstrap-breakpoint-indicator/src/BootstrapBreakpointIndicator.vue';
  import Navbar from '@/components/PageLayout/Navbar/Navbar.vue';
  import Modals from '@/components/Modals/Modals.vue';
  import i18n, { LANGUAGES, DEFAULT_LANGUAGE } from '@/plugins/i18n';
  // @ts-ignore
  import browserLanguage from 'in-browser-language';
  // @ts-ignore
  import Cookies from 'js-cookie';

  const LANGUAGE_COOKIE_NAME = 'language';
  if (
    process.env.VUE_APP_ENV === 'client'
    && window.navigator.cookieEnabled
    && !Cookies.get(LANGUAGE_COOKIE_NAME)
  ) {
    Cookies.set(LANGUAGE_COOKIE_NAME, browserLanguage.pick(LANGUAGES));
    window.location.reload();
  }

  @Component({
    components: {
      Navbar,
      VueBootstrapBreakpointIndicator,
      Modals,
    },
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  @import '@/styles/global.scss';

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  @import '@/styles/_bootswatch.scss';
  @import '@/styles/custom.scss';
</style>
