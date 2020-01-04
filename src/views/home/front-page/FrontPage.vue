<template>
  <div class="page">
    <VideoSection/>
    <DocsSection/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import VideoSection from './components/VideoSection.vue';
  import DocsSection from './components/DocsSection.vue';

  @Component({
    components: {
      DocsSection,
      VideoSection,
    },
  })
  export default class FrontPage extends Vue {
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
