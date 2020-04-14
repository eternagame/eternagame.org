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
