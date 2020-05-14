<template>
  <div style="width: 100%; display: flex; justify-content: center;">
    <svg
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="-10 -10 120 120"
    >
      <g class="logomark">
        <path
          class="Path_1" data-name="Path 1"
          d="M32.2,35.1A14.8,14.8,0,0,0,23,38.2c-.2.2-2.8-2.8-2.8-2.8a7.83,7.83,0,0,0,.7-3.1,6.4,
            6.4,0,1,0-6.4,6.4,8,8,0,0,0,2.4-.4l2.8,2.8A15.307,15.307,0,0,0,16.2,51a15.6,15.6,0,0,0,
            31.2,0C47.4,42.4,40.8,35.1,32.2,35.1ZM10.8,32.2a3.826,3.826,0,0,1,3.7-3.7,3.7,3.7,0,0,1,
            0,7.4A3.69,3.69,0,0,1,10.8,32.2ZM32.2,61.4A10.5,10.5,0,0,1,21.7,50.9a10.5,10.5,0,1,1,21,
            0A10.435,10.435,0,0,1,32.2,61.4Z"
          fill="#d73832"
        />
        <circle
          class="Ellipse_1" data-name="Ellipse 1" cx="5.9" cy="5.9" r="5.9"
          fill="#53b64e"
        />
        <path
          class="Path_2" data-name="Path 2"
          d="M85.8,59.8a6,6,0,0,0-3.9,1.5h0l-2.6-1.5h0a13.629,13.629,0,0,0,1.3-6.1A14.2,14.2,0,1,0,
            66.4,67.9a14.008,14.008,0,0,0,10.7-5h0l2.6,1.5.2-.4a4.7,4.7,0,0,0-.2,1.8,6.06,6.06,0,0,
            0,6.1,6.1,6.05,6.05,0,1,0,0-12.1ZM66.2,63.6A9.6,9.6,0,1,1,75.8,54,9.538,9.538,0,0,1,
            66.2,63.6Zm19.6,6.1a3.7,3.7,0,0,1,0-7.4A3.517,3.517,0,0,1,89.5,66,3.9,3.9,0,0,1,85.8,
            69.7Z"
          fill="#53b64e"
        />
        <circle
          class="Ellipse_2" data-name="Ellipse 2" cx="5.3" cy="5.3" r="5.3"
          fill="#d73832"
        />
        <g
          class="Group_1" data-name="Group 1"
        >
          <circle
            class="Ellipse_3" data-name="Ellipse 3" cx="3.5" cy="3.5" r="3.5"
            transform="translate(45.1 71)" fill="#2f94d1"
          />
          <path
            class="Path_3" data-name="Path 3" d="M39.4,78.2a9.407,9.407,0,0,0,3.9,4.6,12.806,12.806,
            0,0,1-1.1,2.4,6.8,6.8,0,0,0-2,.2,4.058,4.058,0,1,0,5.3,2.2,3.4,3.4,0,0,
            0-.9-1.3l1.1-2.4a9.387,9.387,0,0,0,6.6-.2,9.916,9.916,0,0,0-7.4-18.4A9.95,9.95,0,0,0,
            39.4,78.2Zm3.5,13.2a2.377,2.377,0,1,1,1.3-3.1A2.635,2.635,0,0,1,42.9,91.4ZM54.7,
            71.9A6.781,6.781,0,0,1,51,80.7a6.75,6.75,0,1,1,3.7-8.8Z"
            fill="#fac244"
          />
        </g>
        <g
          class="Group_2" data-name="Group 2"
        >
          <circle
            class="Ellipse_4" data-name="Ellipse 4" cx="4.4" cy="4.4" r="4.4"
            transform="translate(48.4 23)" fill="#fac244"
          />
          <path
            class="Path_4" data-name="Path 4"
            d="M64.3,25.2a13.572,13.572,0,0,0-3.7-6.4,20.287,20.287,0,0,1,1.8-2.6,4.857,4.857,0,0,0,
              2.4,0,4.916,4.916,0,0,0,3.7-5.7,4.916,4.916,0,0,0-5.7-3.7,4.814,4.814,0,0,0-3.7,5.7,
              3.839,3.839,0,0,0,.9,1.8l-1.8,2.6a13.923,13.923,0,0,0-7.9-1.1A11.846,11.846,0,
              1,0,55.1,39C61.8,37.9,65.7,31.8,64.3,25.2ZM63.1,9a2.709,2.709,0,0,1,3.3,2.2,2.8,2.8,0,
              1,1-5.5,1.1A2.587,2.587,0,0,1,63.1,9ZM44.9,29.6a8.043,8.043,0,1,1,15.7-3.5c.8,4.3-1.8,
              8.8-6.1,9.6A8.134,8.134,0,0,1,44.9,29.6Z"
              fill="#2f94d1"
            />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Preloader extends Vue {

  }
</script>

<style scoped lang="scss">
  @keyframes spin-path1 {
    from, 25% {
      transform: translate(0, 0);
    }

    95%, to {
      transform: translate(-10px, -10px);
    }
  }

  @keyframes spin-path2 {
    from, 25% {
      transform: translate(0, 0);
    }

    95%, to {
      transform: translate(10px, 10px);
    }
  }

  @keyframes spin-ellipse1 {
    from, 25% {
      transform: translate(26.3px, 44.8px);
    }

    95%, to {
      transform: translate(16.3px ,34.8px);
    }
  }

  @keyframes spin-ellipse2 {
    from, 25% {
      transform: translate(60.9px, 48.4px);
    }

    95%, to {
      transform: translate(70.9px, 58.4px);
    }
  }

  @keyframes spin-group1 {
    from, 25% {
      transform: translate(0, 0);
    }

    95%, to {
      transform: translate(-10px, 10px);
    }
  }

  @keyframes spin-group2 {
    from, 25% {
      transform: translate(0, 0);
    }

    95%, to {
      transform: translate(10px, -10px);
    }
  }

  @keyframes spin-base {
    10%, from {
      transform: rotate(0deg);
    }

    50%, 60% {
      transform: rotate(180deg);
    }

    95%, to {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 10rem;

    $animation-time: 1.5s;

    .logomark {
      transform-origin: 50px 50px;
      animation: 2*$animation-time infinite normal spin-base;
    }

    .Path_1 {
      animation: $animation-time infinite alternate spin-path1;
    }

    .Path_2 {
      animation: $animation-time infinite alternate spin-path2;
    }

    .Ellipse_1 {
      animation: $animation-time infinite alternate spin-ellipse1;
    }

    .Ellipse_2 {
      animation: $animation-time infinite alternate spin-ellipse2;
    }

    .Group_1 {
      animation: $animation-time infinite alternate spin-group1;
    }

    .Group_2 {
      animation: $animation-time infinite alternate spin-group2;
    }
  }
</style>
