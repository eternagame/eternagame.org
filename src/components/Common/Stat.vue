<template>
  <div style="display: inline-flex; flex-direction: column; text-align: center;">
    <slot></slot>
    <p class="smaller-text" style="font-weight: bold;">{{ $t(name) }}</p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Stat extends Vue {
    @Prop({ required: true }) readonly name!: string;
  }
</script>

<style lang="scss" scoped>
.smaller-text {
  font-size: 12px;
}
</style>
