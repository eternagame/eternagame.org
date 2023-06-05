<template>
  <div style="height: 100%; display: flex;">
    <notifications position="top center" width="50%"/>
    <div style="width:30%; min-height:1px; height: 100%; z-index: 1; padding: 10px;">
      <div style="height: 100%; display: flex; flex-direction: column;">
        <div>
          <div>
            <div style="float:left; margin-top:5px;">Authoring Tool</div>
          </div>
          <b-btn variant="primary" style="float:right; margin: 3px;" @click="test">Test</b-btn>
          <b-btn variant="primary" style="float:right; margin: 3px;" @click="save">Save</b-btn>
          <b-btn variant="secondary" style="float:right; margin: 3px;" href="https://docs.google.com/document/d/1XwEd_5QVPu-u-GHRClyCjM5BWrUi6v1sk56nbAYusBs/edit" target="blank">Documentation</b-btn>
        </div>
        <div style="padding: 10px 10px 20px 10px; width: 94%; flex-grow: 1; display: flex; flex-direction: column;">
          <textarea aria-label="tutorial script" wrap="off" v-model="script"></textarea>
        </div>
      </div>
    </div>
    <div style="width:70%;height: 100%; min-height:1px;">
      <!--
        We use a key here because if we just change the URL without recreating the iframe, we'll wind up with an extra entry
        in the browser's history stack corresponding to the iframe navigation in addition to the top-level navigation we performed
      -->
      <iframe id="game" title="Game" :src="gameUrl" :key="gameUrl" ref="game"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Ref } from 'vue-property-decorator';
  import {z} from 'zod';
  import FetchMixin from '@/mixins/FetchMixin';
  import { PuzzleResponse } from '@/types/common-types';

  const eventSchema = z.object({
    type: z.literal('navigate'),
    detail: z.string()
  });

  @Component({})
  export default class PuzzleTutorialEdit extends Mixins(FetchMixin) {
    @Ref('game') gameFrame!: HTMLIFrameElement;

    script = '';

    async fetch() {
      const puzzleRes = (await this.$http.get(`/get/?type=puzzle&&nid=${this.$route.params.id}`)).data.data as PuzzleResponse;
      this.script = (puzzleRes.puzzle.rscript || '');
      if (!this.script.includes('\n')) {
        // For some reason, on legacy tutorials got their newlines stripped. This makes tutorials saved at that time
        // minimally readable
        this.script = this.script.split('; ').join(';\n');
      }
    }

    async mounted() {
      super.mounted();
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

    test() {
      const origin = process.env.VUE_APP_API_BASE_URL.startsWith('http')
        ? process.env.VUE_APP_API_BASE_URL
        : window.origin;
      this.gameFrame.contentWindow?.postMessage({
        type: 'testTutorial',
        puzzleId: this.$route.params.id,
        script: this.script
      }, origin);
    }

    async save() {
      const res = await this.$http.post('/post/', new URLSearchParams({
        type: 'save_puzzle_tutorial',
        nid: this.$route.params.id,
        tutorial: this.script
      }));
      if (res.data.data.success) {
        this.$notify({
          type: 'success',
          text: 'Tutorial saved',
        });
      } else {
        this.$notify({
          type: 'error',
          text: 'Tutorial failed to save - maybe you don\'t own this puzzle?',
        });
      }
    }

    get gameUrl() {
      return `${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/index.html?puzzle=${this.$route.params.id}`;
    }
  }
</script>

<style lang="scss" scoped>
#game {
  width: 100%;
  height: 100%;
  border: 0;
}

textarea {
  width:100%;
  height: 100%;
  overflow:scroll;
  color:white;
  background-color:dimgray;
  border: 1px solid #CCCCCC;
  font-size:14px;
  flex-grow: 1;
}
</style>
