<template>
  <EternaPage v-if="script" :title="`${$route.params.nid ? 'Edit' : 'Create'} Script`">
    <div class="page-content">
      <div class="d-flex flex-wrap " xs="12" sm="8">

        <div class="order-sm-1">
          <hr class="top-border d-sm-none" />
          <div class="edit-row"><span>Title</span>
            <input class="edit-row-input form-control form-control-sm" v-model="script.title"></div>
          <div class="edit-row">
            <span>Type</span> <select class="edit-row-input custom-select" v-model="script.type">
              <option>Booster</option>
              <option>Etc</option>
              <option>RNA scoring</option>
              <option>Puzzle solving</option>
            </select>
          </div>
          <div class="edit-row"><span style="vertical-align:top">Description</span><textarea
            class="edit-row-input script-description form-control form-control-sm"
            placeholder="Description"
            style="word-wrap: break-word;"
            v-model="script.body"
          /></div>
        </div>
      </div>
    </div>

    <div class="page-content" style="margin-top: 10px">
      <div class="d-flex flex-wrap " xs="12" sm="8">
        <div class="order-sm-1 cols-sm-10" style="width: 100%">
          <div class="clear-header" id="clear-header-input">
            <h6>Input</h6>
            <button class="btn clear-button" @click="clearInputs">
              Clear
            </button>
          </div>
          <ul style="list-style-type: none; padding: 0">
            <li v-for="input in Object.keys(inputs)" :key="input">
              <span style="display: inline-block; width: 150px">{{ input }}</span>
              <input class="form-control form-control-sm" style="max-width: 150px; display: inline-block" v-model="inputs[input]">
            </li>
          </ul>
        </div>
        <div class="order-sm-2 cols-sm-10" style="width: 100%">
          <codemirror style="width: 100%" :options="codeOptions" v-model="code" />
          <button class="btn green" @click="evaluate">Evaluate</button>
          <button class="btn green" style="margin-left: 10px" @click="post">Save</button>
          <button class="btn green" style="margin-left: 10px" @click="cancel">Cancel</button>
        </div>
        <div class="order-sm-3 cols-sm-10" style="width: 100%">
          <div class="clear-header">
          <h6>Output</h6>
          <button class="btn clear-button" @click="results = ''">Clear</button>
          </div>
          <div class="script-output" v-dompurify-html="results" />
        </div>
      </div>
    </div>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>
<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  // eslint-disable-next-line import/no-unresolved
  import get from 'lodash.get';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { VXM } from '@/types/vue.d';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import { codemirror } from 'vue-codemirror';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import { Script } from './Script';

  const js = require('codemirror/mode/javascript/javascript.js');

  const INITIAL_SORT = 'date';
  const INITIAL_SIZE = 10;
  const INITIAL_SKIP = 0;

  const ROUTE = '/get/?type=script';
  const POST_ROUTE = '/post/';

  async function fetchPageData(route: Route, http: AxiosInstance, vxm: VXM) {
    const { filters } = route.query;
    const params = {
      need: 'script',
      id: route.params.nid,
      rnd: 0.704488224442372,
    };

    const res = (
      await http.get(ROUTE, {
        params,
      })
    ).data.data;
    return res;
  }

  async function postScript(route: Route, http: AxiosInstance, vxm: VXM, script: Script) {
    const { filters } = route.query;

    const params = new FormData();
    params.set('type', 'script');
    params.set('need', 'save');
    if (route.params && route.params.nid && script.author.name === vxm.user.username) {
      params.set('parent_nid', route.params.nid);
    }
    params.set('author', JSON.stringify({
      name: vxm.user.username,
      uid: vxm.user.uid,
    }));
    params.set('input', JSON.stringify(script.input));
    params.set('description', script.body);
    params.set('script_type', script.type);
    params.set('title', script.title);
    params.set('source', script.source);
    params.set('rnd', '0.704488224442372');

    const header = {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'multipart/form-data',
    };
    const res = (
      await http.post(POST_ROUTE, params, {
        headers:  {
          header,
        }
      })
    ).data.data;
    return res;
  }

  async function removeScript(route: Route, http: AxiosInstance, vxm: VXM, script: Script) {
    const params = new FormData();
    params.set('type', 'remove_script');
    params.set('nid', script.nid);
    params.set('rnd', '0.704488224442372');

    const header = {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'multipart/form-data',
    };
    const res = (
      await http.post(POST_ROUTE, params, {
        headers:  {
          header,
        }
      })
    ).data.data;
    return res;
  }


  @Component({
    components: {
      EternaPage,
      codemirror,
      Preloader
    }
  })
  export default class ScriptCreate extends Vue {
    evaluate() {
      this.results += 'Not implemented yet <br>';
      const timeout = parseInt(this.inputs.Timeout || '10', 10);
      // TODO
    }

    data : any = {};

    code = '';

    created() {
      if (this.$route.params.nid) {
        fetchPageData(this.$route, this.$http, this.$vxm).then(e => {
          this.data = e;
          this.code = this.data.script[0].source || '';
          if (this.data.script[0].input !== '[]' && JSON.parse(this.data.script[0].input)) {
            const inputs = JSON.parse(this.data.script[0].input) as { value: string }[];
            inputs.forEach(i => {
              Vue.set(this.inputs, i.value, '');
            });
          }
        });
      }
    }

    get codeOptions() {
      return {
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true,
        line: true,
        readOnly: !this.enabled,
      };
    }

    get script() {
      return this.data.script ? this.data.script[0] : {};
    }

    get scriptDate() {
      if (!this.script || !this.script.time) return '';
      const dateString = this.script.time;
      // Has to be multiplied by 1000 for Date constructor to work (milliseconds)
      const dateNum = parseInt(this.script.time, 10) * 1000;
      return new Date(dateNum).toLocaleDateString('en-US');
    }

    inputs: {
      [name: string]: string;
    } = {
      Timeout: '10',
    };

    enabled = true;

    results = '';

    clearInputs() {
      Object.keys(this.inputs).forEach(e => Vue.set(this.inputs, e, ''));
    }

    post() {
      this.script.source = this.code;
      postScript(this.$route, this.$http, this.$vxm, this.script).then(e => {
        if (this.script.author.name !== this.$vxm.user.username) {
          const {nid} = e;
          this.$router.push(`/create/script/${nid}`);
          this.script.author.name = this.$vxm.user.username;
        }
      });;
    }

    cancel() {
      this.$router.push(`/script/${this.script.nid}`);
    }
  }
</script>
<style>
@import '~codemirror/lib/codemirror.css';
.CodeMirror {
  height: 800px !important;
  border-radius: 5px;
  margin: 5px 0px;
  width: inherit;
}
</style>
<style lang="scss" scoped>
  @import '@/styles/global.scss'; 
  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }
  li {
    margin-bottom: 20px;
  }
  .script-output {
    background-color: white;
    font-family: monospace;
    color: black;
    width: 100%;
    overflow: auto;
    height: 200px;
    padding: 2px;
    border-radius: 5px;
    margin: 5px 0px;
  }
  .clear-button {
    background-color: $green;
    position: relative;
    float: right;
  }
  .clear-header {
    overflow: hidden;
    margin: 10px 0;
  }
  #clear-header-input {
    margin: 0;
  }
  .clear-header > h6 {
    margin-bottom: 0;
    display: inline-block;
    vertical-align: sub;
  }
  .green {
    background-color: $green;
  }
  .edit-row-input {
    margin-left: 21px;
    width: 200px;
    display: inline-block;
  }
  textarea.edit-row-input {
    width: 500px;
    height: 5rem;
    resize: none;
  }
  .edit-row > select {
    margin-left: 18px;
  }
  .edit-row {
    position: relative;
  }
  .edit-row > span {
    width: 100px;
    display: inline-block;
  }
</style>