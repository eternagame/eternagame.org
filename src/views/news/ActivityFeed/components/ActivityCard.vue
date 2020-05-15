<template>
  <MessageThread
    v-if="isNotification"
    :messages="message"
    :senderPicture="target2_picture"
    :senderName="target2_name"
    :targetName="target_name"
    :targetPicture="target_picture"
  >
  </MessageThread>
  <SmartLink v-else-if="body || content" :link="link">
    <div class="page-content card">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col p-0">
            <!-- Note: Any space between these tags will misalign the Type tag. -->
            <div :style="{ color: typeColor }">
              <b>{{ formattedType }}</b>
            </div>
          </div>
          <div class="col p-0" style="text-align:right">
            <div style="opacity: 0.5;">
              <b>{{ timeCreated }}</b>
            </div>
          </div>
        </div>

        <h3 class="card-title" v-if="title">{{ title }}</h3>
        <div class="row d-flex" v-else style="margin-top:10px" />
        <div v-dompurify-html="strippedBody" class="text" />
        <div v-if="commentcount" class="d-flex">
          <img src="@/assets/comment-count.svg" />
          <p class="icon-text">{{ commentcount }}</p>
        </div>
      </div>
    </div>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import MessageThread from './MessageThread.vue';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: { SmartLink, MessageThread },
  })
  export default class ActivityCard extends Vue {
    @Prop() private created!: string;

    @Prop() private timestamp!: string;

    @Prop() private type!: string;

    @Prop() private title!: string;

    @Prop() private body!: string;

    @Prop() private entry!: object;

    @Prop() private message!: object;

    @Prop() private content!: string;

    @Prop() private nid!: string;

    @Prop() private commentcount!: string;

    @Prop() private target2_picture!: string;

    @Prop() private target2_name!: string;

    @Prop() private target_name!: string;

    @Prop() private target_picture!: string;

    @Prop({ default: 'blogs' }) private type!: string;

    private link = this.nid && `/news/${this.nid}`;

    private isNotification = this.type === 'notifications';

    get timeCreated() {
      if (!this.isNotification) return this.created;
      return new Date(Number(this.created) * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    get formattedType(): string {
      const formatted = this.type.toUpperCase();
      if (formatted === 'BLOGS') {
        // Unpluralize, since it sounds better
        return 'BLOG';
      }
      return formatted;
    }

    // TODO consolidate
    get strippedBody(): string {
      // For now, remove all html tags, since <ul> and <img> can break formatting.
      const text = this.content || this.body;
      return text && text.replace(/(<([^>]+)>)/gi, '');
    }

    get typeColor() {
      switch (this.type.toLowerCase()) {
        case 'blogs':
          return '#53b64e';
        case 'labs':
          return '#50b2dc';
        case 'announcements':
        case 'news':
          return '#f39c12';
        default:
          return '#53b64e';
      }
    }
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
