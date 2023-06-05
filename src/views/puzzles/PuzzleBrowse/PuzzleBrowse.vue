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
  export default class PuzzleBrowse extends Vue {
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
      const {filter1, filter1_arg1, filter1_arg2} = this.$route.query;
      const filter1Param = filter1 ? `&filter1=${filter1}` : '';
      const arg1Param = filter1_arg1 ? `&filter1_arg1=${filter1_arg1}` : '';
      const arg2Param = filter1_arg2 ? `&filter1_arg2=${filter1_arg2}` : '';
      return `${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/index.html?mode=design_browser&puzzle=${this.$route.params.id}${filter1Param}${arg1Param}${arg2Param}`;
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
