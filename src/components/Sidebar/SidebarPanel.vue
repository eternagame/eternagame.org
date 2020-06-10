<template>
  <div :class="{ panel: isInSidebar, toggler: !isInSidebar }">
    <div class="sidebar-panel-header" :style="headerStyle" @click="clickedHeader">
      <img v-if="headerIcon" :src="headerIcon" class="header-icon" />
      <span :class="headerTextClasses">{{ header }}</span>
    </div>
    <template v-if="isInSidebar">
      <hr />
      <div class="body">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {},
  })
  export default class SidebarPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly header!: string;

    @Prop({ required: true }) readonly headerIcon!: string;

    get headerTextClasses() {
      return this.isInSidebar ? [] : ['d-none', 'd-md-inline-block'];
    }

    clickedHeader(event: Event) {
      event.stopPropagation();
      if (!this.isInSidebar) {
        this.$vxm.user.openSidebar();
        this.$vxm.mobile.showPageSidebar();
      }
    }

    get headerStyle() {
      return { 'flex-direction': this.isInSidebar ? 'row' : 'row-reverse' };
    }
  }
</script>

<style lang="scss" scoped>
  .body {
    margin-top: 10px;
  }

  .panel {
    padding-top: 43px;
    margin-bottom: 40px;
    width: 100%;
    .sidebar-panel-header {
      width: 100%;
    }
  }

  .toggler {
    display: inline-block;
    margin: auto 7.5px;
    font-size: 15px;
    cursor: pointer;
  }

  .sidebar-panel-header {
    color: var(--med-blue);
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-icon {
    margin-right: 3.75px;
    margin-left: 3.75px;
    height: 1.125em;
    vertical-align: middle;
    display: inline-block;
  }

  hr {
    border-top-color: var(--med-blue);
    margin-top: 5px;
    margin-bottom: 0px;
  }
</style>
