<template>
  <div style="overflow:hidden; margin-top: 120px;">
    <b-container class="page-container p-4">
      <b-row>
        <b-col cols="12" lg="9" class="body">
          <slot></slot>
        </b-col>
        <b-col class="sidebar">
          <slot name="sidebar"></slot>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class EternaPage extends Vue {}
</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
    min-height: Calc(100vh - 120px);
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
  // .page-container {
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  // }

  .body, .sidebar {
    margin-top: 15px;
  }
</style>
