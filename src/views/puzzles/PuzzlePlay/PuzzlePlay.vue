<template>
  <div>
    <!--
      We use a key here because if we just change the URL without recreating the iframe, we'll wind up with an extra entry
      in the browser's history stack corresponding to the iframe navigation in addition to the top-level navigation we performed
    -->
    <iframe id="game" title="Game" :src="gameUrl" :key="iframeNonce" v-if="iframePuzzleId"></iframe>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { PuzzleResponse } from '@/types/common-types';
  import {z} from 'zod';

  const eventSchema = z.union([
    z.object({
      type: z.literal('navigate'),
      detail: z.string()
    }),
    z.object({
      type: z.literal('puzzleChange'),
      detail: z.string()
    })
  ]);

  @Component({})
  export default class PuzzlePlay extends Vue {
    iframePuzzleId = '';

    iframeSequence: string | null = null;

    iframeNonce = '';

    currentlyRouting = false;

    mounted() {
      this.messageHandler = this.messageHandler.bind(this);
      window.addEventListener('message', this.messageHandler);
      this.loadNewPuzzle(this.$route.params.id);
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
          case 'puzzleChange':
            this.currentlyRouting = true;
            this.$router.push(`/puzzles/${parsed.data.detail}/play`);
            break;
          default:
            break;
          }
        }
      }
    }

    async loadNewPuzzle(nid: string) {
      if (!nid) return;

      let sequence = null;
      if (this.$vxm.user.uid) {
        const puzzleRes = (await this.$http.get(`/get/?type=puzzle&nid=${nid}`)).data.data as PuzzleResponse;
        if (puzzleRes.puzzle.type === 'Challenge') {
          const solutions = (await this.$http.get(`/get/?type=solutions&puznid=${nid}&uid=${this.$vxm.user.uid}`)).data.data.solutions as {sequence: string}[] | null | undefined;
          sequence = solutions?.[0]?.sequence || null;
        }
      }

      this.iframeSequence = sequence;
      this.iframePuzzleId = nid;
      // We have to use a separate nonce from the puzzle ID because if we initially load puzzle a,
      // then continue to puzzle b, then route back to puzzle a, the puzzle ID will still refer to a,
      // which means the route would not change. We don't always update the ID in the iframe because we
      // want to allow the code in the iframe reload "in place"
      this.iframeNonce = Date.now().toString();
      this.updateLatestPuzzle();
    }

    @Watch('$route.params.id')
    puzzleChanged(newId: string) {
      if (!this.currentlyRouting) {
        this.loadNewPuzzle(newId);
      } else {
        // The param change was done in response to a puzzle change event from the iframe.
        // We don't want to change the iframe properties (it's got that covered) but we do want to
        // register the new puzzle under the player's latest activity
        this.currentlyRouting = false;
        this.updateLatestPuzzle();
      }
    }

    get gameUrl() {
      const sequenceParam = this.iframeSequence ? `&sequence=${this.iframeSequence}` : '';
      return `${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/index.html?puzzle=${this.iframePuzzleId}${sequenceParam}`;
    }

    async updateLatestPuzzle() {
      await this.$http.post('/post/', new URLSearchParams({
        type: 'latest_puzzle',
        nid: this.$route.params.id
      }));
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
