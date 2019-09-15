<template>
  <div class="panel">
    <AsidePanelHeader>
      <slot name="header"></slot>
    </AsidePanelHeader>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AsidePanelHeader from './AsidePanelHeader.vue';

  @Component({
    components: {
      AsidePanelHeader,
    },
  })
  export default class AsidePanel extends Vue {}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
}
.body {
  margin-top: 10px;
}
.panel {
  margin: 10px 0;
}
</style>
