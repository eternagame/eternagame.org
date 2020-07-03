<template>
  <b-col class="mb-2" cols="12" :sm="sm" :md="md">
    <slot></slot>
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class GalleryColumn extends Vue {
    @Prop({ default: '4' }) sm!: string;

    @Prop({ default: '4' }) md!: string;
  }
</script>

<style scoped lang="scss"></style>
