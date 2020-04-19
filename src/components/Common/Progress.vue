<template>
  <div style="margin:10px;">
    <vue-circle
      :progress="50"
      :size="100"
      :reverse="false"
      :fill="{ color: `${color}` }"
      line-cap="round"
      empty-fill="rgba(255, 255, 255, .2)"
      :animation-start-value="0.0"
      :start-angle="4.7"
      insert-mode="append"
      :thickness="10"
      :show-percent="false"
    >
      <p style="font-size: 14px;font-weight: bold;margin:0">{{ progress }}</p>
      <p style="font-size: 14px">/{{ total }}</p>
    </vue-circle>

    <p style="font-size: 12px;font-weight: bold;">{{ name }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import VueCircle from 'vue2-circle-progress/src/index.vue';

  @Component({
    components: { VueCircle },
  })
  export default class Progress extends Vue {
    @Prop() private name!: string;

    @Prop({ required: true }) private color!: string;

    @Prop({ required: true })
    private progress!: number;

    @Prop({ required: true })
    private total!: number;
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
