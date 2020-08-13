<template>
  <div class="d-flex align-items-start">
    <img :src="avatar" style="width: 40px; flex-shrink: 0;" />
    <div class="ml-2 mb-4" style="min-width: 0px;">
      <router-link :to="`/players/${uid}`">
        <p class="commenter-name mb-0">
          {{ name }}
        </p></router-link
      >
      <p style="font-size: 0.6rem">{{ created }}</p>
      <p v-dompurify-html="comment" style="overflow-wrap: break-word;">{{ comment }}</p>
      <button @click="deleteComment()" v-if="canDelete" style="cursor:pointer" class="btn btn-danger" :disabled="deleting">
        {{ $t('page:comments-delete') }}
        <b-spinner v-if="deleting" small></b-spinner>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import Utils from '@/utils/utils';
  import { CommentItem } from '@/types/common-types';

  const ADD_COMMENT_ROUTE = '/post/';

  @Component({
    components: {},
  })
  export default class Comment extends Vue {
    @Prop({ required: true }) readonly name!: string;

    @Prop({ required: true }) readonly created!: string;

    @Prop({ required: true }) readonly comment!: CommentItem;

    @Prop({ required: true }) readonly uid!: string;

    @Prop({ required: true }) readonly picture!: string;

    deleting: boolean = false;

    get canDelete() {
      return String(this.$vxm.user.uid) === this.uid;
    }

    get avatar() {
      return Utils.getAvatar(this.picture);
    }

    deleteComment() {
      this.deleting = true;
      axios
        .post(
          ADD_COMMENT_ROUTE,
          new URLSearchParams({ type: 'delete_comment', cid: this.$vnode.key as string }),
        )
        .then(() => this.$emit('deleted'));
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
