<template>
  <div>
    <div class="page-content card">
      <MessageItem
        v-for="item in messages"
        :key="item.created"
        v-bind="item"
        :senderName="senderName"
        :senderPicture="senderPicture"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import MessageItem from './MessageItem.vue';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: { MessageItem },
  })
  export default class MessageThread extends Vue {
    @Prop() private timestamp!: string;

    @Prop() private messages;

    @Prop() private senderPicture!: string;

    @Prop() private senderName!: string;

    @Prop() private targetPicture!: string;

    @Prop() private targetName!: string;

    // TODO consolidate
    get timeCreated() {
      if (this.type !== 'message') return this.created;
      return new Date(Number(this.created) * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

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

  .player-image {
    width: 30px;
    height: 30px;
  }

  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: $white;
  }

  .b {
    font-weight: bold;
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
