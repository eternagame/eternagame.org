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
            <div style="opacity: 0.5; font-weight: bold;">
              {{ date }}
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <h3 class="card-title" v-if="article.title">{{ article.title }}</h3>
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
  import MessageThread from '@/views/feed/ActivityFeed/components/MessageThread.vue';

  @Component({
    components: { SmartLink, MessageThread },
  })
  export default class NewsActivity extends Vue {
    @Prop({ required: true }) readonly article!: NewsItemType|BlogItem;

    private get link() {
      return `/news/${this.article.nid}`;
    }

    private get commentCount() {
      return this.article.type === NotificationType.NEWS ?
        this.article.commentcount
        : this.article.comments.length;
    }

    private get date() {
      return new Date(this.article.created).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    private formattedType = Utils.formattedType;

    private strippedBody = Utils.strippedBody;

    private typeColor = Utils.typeColor;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  :deep(.card-body) {
    padding: 11.25px !important;
  }

  .card-title {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    color: $white;
  }

  .card {
    color: $white;
    padding: 1rem 2rem;
    margin-bottom: 0.1rem;
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
