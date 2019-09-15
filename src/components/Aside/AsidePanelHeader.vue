<template>
  <div>
    <slot></slot>
    <hr />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class AsidePanelHeader extends Vue {
    @Prop() private imageUrl!: string;

    @Prop() private text!: string;
  }
</script>

<style lang="scss" scoped>
div {
  color: var(--med-blue);
  font-weight: bold;
  text-transform: uppercase;
}

hr {
  border-top-color: var(--med-blue);
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
