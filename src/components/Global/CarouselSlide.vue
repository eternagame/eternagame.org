<template>
  <b-carousel-slide class="mb-2" cols="12" :sm="sm" :md="md">
    <slot></slot>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class CarouselSlide extends Vue {
    @Prop({ required: true, default: '4' }) sm!: string;

    @Prop({ required: true, default: '4' }) md!: string;
  }
</script>

<style scoped lang="scss"></style>
