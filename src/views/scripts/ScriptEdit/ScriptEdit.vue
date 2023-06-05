<template>
  <EternaPage v-if="fetchState.firstFetchComplete">
    <b-card>
      <label for="script-title" style="width: 100%">
        Title
        <input type="text" id="script-title" v-model="title" style="width: 100%" />
      </label>
      <label for="script-description" style="width: 100%">
        Description
        <textarea id="script-description" v-model="body" style="width: 100%"></textarea>
      </label>
      <label for="script-private">
        Private
        <input type="checkbox" id="script-private" v-model="private"/>
      </label>
      <br />
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
      <label>
        Script Type
        <b-form-select v-model="type" :options="['Booster', 'Etc']" style="background-color: white; color: black;"></b-form-select>
      </label>
    </b-card>

    <b-card class="mt-4">
      <div style="margin-bottom: 10px; display: flex; justify-content: right;"><b-btn variant="secondary" to="/scripts/docs">Documentation</b-btn></div>
      <CodeMirror :source="source" :editable="true" @source:changed="source=$event"/>
    </b-card>

    <b-card class="mt-4">
      <template v-for="input in inputs">
        <div :key="input.value">
          <label :for="`script-input-${input.value}`" style="width: 100%;">
            <div class="mb-1">{{ input.value }}</div>
            <textarea :id="`script-input-${input.value}`" style="width:100%; height: 40px;" v-model="input.val"></textarea>
            <b-btn variant="danger" size="sm" class="mt-1" @click="removeInput(input)">Remove Input</b-btn>
          </label>
        </div>
      </template>
      <div>
        <label :for="`script-new-input`" style="width: 100%;">
          <div class="mb-1">Input Name</div>
          <div style="display: flex; align-content: center;">
            <input type="text" id="script-new-input" v-model="newInput" />
            <b-btn variant="primary" size="sm" class="ml-2" @click="addInput">Add Input</b-btn>
          </div>
        </label>
      </div>
      <label for="script-execution-timeout" class="mt-4 mr-3">
        Timeout (in seconds) <input id="script-execution-timeout" type="number" placeholder="10" v-model="timeout">
      </label>
      <b-btn variant="primary" @click="evaluate">Evaluate</b-btn>
      <b-btn variant="danger" @click="srcdoc = ''" v-if="srcdoc" class="ml-2">Clear Output</b-btn>
      <iframe title="script-execution" v-if="srcdoc" :srcdoc="srcdoc" :key="executionNonce" />
    </b-card>

    <b-card class="mt-4">
      <b-alert variant="danger" :show="!!errString">{{ errString }}</b-alert>
      <div style="display: flex; justify-content: center; gap: 10px;">
        <b-btn variant="primary" @click="save" :disabled="processing">Save</b-btn>
        <b-btn variant="danger" v-if="$route.params.id" @click="remove" :disabled="processing">Remove</b-btn>
        <b-btn variant="secondary" v-if="$route.params.id" :to="`/scripts/${$route.params.id}`">Cancel</b-btn>
        <b-btn variant="secondary" v-else to="/scripts">Cancel</b-btn>
      </div>
    </b-card>
  </EternaPage>
  <Preloader v-else style="margin-top: 15rem;" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { Script, ScriptResponse } from '@/types/common-types';
  import FollowPanel from '@/components/Sidebar/FollowPanel.vue';
  import Utils from '@/utils/utils';
  import CodeMirror from '../components/CodeMirror.vue';

  interface ScriptInput { value: string; val: string; }

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
  export default class ScriptEdit extends Mixins(FetchMixin) {
    processing = false;

    errString = '';

    inputs: ScriptInput[] = [];

    processingFavorite = false;

    type = 'Etc';

    title = '';

    body = '';

    source = '';

    srcdoc = '';

    timeout = '';

    validNewInput = '';

    private = false;

    executionNonce = 0;

    get newInput() {
      return this.validNewInput;
    }

    set newInput(val: string) {
      this.validNewInput = val.replaceAll(/^[^a-zA-Z_$]|[^\w$]/g, '_');
    }

    async fetch() {
      if (this.$route.params.id || this.$route.params.originalScript) {
        let script: Script;
        if (this.$route.params.id) {
          const res = (
            await this.$http.get(`/get/?type=script&need=script&id=${this.$route.params.id}`)
          ).data.data as ScriptResponse;
          // eslint-disable-next-line prefer-destructuring
          script = res.script[0];
        } else {
          script = JSON.parse(this.$route.params.originalScript);
        }
        this.type = script.type;
        this.source = script.source;
        this.inputs = JSON.parse(script.input).map((input: {value: string}) => ({value: input.value, val: ''}));
        this.body = script.body;
        this.title = script.title;
        this.private = script.is_private === '1';
      }
    }

    get avatar() {
      return Utils.getAvatar(null);
    }

    removeInput(input: ScriptInput) {
      this.inputs.splice(this.inputs.indexOf(input), 1);
    }

    addInput() {
      if (!this.newInput) return;
      this.inputs.push({value: this.newInput, val: ''});
      this.newInput = '';
    }

    async save() {
      if (!this.title) {
        this.errString = 'Please provide a title';
        return;
      }

      this.processing = true;

      this.errString = '';

      const res = await this.$http.post('/post/', new URLSearchParams({
        type: 'script',
        need: 'save',
        title: this.title,
        script_type: this.type,
        is_private: this.private ? 'true' : 'false',
        source: this.source,
        input: JSON.stringify(this.inputs.map(input => ({value: input.value}))),
        description: this.body,
        ...(this.$route.params.id ? {parent_nid: this.$route.params.id} : {}),
      }));
      const id = res.data.data.nid;
      if (id) {
        this.$router.replace(`/scripts/${id}`);
      }
    }

    async remove() {
      this.processing = true;
      await this.$http.post('/post/', new URLSearchParams({
        type: 'remove_script',
        nid: this.$route.params.id
      }));
      this.$router.replace('/scripts');
    }

    evaluate() {
      // Ensure the iframe is destroyed and recreated
      this.executionNonce = Date.now();

      this.srcdoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery/jquery-1.7.2.min.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery/jquery-unselectable.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery-ui/jquery-ui-1.8.7.custom.min.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/json/json2.js"></${'script'}>

          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/application.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/utils.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/ajaxmanager.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/datamanager.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/usermanager.js"></${'script'}>

          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/eterna-application.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/eterna-utils.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/script-library.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/script-interface.js"></${'script'}>
          <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/presenter.js"></${'script'}>
      </head>
      <body>
          <div id="result"></div>
          <${'script'}>
            DataManager.stash_data({user: {
              uid: ${this.$vxm.user.uid},
              name: ${JSON.stringify(this.$vxm.user.username)},
              rank: ${this.$vxm.user.rank},
              points: ${this.$vxm.user.points}
            }});
            Application.on_initialize();
            const inputs = ScriptInterface.codify_input(${JSON.stringify(this.inputs)});
            const code = ScriptInterface.insert_timeout(${JSON.stringify(this.source)}, ${this.timeout})
            const result = ScriptInterface.evaluate(inputs+code);
            Pervasives.outln("<br>Return : " + result['cause'])
            Pervasives.outln("Evaluation time : " + result['eval_time']/1000 + " sec")
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
