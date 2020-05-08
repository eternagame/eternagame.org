<template>
  <div v-if="comments">
    <div style="width:100; border: none;">
      <span class="header-content">
        <h3 style="font-size: 23px;font-weight: bold;margin-top:15px">
          {{ name || $t('page:comments-title') }}
        </h3>
      </span>
    </div>
    <div class="card body">
      <div v-if="pathname && loggedIn">
        <textarea
          class="form-control"
          v-model="commentText"
          :placeholder="$t('page:comments-enter')"
        />
        <b-button
          type="submit"
          style="float: right"
          variant="primary"
          @click="submit"
          :disabled="!commentText"
          >{{ $t('page:comments-action') }}</b-button
        >
      </div>
      <Comment v-for="comment in comments" :key="comment.cid" v-bind="comment" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import Comment from './Comment.vue';

  const ADD_COMMENT_ROUTE = '/post/?type=post_comment';

  @Component({
    components: { Comment },
  })
  export default class Comments extends Vue {
    @Prop({ default: [] })
    private comments;

    @Prop()
    private pathname!: string;

    @Prop()
    private name!: string;

    private commentText: string = '';

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }

    submit() {
      axios
        .post(ADD_COMMENT_ROUTE, { pathname: this.pathname, body: this.commentText })
        .then(res => {});
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
