<template>
  <div style="margin:10px;">
    <vue-circle
      :progress="(100 * progress) / total"
      :size="isMobile ? 65 : 100"
      :reverse="false"
      :fill="{ color: `${color}` }"
      line-cap="round"
      empty-fill="rgba(255, 255, 255, .2)"
      :animation-start-value="0.0"
      :start-angle="4.7"
      insert-mode="append"
      :thickness="isMobile ? 6 : 10"
      :show-percent="false"
    >
      <p class="larger-text" style="font-weight: bold; margin: 0; padding-top: 0.3rem">
        {{ progress }}
      </p>
      <p class="smaller-text">/{{ total }}</p>
    </vue-circle>

    <p class="smaller-text" style="font-weight: bold;">{{ name }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
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

    get isMobile() {
      // Possibly should use a library like vue-mq instead
      return window.matchMedia('(max-width: 567px)').matches;
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .larger-text {
    font-size: 20px;
  }
  .smaller-text {
    font-size: 12px;
  }

  @include media-breakpoint-down(sm) {
    .larger-text {
      font-size: 12px;
    }
    .smaller-text {
      font-size: 8px;
    }
  }
</style>
