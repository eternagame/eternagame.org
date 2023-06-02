<template>
  <EternaPage v-if="fetchState.firstFetchComplete && script" :title="script.title">
    <b-card v-if="script.body">
      <div
        style="overflow-wrap: break-word;"
        v-dompurify-html="script.body"
      />
    </b-card>

    <b-card class="mt-4" v-if="script.type === 'Etc'">
      <template v-for="input in inputs">
        <div :key="input.value">
          <label :for="`script-input-${input.value}`" style="width: 100%;">
            <div class="mb-1">{{ input.value }}</div>
            <textarea :id="`script-input-${input.value}`" style="width:100%; height: 40px;" v-model="input.val"></textarea>
          </label>
        </div>
      </template>
      <label for="script-execution-timeout" class="mt-4 mr-3">
        Timeout (in seconds) <input id="script-execution-timeout" type="number" placeholder="10" v-model="timeout">
      </label>
      <b-btn variant="primary" @click="evaluate">Evaluate</b-btn>
      <b-btn variant="danger" @click="srcdoc = ''" v-if="srcdoc" class="ml-2">Clear Output</b-btn>
      <iframe title="script-execution" v-if="srcdoc" :srcdoc="srcdoc" :key="executionNonce" />
    </b-card>

    <b-card class="mt-4">
      <CodeMirror :source="script.source" :editable="false" />
    </b-card>
    <Comments :comments="comments" :nid="script.nid" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        header="Script Info"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" alt="info" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="script">
          <li>
            <img :src="avatar" alt="author" class="icon" />{{ script.author.name }}<span v-b-tooltip.hover title="Trusted author" v-if="script.is_trusted === '1'">&nbsp;✔</span>
          </li>
          <li>{{ script.type }}</li>
          <li>{{ script.is_private === '1' ? 'Private' : 'Public' }}</li>
        </ul>
      </SidebarPanel>
      <div>
        <div v-if="isInSidebar" class="mb-2">
          <b-btn variant="primary" @click="toggleFavorite" :disabled="processingFavorite">
            {{ script.is_favorite === '1' ? 'Unfavorite' : 'Favorite' }}
            <b-spinner v-if="processingFavorite" small></b-spinner>
          </b-btn>
        </div>
        <div v-if="isInSidebar && script.uid === $vxm.user.uid?.toString()" class="mb-2">
          <b-btn variant="primary" :to="`/scripts/${$route.params.id}/edit`">Edit</b-btn>
        </div>
        <div v-if="isInSidebar" class="mb-2">
          <b-btn variant="primary" @click="copy">Make A Copy</b-btn>
        </div>
        <FollowPanel :nid="$route.params.id" :isInSidebar="isInSidebar" v-if="isInSidebar" />
      </div>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { Script, ScriptResponse, CommentItem } from '@/types/common-types';
  import FollowPanel from '@/components/Sidebar/FollowPanel.vue';
  import Utils from '@/utils/utils';
  import CodeMirror from '../components/CodeMirror.vue';

  @Component({
    components: {
      EternaPage,
      SidebarPanel,
      Preloader,
      Comments,
      FollowPanel,
      CodeMirror
    },
  })
  export default class ScriptView extends Mixins(FetchMixin) {
    script: Script | null = null;

    inputs: {value: string; val: string}[] = [];

    comments: CommentItem[] = [];

    processingFavorite = false;

    srcdoc = '';

    timeout = '';

    executionNonce = 0;

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=script&need=script&id=${this.$route.params.id}`)
      ).data.data as ScriptResponse;
      // eslint-disable-next-line prefer-destructuring
      this.script = res.script[0];
      this.inputs = JSON.parse(this.script.input).map((input: {value: string}) => ({value: input.value, val: ''}));
      this.comments = res.comments;
    }

    get avatar() {
      return Utils.getAvatar(null);
    }

    async toggleFavorite() {
      if (!this.script) return;

      this.processingFavorite = true;

      try {
        await this.$http.post('/post/', new URLSearchParams({
          type: "script",
          need: 'favorite',
          'nid': this.$route.params.id,
          'should_favorite': (!(this.script.is_favorite === '1')).toString()
        }));

        await this.$fetch();
      } finally {
        this.processingFavorite = false;
      }
    }

    copy() {
      this.$router.push({
        name: 'script-create',
        params: {
          originalScript: JSON.stringify(this.script)
        }
      });
    }

    evaluate() {
      if (!this.script) return;

      // Ensure the iframe is destroyed and recreated
      this.executionNonce = Date.now();

      this.srcdoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/jquery/jquery-1.7.2.min.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/jquery/jquery-unselectable.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/jquery-ui/jquery-ui-1.8.7.custom.min.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/json/json2.js"></${'script'}>

          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/application.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/utils.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/ajaxmanager.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/datamanager.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/usermanager.js"></${'script'}>

          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/eterna/eterna-application.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/eterna/eterna-utils.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/eterna/script-library.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/eterna/script-interface.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/workbranch_main/frontend/jscripts/eterna/presenter.js"></${'script'}>
      </head>
      <body>
          <div id="result"></div>
          <${'script'}>
            ScriptInterface.evaluate_script_with_nid(${this.$route.params.id}, ${JSON.stringify(Object.fromEntries(this.inputs.map(input => [input.value, input.val])))}, function(result) {
              Pervasives.outln("<br>Return : " + result['cause'])
              Pervasives.outln("Evaluation time : " + result['eval_time']/1000 + " sec")
            });
          </${'script'}>
      </body>
      </html>
      `;
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }

  li {
    margin-bottom: 20px;
  }

  iframe {
    width: 100%;
    height: 400px;
    margin-top: 10px;
    background-color: white;
    border: none;
  }
</style>
