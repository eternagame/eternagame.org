<template>
  <b-col class="mb-2" cols="12" sm="6" md="4">
    <slot></slot>
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {

    },
  })
  export default class GalleryColumn extends Vue {

  }
</script>

<style scoped lang="scss">

</style>
