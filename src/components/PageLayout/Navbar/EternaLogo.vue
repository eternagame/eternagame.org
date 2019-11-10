<template>
  <b-navbar-brand to="/">
    <img
      src="@/assets/logo_eterna.svg"
      class="d-inline-block align-top"
      alt="etenra"
    />
  </b-navbar-brand>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class EternaLogo extends Vue {}
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';
  img {
    width: 187px;
  }
  @include media-breakpoint-up(md) {
    img {
      width: 275px;
    }
  }
</style>
