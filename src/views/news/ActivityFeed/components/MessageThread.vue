<template>
  <div>
    <div class="page-content card">
      <MessageItem
        v-for="(item, index) in messages"
        :key="item.created"
        v-bind="item"
        :article="article"
        :first="index === 0"
      />
      <div style="margin-top: 5px;">
        <b-button
          class="mt-2"
          variant="primary"
          @click="showCompose = !showCompose"
          v-if="!showCompose && messages[0].type == 'message'"
        >
          {{ $t('activity-feed:reply') }}
        </b-button>
        <MessageCompose
          :parentNID="this.article.nid"
          :uid="replyUID"
          v-if="showCompose"
          @cancel="showCompose = false"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { NewsItem, UserMessage } from '@/types/common-types';
  import MessageItem from './MessageItem.vue';
  import MessageCompose from './MessageCompose.vue';

  @Component({
    components: { MessageItem, MessageCompose },
  })
  export default class MessageThread extends Vue {
    @Prop() private article!: NewsItem;

    private showCompose = false;

    private messages = this.article.message;

    get replyUID() {
      return String(this.article.target_uid) !== String(this.$vxm.user.uid)
        ? this.article.target_uid
        : this.article.target2_uid;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .card {
    color: $white;

    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }
</style>
