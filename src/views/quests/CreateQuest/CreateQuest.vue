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
          <input :placeholder="$t('create-quest:puzzle-info:add-puzzle-description')" />
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
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
    },
  })
  export default class CreateQuest extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  h2 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.52rem;
    margin-top: 0.92rem;
  }

  h3 {
    font-size: 1.0666666666666667rem;
    font-weight: bold;
    margin-top: 1.6rem;
  }

  input {
    background-color: rgba(16, 16, 16, 0.5);
    border: solid 0.04rem $dark-blue;
    padding: 0.8666666666666667rem;
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
    font-size: 1.3333333333333333rem;
    font-weight: bold;
  }
</style>
