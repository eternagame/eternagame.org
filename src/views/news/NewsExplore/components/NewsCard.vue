<template>
  <div class="page-content card" @click="redirect()">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col p-0">
          <!-- Note: Any space between these tags will misalign the Type tag. -->
          <div class="b" :style="{ color: typeColor }">{{ formattedType }}</div>
        </div>
        <div class="col p-0" style="text-align:right">
          <div class="b" style="opacity: 0.5;">{{ created }}</div>
        </div>
      </div>
      <div class="row">
        <h3 class="card-title">{{ title }}</h3>
        <div v-dompurify-html="strippedBody" class="text" />
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
    @Prop() private created!: string;

    @Prop() private title!: string;

    @Prop() private body!: string;

    @Prop() private nid!: string;

    @Prop({ default: 'blogs' }) private type!: string;

    redirect() {
      this.$router.push(`/news/${this.nid}`);
    }

    get formattedType(): string {
      const formatted = this.type.toUpperCase();
      if (formatted === 'BLOGS') {
        // Unpluralize, since it sounds better
        return 'BLOG';
      }
      return formatted;
    }

    get strippedBody(): string {
      // For now, remove all html tags, since <ul> and <img> can break formatting.
      return this.body.replace(/(<([^>]+)>)/gi, '');
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
  }

  .b {
    font-weight: bold;
  }

  .card {
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    max-height: 600px;
    cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
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
