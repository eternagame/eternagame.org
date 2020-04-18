<template>
  <div style="margin:10px;">
    <progress-circle
      :completed-steps="progress"
      :total-steps="total"
      :start-color="color"
      :stop-color="color"
      circle-color="gray"
    >
      <p style="margin-bottom:0px;font-weight:bold">{{ progress }}</p>
      <p style="margin-bottom:0px;">{{ '/' + total.toString() }}</p>
    </progress-circle>
    <p style="font-size: 12px;font-weight: bold;">{{ name }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import { ProgressCircle } from 'vue-progress-circle';

  @Component({
    components: {
      ProgressCircle,
    },
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

<style lang="scss" scoped></style>
