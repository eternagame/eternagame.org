<template>
  <div class="panel">
    <SidebarPanelHeader>
      <slot name="header"></slot>
    </SidebarPanelHeader>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SidebarPanelHeader from './SidebarPanelHeader.vue';

  @Component({
    components: {
      SidebarPanelHeader,
    },
  })
  export default class SidebarPanel extends Vue {}
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
