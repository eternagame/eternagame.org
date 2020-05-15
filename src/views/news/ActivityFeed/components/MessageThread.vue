<template>
  <div>
    <div class="page-content card">
      <MessageItem
        v-for="(item, index) in messages"
        :key="item.created"
        v-bind="item"
        :senderName="senderName"
        :senderPicture="senderPicture"
        :first="index === 0"
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
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

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
</style>
