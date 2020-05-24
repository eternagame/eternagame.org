<template>
  <div class="d-flex">
    <div class="description">
      <b v-if="title" v-dompurify-html="strippedBody(title)"> </b>
      <b v-else> {{ $t('loading-text') }}</b>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import Utils from '@/utils/utils';

  @Component({
    components: {},
  })
  export default class NewsNotification extends Vue {
    @Prop() private title!: string;

    private strippedBody = Utils.strippedBody;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

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
