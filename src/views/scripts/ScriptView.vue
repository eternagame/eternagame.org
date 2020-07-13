<template>
  <EternaPage v-if="script" :title="script.title">
    <div class="page-content">
      <div class="d-flex flex-wrap " xs="12" sm="8">

        <div class="order-sm-1 col-sm-12" style="padding-right: 0px">
          <hr class="top-border d-sm-none" />
          <div
            class="script-description"
            style="word-wrap: break-word; padding: 0"
            v-dompurify-html="script.body"
          />
          <button
              class="btn btn-primary mt-2"
              style="position: relative; right: 0"
              v-if="script.author && script.author.name === $vxm.user.username"
              @click="removeScript">
                <router-link style="color: white; text-decoration: none" to="/scripts">Remove</router-link>
            </button>
        </div>
      </div>
    </div>

    <div class="page-content" style="margin-top: 10px">
      <div class="d-flex flex-wrap " xs="12" sm="8">
        <div class="order-sm-1" style="width: 100%">
          <div class="clear-header" id="clear-header-input">
            <h6>Input</h6>
            <button class="btn clear-button btn-primary" @click="clearInputs">
              Clear
            </button>
          </div>
          <ul style="list-style-type: none" class="list-group">
            <li v-for="input in Object.keys(inputs).filter(e => e !== 'timeout')" :key="input">
              <span style="display: inline-block; width: 150px;">{{ input }}</span>
              <input v-model="inputs[input]" class='form-control form-control-sm mr-sm-2 align-middle' style="width: auto; display: inline-block;">
            </li>
            <li>
              <span style="display: inline-block; width: 150px;">Timeout</span>
              <input v-model="inputs.timeout" class='form-control form-control-sm' style="width: auto; display: inline-block;">
            </li>
          </ul>
        </div>
        <div class="order-sm-2 cols-sm-10" style="width: 100%">
          <codemirror style="width: 100%" :options="codeOptions" v-model="code" />
          <button class="btn btn-primary" @click="evaluate">Evaluate</button>
          <router-link :to="`/create/script/${script.nid}`" style="margin-left: 10px"><button class="btn btn-primary">Edit</button></router-link>
        </div>
        <div class="order-sm-3 cols-sm-10" style="width: 100%">
          <div class="clear-header">
          <h6>Output</h6>
          <button class="btn float-right btn-primary" @click="results = ''">Clear</button>
          </div>
          <div class="script-output" v-dompurify-html="results" />
        </div>
      </div>
    </div>

    <Comments
      :comments="data.comments || []"
      :nid="script.nid"
    />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        header="Script Info"
        :headerIcon="require('@/assets/info.svg')"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" >
        </template>
        <ul style="padding: 0; list-style-type:none">
          <li v-if="script.author && script.author.name">
            <img src="@/assets/navbar/DefaultIcon.svg" class="icon">{{ script.author.name }}
          </li>
          <li v-if="script.pageview">
            <img src="@/assets/people.svg" class="icon" /> &emsp;
            {{ script.pageview }}
          </li>
          <li v-if="scriptDate !== ''"> &emsp;
            <img src="@/assets/calendar.svg" class="icon" />{{ scriptDate }}
          </li>
          <li v-if="script.type">
            <img src="@/assets/test-tube.svg" class="icon" />{{ script.type }}
          </li>
          <li v-if="script.success_rate">
            <span style="font-weight: bold; text-align: center" class="icon">%</span> {{script.success_rate}}
          </li>
        </ul>
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>
<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { VXM } from '@/types/vue.d';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import { codemirror } from 'vue-codemirror';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import { EternaScript } from 'eternascript';
  import { Script } from './Script';


  // Addons for codemirror
  const js = require('codemirror/mode/javascript/javascript.js');
  const gutter = require('codemirror/addon/fold/foldgutter.js');
  const fold = require('codemirror/addon/fold/foldcode.js');
  const brace = require('codemirror/addon/fold/brace-fold');

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

  async function increasePageViews(route: Route, http: AxiosInstance, vxm: VXM) {
    const { filters } = route.query;

    const params = new FormData();
    params.set('type', 'script');
    params.set('need', 'increase_pageview');
    params.set('id', route.params.nid);
    params.set('rnd', '0.704488224442372');

    const header = {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'multipart/form-data',
    };
    http.post(POST_ROUTE, params, {
      headers:  {
        header,
      }
    });
  }


  @Component({
    components: {
      EternaPage,
      codemirror,
      SidebarPanel,
      Comments,
    }
  })
  export default class ScriptView extends Vue {
    evaluate() {
      const eternaScript = new EternaScript(this.code, this.inputs);

    }

    data : any = {};

    code = '';

    created() {
      fetchPageData(this.$route, this.$http, this.$vxm).then(e => {
        this.data = e;
        this.code = this.data.script[0].source;
        if (!this.script.input) return;
        if (this.script && this.script.input !== undefined && JSON.parse(this.script.input)) {
          const inputs = JSON.parse(this.script.input) as {
            value: string,
          }[];
          if (inputs && inputs.length > 0 && inputs.forEach) {
            inputs.forEach(i => {
              Vue.set(this.inputs, i.value, '');
            });
          }
        }
      });
      increasePageViews(this.$route, this.$http, this.$vxm);
    }


    @Watch('code')
    hint() {
      if (this.$refs && this.$refs.editor) this.$refs.editor.codemirror.showHint();
    }

    get codeOptions() {
      return {
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true,
        line: true,
        readOnly: !this.enabled,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchBrackets: true,
        autoCloseBrackets: true,
        hintOptions: {
          completeSingle: false,
        },
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
      timeout: string;
    } = {
      timeout: '10',
    };

    enabled = false;

    results = '';

    clearInputs() {
      Object.keys(this.inputs).forEach(e => Vue.set(this.inputs, e, ''));
    }

    async removeScript() {
      const params = new FormData();
      params.set('type', 'remove_script');
      params.set('nid', this.script.nid);
      params.set('rnd', '0.704488224442372');

      const header = {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'multipart/form-data',
      };
      this.$http.post('/post/', params, {
        headers:  {
          header,
        }
      });
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
</style>