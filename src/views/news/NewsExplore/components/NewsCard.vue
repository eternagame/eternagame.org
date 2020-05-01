<template>
  <div class="page-content card" @click="redirect()">
    <!-- Padding: top right bottom  left -->
    <div class="container" style="padding:10px">
      <div class="row justify-content-between">
        <div class="col">
          <div v-bind:style="{ color: categoryColor }">{{ `${category.toUpperCase()}` }}</div>
        </div>
        <div class="col" style="text-align:right">
          <div style="opacity: 0.5;">{{ timeStamp }}</div>
        </div>
      </div>
      <div class="row">
        <p style="font-size:20px;font-weight:bold;marginBottom:0px">{{ title }}</p>
        <div v-dompurify-html="body" class="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: {},
  })
  export default class NewsCard extends Vue {
    @Prop() private timeStamp!: string;

    @Prop() private title!: string;

    @Prop() private body!: string;

    @Prop() private nid!: string;

    @Prop({ default: '' }) private category!: string;

    redirect() {
      this.$router.push(`/news/${this.nid}`);
    }

    get categoryColor() {
      switch (this.category.toLowerCase()) {
        case 'blogs':
          return '#53b64e';
        case 'labs':
          return '#50b2dc';
        case 'announcements':
          return '#f39c12';
        default:
          return '#53b64e';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card {
    margin-bottom: 50px;
    max-height: 600px;
  }

  .text {
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // max-height: 100px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
