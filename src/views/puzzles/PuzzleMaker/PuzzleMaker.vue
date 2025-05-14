<template>
  <div>
    <!--
      We use a key here because if we just change the URL without recreating the iframe, we'll wind up with an extra entry
      in the browser's history stack corresponding to the iframe navigation in addition to the top-level navigation we performed
    -->
    <iframe id="game" title="Game" :src="gameUrl" :key="gameUrl"></iframe>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {z} from 'zod';

  const eventSchema = z.object({
    type: z.literal('navigate'),
    detail: z.string()
  });

  @Component({})
  export default class PuzzleMaker extends Vue {
    mounted() {
      this.messageHandler = this.messageHandler.bind(this);
      window.addEventListener('message', this.messageHandler);
    }

    beforeDestroy() {
      window.removeEventListener('message', this.messageHandler);
    }

    messageHandler(event: MessageEvent<unknown>) {
      const origin = process.env.VUE_APP_API_BASE_URL.startsWith('http')
        ? process.env.VUE_APP_API_BASE_URL
        : window.origin;
      if (event.origin === origin) {
        const parsed = eventSchema.safeParse(event.data);
        if (parsed.success) {
          switch (parsed.data.type) {
          case 'navigate':
            this.$router.push(parsed.data.detail);
            break;
          default:
            break;
          }
        }
      }
    }

    get gameUrl() {
      const states = Math.min(+this.$route.query.states || 1, 3);
      const targets = this.$route.query.states ? `&puzzleEditNumTargets=${states}` : '';
      const experimentalFeatures = this.$vxm.user.featureFlags.includes('rnet-publishing') ? '&experimentalFeatures=rnet-publishing' : '';
      return `${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/index.html?mode=puzzlemaker${targets}${experimentalFeatures}`;
    }
  }
</script>

<style lang="scss" scoped>
#game {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: 0;
}
</style>
