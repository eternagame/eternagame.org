<template>
  <div>
    <MessageThread v-if="isPlayerMessage" :article="article"> </MessageThread>
    <NewsItem :article="article" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import MessageThread from './MessageThread.vue';
  import NewsItem from './NewsItem.vue';

  @Component({
    components: { MessageThread, NewsItem },
  })
  export default class ActivityCard extends Vue {
    @Prop() private article!: string;

    private isPlayerMessage = this.article.type === 'notifications';
  }
</script>

<style lang="scss" scoped></style>
