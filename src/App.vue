<template>
  <div id="app">
    <Navbar/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Navbar from '@/components/PageLayout/Navbar.vue';

  @Component({
    components: {
      Navbar,
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  @import '@/styles/_variables.scss';

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  @import '@/styles/_bootswatch.scss';
  @import '@/styles/custom.scss';
</style>
