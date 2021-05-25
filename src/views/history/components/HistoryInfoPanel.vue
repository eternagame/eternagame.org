<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    header="Sections"
    headerIcon="@/assets/info.svg"
  >
    <ul class="page-sections-container">
      <li class="page-section" v-for="section in sections" :key="section.id">
        <a :href="`#${section.href}`">
          {{ section.title }}
        </a>
      </li>
    </ul>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class HistoryInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly sections!: object[];
  }
</script>

<style scoped lang="scss">
  .page-sections-container {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .page-section {
    padding: 10px;
    padding-left: 0px;
    border-bottom: 1px solid #1E395D;

    & a {
      color: #B4BCC2;
    }
  }
</style>
