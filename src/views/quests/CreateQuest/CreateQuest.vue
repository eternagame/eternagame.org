<template>
  <EternaPage :title="$t('nav-bar:create-quest')">
    <div class="page-content">
      <div class="d-flex">
        <div>
          <h2>{{ $t('create-quest:quest-info:header') }}</h2>

          <h3>{{ $t('create-quest:quest-info:title') }}</h3>
          <input :placeholder="$t('create-quest:quest-info:title-description')" />

          <h3>{{ $t('create-quest:quest-info:description') }}</h3>
          <input
            :placeholder="$t('create-quest:quest-info:description-description')"
            :style="{ paddingBottom: '120px' }"
          />

          <h3>
            {{ $t('create-quest:quest-info:image') }}
            <span style="font-weight:normal">{{
              $t('create-quest:quest-info:image-optional')
            }}</span>
          </h3>
          <div class="input-group">
            <input :placeholder="$t('create-quest:quest-info:image-description')" />
            <button type="button" class="btn secondary">
              {{ $t('create-quest:quest-info:image-button-text') }}
            </button>
          </div>
          <p>
            {{ $t('create-quest:quest-info:image-tip') }}
          </p>

          <button type="button" class="btn btn-primary save">
            {{ $t('create-quest:quest-info:main-action') }}
          </button>
        </div>

        <div>
          <h2>
            {{ $t('create-quest:puzzle-info:header') }}
          </h2>

          <h3>{{ $t('create-quest:puzzle-info:add-puzzle') }}</h3>
           <vue-bootstrap-typeahead
          ref="typeahead"
          :placeholder="$t('create-quest:puzzle-info:add-puzzle-description')"
          v-model="targetName"
          :data="puzzlenames"
          :serializer="user => user.username"
          :key="messagesSent"
        >
          <template slot="suggestion" slot-scope="{ data, htmlText }">
            <div class="d-flex align-items-center">
              <img
                v-if="data.userpicture"
                class="rounded-circle"
                :src="`/${data.userpicture}`"
                style="width: 40px; height: 40px;margin-right:10px"
              />

              <span v-dompurify-html="htmlText" style="color: white"></span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
          <div class="input-group">
            <button type="button" class="btn secondary">
              {{ $t('create-quest:puzzle-info:secondary-action') }}
            </button>
          </div>
          <h3>
            {{ $t('create-quest:puzzle-info:puzzle-list') }}
            <span style="font-weight:normal">
              {{ $t('create-quest:puzzle-info:puzzle-list-tip') }}
            </span>
          </h3>
        </div>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  // @ts-ignore
  import debounce from 'lodash.debounce';
  import { Component, Vue, Mixins, Watch, Ref } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import LabViewData, { LabData } from './types';
  // @ts-ignore
  @Component({
    components: {
      EternaPage,
      TagsPanel,
      VueBootstrapTypeahead,
    },
  })
  export default class CreateQuest extends Vue 
  {
    targetName = '';

    puzzlenames = [];

    fetchData: () => Promise<void> | undefined = async () => {};

    async dofetchData() {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.puzzlenames = res.data.data.usernames;
    }

    created() {
      this.fetchData = debounce(this.fetchData, 200);
    }

    @Watch('targetName', { immediate: true, deep: true })
    getUserNames() {
      this.fetchData();
    }

    @Ref('typeahead') readonly typeahead!: { inputValue: string };

    mounted() {
      if (this.$route.query.message) {
        this.typeahead.inputValue = String(this.$route.query.message);
        this.targetName = String(this.$route.query.message);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 7.8px;
    margin-top: 13.8px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 24px;
  }

  input {
    background-color: rgba(16, 16, 16, 0.5);
    color: white;
    border: solid 0.6px $dark-blue;
    padding: 13px;
    width: 370px;
    height: 40px;
    vertical-align: top;
  }

  .secondary {
    background-color: $med-blue;
    width: 124px;
    border-radius: 5px;
    color: white;
    margin-top: 9px;
  }

  .save {
    width: 185px;
    height: 40px;
    border-radius: 5px;
    margin: 50px 0px;
    font-size: 20px;
    font-weight: bold;
  }
</style>
