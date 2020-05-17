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
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import get from 'lodash.get';
  import MessageItem from './MessageItem.vue';

  @Component({
    components: { MessageItem },
  })
  export default class MessageThread extends Vue {
    @Prop() private article!: Array<object>;

    private messages = this.article.message;
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
