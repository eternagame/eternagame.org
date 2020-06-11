<template>
  <div>
    <div style="width:100; border: none;">
      <span class="header-content">
        <h3
          style="font-size: 23px;font-weight: bold;margin-top:15px"
        >{{ name || $t('page:comments-title') }}</h3>
      </span>
    </div>
    <div class="card body">
      <div v-if="nid && loggedIn">
        <textarea
          rows="4"
          class="form-control"
          v-model="commentText"
          :placeholder="$t('page:comments-enter')"
        />
        <b-button
          type="submit"
          style="float: right"
          variant="primary"
          @click="submit"
          :disabled="!commentText || submitting"
        >
          {{ $t('page:comments-action') }}
          <b-spinner v-if="submitting" small></b-spinner>
        </b-button>
      </div>
      <Comment v-for="comment in newestComments" :key="comment.cid" v-bind="comment" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { CommentItem } from '@/types/common-types';
  import Comment from './Comment.vue';

  const ADD_COMMENT_ROUTE = '/post/';

@Component({
  components: { Comment },
})
  export default class Comments extends Vue {
  @Prop({ default: [] }) readonly comments!: CommentItem[];

  @Prop({ required: true }) readonly nid!: string;

  @Prop() readonly name?: string;

  private newComments = null;

  private commentText: string = '';

  private submitting = false;

  get loggedIn() {
    return this.$vxm.user.loggedIn;
  }

  get newestComments() {
    return this.newComments || this.comments;
  }

  submit() {
    this.submitting = true;
    axios
      .post(
        ADD_COMMENT_ROUTE,
        new URLSearchParams({
          type: 'post_comment',
          body: this.commentText,
          nid: this.nid,
        }),
      )
      .then(res => {
        this.newComments = res.data.data.comments;
        this.submitting = false;
        this.commentText = '';
      });
  }
  }
</script>

<style scoped lang="scss">
.header-content {
  bottom: 10px;
  left: 10px;
}

.body {
  padding: 1.5rem;
}

.form-control {
  margin: 0;
  margin-bottom: 0.5rem;
  background-color: #01010188;
}
</style>
