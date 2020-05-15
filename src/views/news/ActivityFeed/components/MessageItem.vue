<template>
  <div class="container">
    <a v-if="created" :name="created"></a>
    <div class="row justify-content-between">
      <div class="col p-0" style="text-align:right">
        <div class="b" style="opacity: 0.5;">{{ timeCreated }}</div>
      </div>
    </div>

    <div class="row d-flex" style="margin-top:10px">
      <img
        class="d-none d-sm-block rounded-circle player-image"
        :src="'/' + senderPicture"
        v-if="senderPicture"
        style="margin-right:10px"
      />
      <p v-if="senderName" style="margin-top:5px">{{ senderName }}:</p>
    </div>
    <div v-dompurify-html="strippedBody(content)" class="text" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: {},
  })
  export default class MessageItem extends Vue {
    @Prop() private created!: string;

    @Prop() private content: string;

    @Prop() private sender!: string;

    @Prop() private senderPicture!: string;

    @Prop() private senderName!: string;

    @Prop() private targetPicture!: string;

    @Prop() private targetName!: string;

    get timeCreated() {
      return new Date(Number(this.created) * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    // TODO consolidate
    strippedBody(text: string): string {
      // For now, remove all html tags, since <ul> and <img> can break formatting.
      return text && text.replace(/(<([^>]+)>)/gi, '');
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
