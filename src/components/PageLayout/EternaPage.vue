<template>
  <div style="overflow:hidden; margin-top: 120px;">
    <b-container class="page-container">
      <h2 class="page-title">
        <b>{{title}}</b>
        <div class="d-lg-none">
          <slot name="sidebar"></slot>
        </div>
      </h2>
      <b-row>
        <b-col cols="12" lg="9" class="body">
          <slot></slot>
        </b-col>
        <b-col class="sidebar d-none d-lg-block">
          <slot name="sidebar"></slot>
        </b-col>
      </b-row>
      <MobileSidebar ref="mobileSidebar">
        <slot name="sidebar"></slot>
      </MobileSidebar>
    </b-container>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import MobileSidebar from './MobileSidebar.vue';

  @Component({
    components: {
      MobileSidebar,
    },
  })
  export default class EternaPage extends Vue {
    @Prop({ required: true })
    title!: string;

    $refs!: {
      mobileSidebar: MobileSidebar;
    };

    unsubscribe!: () => void;

    created() {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'mobileStore/showPageSidebar') {
          this.$refs.mobileSidebar.openMenu();
        }
      });
    }

    beforeDestroy() {
      this.unsubscribe();
    }
  }
</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
    min-height: Calc(100vh - 120px);
    padding: 3rem 1.5rem;
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
