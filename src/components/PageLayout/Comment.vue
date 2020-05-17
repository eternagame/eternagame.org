<template>
  <div class="d-flex align-items-start">
    <img :src="avatar" style="width: 40px;"/>
    <div class="ml-2 mb-4">
      <router-link :to="`/players/${uid}`">
        <p class="commenter-name mb-0">
          {{ name }}
        </p></router-link
      >
      <p style="font-size: 0.6rem">{{ created }}</p>
      <p v-dompurify-html="comment" style="word-break: break-all;">{{ comment }}</p>
      <p @click="deleteComment()" v-if="canDelete" style="cursor:pointer">
        {{ $t('page:comments-delete') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import Utils from '@/utils/utils';

  const ADD_COMMENT_ROUTE = '/post/';

  @Component({
    components: {},
  })
  export default class Comment extends Vue {
    @Prop()
    private name!: string;

    @Prop()
    private created!: string;

    @Prop()
    private comment!: string;

    @Prop()
    private uid!: string;

    @Prop()
    private picture!: string;

    get canDelete() {
      return this.$vxm.user.uid === this.comment.cid;
    }

    get avatar() {
      return Utils.getAvatar(this.picture);
    }

    deleteComment() {
      axios
        .post(
          ADD_COMMENT_ROUTE,
          new URLSearchParams({ type: 'delete_comment', cid: this.comment.cid }),
        )
        .then(res => window.location.reload());
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .header-content {
    bottom: 10px;
    left: 10px;
  }

  .body {
    padding: 40px 30px 5px;
  }

  .commenter-name {
    font-weight: bold;
    color: $white;
  }
</style>
