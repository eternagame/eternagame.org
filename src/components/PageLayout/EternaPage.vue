<template>
  <div style="overflow:hidden; margin-top: 120px;">
    <b-container class="page-container">
      <h2 class="page-title" v-if="title">
        <b>{{title}}</b>
        <div class="d-lg-none">
          <slot name="sidebar" :isInSidebar="false"></slot>
        </div>
      </h2>
      <b-row>
        <b-col cols="12" lg="9" class="body" v-if="hasSidebarSlot">
          <slot></slot>
        </b-col>
        <b-col class="body" v-if="!hasSidebarSlot">
          <slot></slot>
        </b-col>
        <b-col class="sidebar d-none d-lg-block" v-if="hasSidebarSlot">
          <slot name="sidebar" :isInSidebar="true"></slot>
        </b-col>
      </b-row>
      <MobileSidebar ref="mobileSidebar" v-if="hasSidebarSlot">
        <slot name="sidebar" :isInSidebar="true"></slot>
      </MobileSidebar>
      <PageFooter/>
    </b-container>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import MobileSidebar from './MobileSidebar.vue';
  import PageFooter from './PageFooter.vue';


  @Component({
    components: {
      MobileSidebar,
      PageFooter,
    },
  })
  export default class EternaPage extends Vue {
    @Prop()
    title!: string;

    $refs!: {
      mobileSidebar: MobileSidebar;
    };

    unsubscribe!: () => void;

    created() {
      this.unsubscribe = this.$vxm.mobile.$subscribe('showPageSidebar', (payload) => {
        this.$refs.mobileSidebar.openMenu();
      });
    }

    beforeDestroy() {
      this.unsubscribe();
    }

    get hasSidebarSlot() {
      return !!this.$scopedSlots.sidebar;
    }
  }

</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
    min-height: Calc(100vh - 120px);
    padding: 3rem 1.5rem 1.5rem;
  }
  .page-container:before {
    box-shadow: -45px 0 45px -45px inset black;
    content: " ";
    height: 100%;
    left: -45px;
    position: absolute;
    top: 0;
    width: 45px;
  }
  .page-container:after {
    box-shadow: 45px 0 45px -45px inset black;
    content: " ";
    height: 100%;
    position: absolute;
    top: 0;
    right: -45px;
    width: 45px;
  }
  .page-container:before,
  .page-container:after {
    display: flex;
  }
  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2.25rem;
  }
  .sidebar {
    font-size: 0.875rem;
  }
</style>
