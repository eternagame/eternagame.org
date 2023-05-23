<template>
  <iframe title="Data Browser" :src="`${baseUrl}/lab/data-browser.html`" />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage
    }
  })
  export default class Navbar extends Vue {
    baseUrl = process.env.VUE_APP_API_BASE_URL;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  iframe {
    width: 100%;
    height: calc(100% - $navbar-height);
    border: 0;
    margin-top: $navbar-height;
  }
</style>
