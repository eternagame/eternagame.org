<template>
  <div style="margin:10px;">
    <progress
      class="circle"
      :value="percentage"
      max="100"
      :style="'--progress: ' + percentage"
    ></progress>
    <p style="font-size: 12px;font-weight: bold;">{{ name }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Progress extends Vue {
    @Prop() private name!: string;

    @Prop({ required: true }) private color!: string;

    @Prop({ required: true })
    private progress!: number;

    @Prop({ required: true })
    private total!: number;

    get percentage() {
      return Math.floor((this.progress / this.total) * 100);
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  @supports (-webkit-appearance: none) {
    progress,
    meter {
      -webkit-appearance: none;
      appearance: none;
    }

    /*gets rid of all pseudo elements*/
    ::-webkit-progress-inner-element,
    ::-webkit-progress-bar,
    ::-webkit-progress-value {
      display: none;
    }

    ::-webkit-meter-bar,
    ::-webkit-meter-optimum-value,
    ::-webkit-meter-suboptimum-value,
    ::-webkit-meter-even-less-good-value {
      display: none;
    }

    /* overlays text*/
    .circle:after {
      content: attr(value) '';
      position: absolute;
      top: 6px;
      right: 6px;
      bottom: 6px;
      left: 6px;
      background-image: linear-gradient(to bottom, rgba(4, 0, 5, 0), rgba(6, 3, 4, 0.75)),
        url('https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png');
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 30px;
      line-height: 45px;
      color: #524f63;
    }

    /*using a conical gradient to create the doughnut chart  */
    .circle {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      --fill: calc(var(--progress) * 1%);
      background: conic-gradient(#48c89e var(--fill), red 0);
      @media (max-width: 500px) {
        width: 110px;
        height: 110px;
      }
    }

    /* just to change the fill color*/
    meter.circle {
      background: conic-gradient(#ff7676 var(--fill), red 0);
    }
  }
</style>
