<template>
  <div>
    <i class="arrow left"></i>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.336"
      height="15.336"
      viewBox="0 0 15.336 15.336"
    >
      <rect
        id="Rectangle_25"
        data-name="Rectangle 25"
        width="10.844"
        height="10.844"
        transform="translate(7.668 0) rotate(45)"
        fill="#fff"
      />
      <text class="text" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
        {{ value }}
      </text>
    </svg>
    <i class="arrow right"></i>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class StateCounter extends Vue {
    @Prop({ required: true }) readonly value!: number;
  }
</script>

<style lang="scss" scoped>
  .arrow {
    border: solid white;
    border-width: 0 0.5px 0.5px 0;
    display: inline-block;
    padding: 1.5px;
    position: relative;
    top: -2px;
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .text {
    color: #21508c;
    font-size: 8px;
    font-weight: 900;
  }
</style>
