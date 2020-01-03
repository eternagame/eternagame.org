<template>
  <b-card :style="{'--aspect-ratio': aspectRatio}">
    <div class="no-flex">
      <slot name="header"/>
    </div>
    <div class="scalable-container">
      <slot/>
    </div>
    <div class="no-flex">
      <slot name="footer"/>
    </div>
  </b-card>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import StateCounter from './StateCounter.vue';

  @Component({
    components: {
      StateCounter,
    },
  })
  export default class AspectRatioCard extends Vue {
    @Prop({ default: 1 })
    private aspectRatio!: number; // Height / width
  }
</script>

<style lang="scss" scoped>
  .card {
    display: block;
    &::before{
      content: "";
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: calc(var(--aspect-ratio) * 100%);
    }
    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .card ::v-deep .card-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .scalable-container {
    align-self: center;
    text-align: center;
    min-height: 0;
    flex: 1;
  }

  .scalable-container ::v-deep .scalable {
    height: 100%;
    object-fit: contain;
  }

  .no-flex {
    flex: 0;
  }
</style>
