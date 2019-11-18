<template>
  <div class="d-lg-none sidebar-icons-section">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class AsideHeaderSection extends Vue {}
</script>

<style lang="scss" scoped>
  .sidebar-icons-section {
    display: flex;
    align-items: center;
  }
</style>
