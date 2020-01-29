<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="Lab Info" headerIcon="@/assets/info.svg">
    <span class="gray-header">Admin:</span><br/>
    <b style="color: var(--yellow);">Username</b><br/>
    <br/>
    <span class="gray-header">Research affiliation:</span><br/>
    <b>{{lab.affiliation}}</b><br/>
    <br/>
    <span class="gray-header">Currently active:</span><br/>
    <b>Round 4</b>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import { LabData } from '../types';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class LabInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop()
    private lab!: LabData;

    created() {

    }
  }
</script>

<style scoped lang="scss">

</style>
