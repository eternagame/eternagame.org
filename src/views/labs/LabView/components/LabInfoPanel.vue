<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('lab-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <span class="gray-header">{{ $t('lab-info:admin') }}</span
    ><br />
    <img src="@/assets/navbar/DefaultIcon.svg" style="margin-right:5px" /><b
      style="color: var(--yellow);"
      >{{ lab.username }}</b
    >
    <br />
    <br />
    <span class="gray-header">{{ $t('lab-info:research-affiliation') }}</span
    ><br />
    <b>{{ lab.affiliation }}</b
    ><br />
    <br />
    <span class="gray-header">{{ $t('lab-info:currently-active') }}</span
    ><br />
    <b>{{ $t('lab-info:round-number') }} 4</b>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import { LabData } from '../types';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class LabInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop()
    private lab!: LabData;

    created() {}
  }
</script>

<style scoped lang="scss"></style>
