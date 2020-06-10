<template>
  <div class="card" :style="{ '--aspect-ratio': aspectRatio }">
    <div class="before" :style="{ 'padding-top': `calc(${aspectRatio} * 100%)` }"></div>
    <div class="card-body">
      <div class="no-flex">
        <slot name="header" />
      </div>
      <div class="scalable-container">
        <slot></slot>
      </div>
      <div class="no-flex">
        <slot name="footer" />
      </div>
    </div>
  </div>
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
    @Prop({ default: 1 }) readonly aspectRatio!: number; // Height / width
  }
</script>

<style lang="scss" scoped>
  .card {
    display: block;
    .before {
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
    }
    &::after {
      content: '';
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
