<template>
  <div id="app">
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

  @Component({
    components: {
      Navbar,
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
