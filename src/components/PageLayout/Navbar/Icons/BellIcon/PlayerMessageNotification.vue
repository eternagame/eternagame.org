<template>
  <div class="d-flex" v-if="article">
    <img
      class="d-none d-sm-block rounded-circle player-image-large"
      :src="'/' + img"
      v-if="img"
      style="margin-right:10px;position:relative;top:10px;width:30px;height:30px"
    />
    <div class="description">
      <span v-if="name">
        {{ name }}
        {{ `${$t('bell-icon:message')} ` }}</span
      >
      <b v-if="display" v-dompurify-html="strippedBody(display)"> </b>
      <b v-else> {{ $t('loading-text') }}</b>
    </div>
  </div>
</template>
<script lang="ts">
  // @ts-ignore
  import get from 'lodash.get';
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import { NewsItem } from '@/types/common-types';
  import Utils from '@/utils/utils';

  Vue.use(VueDOMPurifyHTML);

  @Component({
    components: {},
  })
  export default class PlayerMessageNotification extends Vue {
    private strippedBody = Utils.strippedBody;

    @Prop() private article: object;

    private name =
      this.article.sender === this.article.target_uid
        ? this.article.target_name
        : this.article.target2_name;

    private img =
      this.article.sender === this.article.target_uid
        ? this.article.target_picture
        : this.article.target2_picture;

    private display = this.article.content.body || this.article.content;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .icon {
    margin-left: -0.2rem;
  }

  ::v-deep a {
    padding-right: 10px !important;
    padding-left: 10px !important;
    border-radius: 3px;
  }

  .activity-container {
    padding: 4%;
    width: 300px;
    max-width: 100%;
  }

  .header {
    font-size: 16px;
    font-weight: bold;
    margin-top: 14.5px;
  }

  .border {
    border: 1px solid red;
    width: 100%;
  }

  .description {
    margin-top: 5px;
    font-weight: normal;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-transform: none;
  }
</style>
