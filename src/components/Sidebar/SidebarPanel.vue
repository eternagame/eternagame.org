<template>
  <div :class="{panel: isInSidebar, toggler: !isInSidebar}">
    <div class="sidebar-panel-header" :style="headerStyle" @click.stop="clickedHeader">
      <img :src="headerIcon" class="header-icon"/>
      <span :class="headerTextClasses">{{header}}</span>
    </div>
    <template v-if="isInSidebar">
      <hr/>
      <div class="body">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class SidebarPanel extends Vue {
    @Prop({ required: true })
    private header!: string;

    @Prop({ required: true })
    private headerIcon!: string;

    isInSidebar = false;

    mounted() {
      this.isInSidebar = !!(this.$el && this.$el.closest('.sidebar,.mobile-sidebar'));
    }

    get headerTextClasses() {
      return this.isInSidebar ? [] : ['d-none', 'd-md-inline-block'];
    }

    clickedHeader() {
      if (!this.isInSidebar) {
        this.$store.commit('mobileStore/showPageSidebar');
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
  margin: 10px 0 40px;
  width: 100%;
  .sidebar-panel-header {
    width: 100%;
  }
}

.toggler {
  display: inline-block;
  margin: auto 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.header-icon {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  height: 1.125em;
  vertical-align: middle;
  display: inline-block;
}

.sidebar-panel-header {
  color: var(--med-blue);
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items : center;
  justify-content: flex-start;

}

hr {
  border-top-color: var(--med-blue);
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
