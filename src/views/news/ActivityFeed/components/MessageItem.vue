<template>
  <div class="container">
    <a v-if="created" :name="created"></a>
    <div class="row justify-content-between">
      <div class="col p-0" style="text-align:right">
        <div class="b" style="opacity: 0.5;">{{ timeCreated }}</div>
      </div>
    </div>

    <div :style="{ marginLeft: !first && '50px' }">
      <div class="row d-flex" :style="{ marginTop: '10px' }">
        <SmartLink v-if="senderPicture" :link="'/players/' + sender">
          <img
            class="d-none d-sm-block rounded-circle player-image"
            :src="'/' + senderPicture"
            style="margin-right:10px"
          />
        </SmartLink>
        <p v-if="senderName" style="margin-top:5px">{{ senderName }} > {{ getterName }}:</p>
      </div>
      <div v-dompurify-html="content.body || content" class="text" />
      <a v-if="content.body" :href="`/${content.node.node_type}s/${content.node.id}`">
        {{ content.node.title }}</a
      >
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import SmartLink from '@/components/Common/SmartLink.vue';

  @Component({
    components: { SmartLink },
  })
  export default class MessageItem extends Vue {
    @Prop() private created!: string;

    @Prop() private content: string | object;

    @Prop() private first: boolean;

    @Prop() private sender!: string;

    @Prop() private article!: object;

    private senderName =
      this.sender === this.article.target_uid
        ? this.article.target_name
        : this.article.target2_name;

    private getterName =
      this.sender === this.article.target_uid
        ? this.article.target2_name
        : this.article.target_name;

    private senderPicture =
      this.sender === this.article.target_uid
        ? this.article.target_picture
        : this.article.target2_picture;

    get timeCreated() {
      return new Date(Number(this.created) * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
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

  .text ::v-deep img {
    max-width: 100% !important;
  }
</style>
