<template>
  <EternaPage :title="$t('nav-bar:create-quest')">
    <div class="page-content">
      <div class="page-divider">
        <div class="first-half">
          <h2>{{ $t('create-quest:quest-info:header') }}</h2>

          <h3>{{ $t('create-quest:quest-info:title') }}</h3>
          <input :placeholder="$t('create-quest:quest-info:title-description')" />

          <h3>{{ $t('create-quest:quest-info:tags') }}</h3>
          <textarea
            class="create-quest-text-area"
            :placeholder="$t('create-quest:quest-info:tags-description')"
            :style="{ paddingBottom: '120px' }"
          />

          <h3>{{ $t('create-quest:quest-info:description') }}</h3>
          <textarea
            class="create-quest-text-area"
            :placeholder="$t('create-quest:quest-info:description-description')"
            :style="{ paddingBottom: '120px' }"
          />

          <h3>
            {{ $t('create-quest:quest-info:image') }}
            <span style="font-weight:normal">{{
              $t('create-quest:quest-info:image-optional')
            }}</span>
          </h3>
          <div class="input-group add-image-input-group">
            <input :placeholder="$t('create-quest:quest-info:image-description')" />
            <button type="button" class="btn add-image-btn">
              {{ $t('create-quest:quest-info:image-button-text') }}
            </button>
          </div>
          <p class="image-tip">
            {{ $t('create-quest:quest-info:image-tip') }}
          </p>

          <button type="button" class="btn btn-primary save-btn">
            {{ $t('create-quest:quest-info:main-action') }}
          </button>
        </div>

        <div class="second-half">
          <h2 class="second-half-heading">
            {{ $t('create-quest:puzzle-info:header') }}
          </h2>

          <div class="second-half-input-group add-a-puzzle-input">
            <h3>{{ $t('create-quest:puzzle-info:add-puzzle') }}</h3>
            <input :placeholder="$t('create-quest:puzzle-info:add-puzzle-description')" />
            <button type="button" class="btn puzzle-btn">
              {{ $t('create-quest:puzzle-info:secondary-action') }}
            </button>
          </div>

          <div class="second-half-input-group puzzle-list-input">
            <h3>
              {{ $t('create-quest:puzzle-info:puzzle-list') }}
              <span style="font-weight:normal">
                {{ $t('create-quest:puzzle-info:puzzle-list-tip') }}
              </span>
            </h3>
            <ul class="puzzle-list-items">
              <li class="puzzle-list-item">
                <img class="puzzle-list-icon" src="@/assets/square-45.svg">
                <span class="puzzle-item-text">Meechl's FMN Switch</span>
                <span class="puzzle-item-author">by Meechl</span>
                <span class="cancel-puzzle-item-btn">X</span>
              </li>
              <li class="puzzle-list-item">
                <img class="puzzle-list-icon" src="@/assets/square-45.svg">
                <span class="puzzle-item-text">Using the Shift Tool</span>
                <span class="puzzle-item-author">by Omei</span>
                <span class="cancel-puzzle-item-btn">X</span>
              </li>
              <li class="puzzle-list-item">
                <img class="puzzle-list-icon" src="@/assets/square-45.svg">
                <span class="puzzle-item-text">Short String 4</span>
                <span class="puzzle-item-author">by Brourd</span>
                <span class="cancel-puzzle-item-btn">X</span>
              </li>
              <li class="puzzle-list-item">
                <img class="puzzle-list-icon" src="@/assets/square-45.svg">
                <span class="puzzle-item-text">Corner Bulge Training</span>
                <span class="puzzle-item-author">by Eli Fisker</span>
                <span class="cancel-puzzle-item-btn">X</span>
              </li>
              <li class="puzzle-list-item">
                <img class="puzzle-list-icon" src="@/assets/square-45.svg">
                <span class="puzzle-item-text">Bullseye</span>
                <span class="puzzle-item-author">by hoglahoo</span>
                <span class="cancel-puzzle-item-btn">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tips-and-resources">
        <h2 class="aside-content">
            {{ $t('side-bar:tips') }}
        </h2>

        <div>
          <h3>{{ $t('create-quest:puzzle-info:add-puzzle') }}</h3>
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
  .page-content {
    width: 75%;
    display: flex;
  }

  .page-divider {
    display: flex;
    justify-content: space-between;
  }

  .add-image-input-group {
    display: flex;
    margin-bottom: 7px;
  }

  .puzzle-btn,
  .add-image-btn {
    background-color: $med-blue;
    width: 124px;
    border-radius: 5px;
    color: white;
  }

  .add-image-btn {
    margin-left: -7.8rem;
  }

  .image-tip {
    font-size: 0.625rem;
  }

  .puzzle-btn {
    margin-top: 9px;
    margin-bottom: 45px;
  }

  .second-half-input-group,
  .second-half-heading {
    margin-left: 50px;
  }


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

  input,
  .create-quest-text-area {
    background-color: rgba(16, 16, 16, 0.5);
    border: solid 0.04rem $dark-blue;
    padding: 0.8666666666666667rem;
    width: 370px;
    height: 40px;
    vertical-align: top;
  }

  .save-btn {
    width: 185px;
    height: 40px;
    border-radius: 5px;
    margin: 50px 0px;
    font-size: 1.3333333333333333rem;
    font-weight: bold;
    padding: 0;
  }

  .puzzle-list-items {
    border-radius: 5px;
    list-style: none;
    background-color: #05224b;
    padding-left: 15px;
    width: 400px;
  }

  .puzzle-list-item {
    padding: 13px 0;
    margin-top: 3px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    position: relative;
  }

  .puzzle-item-text {
    font-size: .9rem;
    line-height: 17px;
  }

  .puzzle-list-icon {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }

  .puzzle-item-author {
    font-size: .8rem;
    font-weight: 100;
    margin-left: 5px;
    margin-top: .2rem;
    align-self: center;
  }
  .cancel-puzzle-item-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #999;
    color: #043468;
    display: flex;
    position: absolute;
    right: .7rem;
    cursor: pointer;
    justify-content: center;
  }


</style>
