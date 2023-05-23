<template>
  <div class="page d-flex flex-column align-items-center">
    <div class="mw-100">
      <h1>Not Found</h1>
      <div class="text-muted subtitle">
        Sorry, we couldn't find that.
        <router-link to="/">Take me home!</router-link>
      </div>
      <div class="d-flex flex-column align-items-center">
        <figure class="text-left mt-4 d-inline-block figure">
          <img src="~@/assets/watblob.png" alt="" class="figure-img mw-100">
          <figcaption class="figure-caption mt-n4">Image by Ness</figcaption>
        </figure>
      </div>
    </div>
  </div>
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
    margin-top: $navbar-height;
    padding: 20px;
  }

  .subtitle {
    font-size: 2rem;
  }
</style>
