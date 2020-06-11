<template>
  <div v-if="total" style="margin-right:10px">
    <vue-circle
      :key="$mq"
      :progress="(100 * progress) / total"
      :size="$mq === 'small' ? 75 : 100"
      :reverse="false"
      :fill="{ color: `${color}` }"
      line-cap="round"
      empty-fill="rgba(255, 255, 255, .2)"
      :animation-start-value="0.0"
      :start-angle="4.7"
      insert-mode="append"
      :thickness="$mq === 'small' ? 6 : 10"
      :show-percent="false"
    >
      <p class="larger-text" style="font-weight: bold; margin: 0; padding-top: 0.3rem">
        {{ progress }}
      </p>
      <p class="smaller-text">/{{ total }}</p>
    </vue-circle>

    <p class="smaller-text" style="font-weight: bold; width:120px">{{ $t(name) }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import VueCircle from 'vue2-circle-progress/src/index.vue';
  // @ts-ignore
  import VueMq from 'vue-mq';

  Vue.use(VueMq, {
    breakpoints: {
      small: 768,
      lg: Infinity,
    },
  });

  @Component({
    components: { VueCircle },
  })
  export default class Progress extends Vue {
    @Prop({ required: true }) readonly name!: string;

    @Prop({ required: true }) readonly color!: string;

    @Prop({ default: 0 }) readonly progress!: number;

    @Prop({ required: true }) readonly total!: number;
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

  p {
    margin-bottom: 0;
  }

  @include media-breakpoint-down(sm) {
    .larger-text {
      font-size: 16px;
    }
    .smaller-text {
      font-size: 12px;
    }
  }
</style>
