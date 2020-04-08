<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="Calendar" headerIcon="@/assets/calendar.svg">
    <b-calendar
      v-model="value"
      @context="onContext"
      locale="en-US"
      style="width:200px"
    ></b-calendar>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class CalendarPanel extends mixins(SidebarPanelMixin) {
    @Prop() tags!: string[];
  }
</script>

<style scoped lang="scss"></style>
