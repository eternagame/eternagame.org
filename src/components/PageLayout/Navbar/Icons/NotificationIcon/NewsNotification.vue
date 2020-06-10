<template>
  <BaseNotification :to="`/news/${article.nid}`" :content="article.title" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { NewsItem, BlogItem } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import BaseNotification from './BaseNotification.vue';

  @Component({
    components: {
      BaseNotification
    },
  })
  export default class NewsNotification extends Vue {
    @Prop({ required: true }) readonly article!: NewsItem | BlogItem;

    private strippedBody = Utils.strippedBody;
  }
</script>
