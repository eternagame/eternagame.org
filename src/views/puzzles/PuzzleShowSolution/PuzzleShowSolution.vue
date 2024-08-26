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
  export default class PuzzleShowSolution extends Vue {
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
      let mode: string;
      switch (this.$route.name) {
      case 'puzzle-show-solution-copy':
        mode = 'solution_copy_and_view';
        break;
      case 'puzzle-show-solution-result':
        mode = 'solution_solution_see_result';
        break;
      default:
        // Should never happen, because no route should load this component with an unhandled name
        throw new Error('Cant find mode from route name');
      }
      return `${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/index.html?mode=${mode}&puzzle=${this.$route.params.id}&solution=${this.$route.params.solid}`;
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
