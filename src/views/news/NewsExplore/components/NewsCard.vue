<template>
  <router-link :to="`/news/${article.nid}`">
    <div class="page-content card">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col p-0">
            <!-- Note: Any space between these tags will misalign the Type tag. -->
            <div class="b" :style="{ color: typeColor(article) }">{{ formattedType(article) }}</div>
          </div>
          <div class="col p-0" style="text-align:right">
            <div class="b" style="opacity: 0.5;">{{ article.created }}</div>
          </div>
        </div>
        <div class="row">
          <h3 class="card-title">{{ article.title }}</h3>
          <div v-dompurify-html="strippedBody(article.body)" class="text" />
        </div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  interface Article {
    created: string;
    body: string;
    title: string;
    nid: string;
    type: string;
  }

  @Component({
    components: {},
  })
  export default class NewsCard extends Vue {
    @Prop() private article!: Article;

    @Prop({ default: 'blogs' }) private type!: string;

    private formattedType = Utils.formattedType;

    private strippedBody = Utils.strippedBody;

    private typeColor = Utils.typeColor;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

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
