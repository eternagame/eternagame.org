<template>
  <EternaPage title="Not Found">
    <div class="page">
      <h1>Not Found</h1>
      <div class="text-muted subtitle">
        Sorry, we couldn't find that.
        <router-link to="/">Take me home!</router-link>
      </div>
      <figure class="text-left mx-auto mt-4 d-inline-block figure">
        <img src="~@/assets/watblob.png" class="figure-img">
        <figcaption class="figure-caption mt-n4">Image by Ness</figcaption>
      </figure>
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
  @import '@/styles/global.scss';

  .page {
    margin-top: 120px;
    padding: 20px;
    text-align: center;
  }

  .subtitle {
    font-size: 2rem;
  }
</style>
