<template>
  <SmartLink :link="link">
    <div class="page-content card">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col p-0">
            <!-- Note: Any space between these tags will misalign the Type tag. -->
            <div :style="{ color: typeColor(article) }">
              <b>{{ formattedType(article) }}</b>
            </div>
          </div>
          <div class="col p-0" style="text-align:right">
            <div style="opacity: 0.5;">
              <b>{{ article.created }}</b>
            </div>
          </div>
        </div>

        <h3 class="card-title" v-if="article.title">{{ article.title }}</h3>
        <div class="row d-flex" v-else style="margin-top:10px" />
        <div v-dompurify-html="strippedBody(article.body)" class="text" />
        <div v-if="commentCount" class="d-flex">
          <img src="@/assets/comment-count.svg" />
          <p class="icon-text">{{ commentCount }}</p>
        </div>
      </div>
    </div>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import Utils from '@/utils/utils';
  import {NewsItem as NewsItemType, BlogItem, NotificationType} from '@/types/common-types';
  import MessageThread from './MessageThread.vue';

  @Component({
    components: { SmartLink, MessageThread },
  })
  export default class NewsItem extends Vue {
    @Prop({ required: true }) readonly article!: NewsItemType|BlogItem;

    private get link() {
      return `/news/${this.article.nid}`;
    }

    private get commentCount() {
      return this.article.type === NotificationType.NEWS ?
        this.article.commentcount
        : this.article.comments.length;
    }

    private formattedType = Utils.formattedType;

    private strippedBody = Utils.strippedBody;

    private typeColor = Utils.typeColor;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: $white;
  }

  .icon-text {
    margin-left: 7px;
    position: relative;
    top: 7px;
    font-weight: bold;
  }

  .card {
    color: $white;
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    max-height: 600px;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }

  a:hover {
    text-decoration: none;
  }

  .text {
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // max-height: 100px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
