<template>
  <div class="d-flex align-items-start">
    <img src="@/assets/navbar/DefaultIcon.svg" />
    <div class="ml-2 mb-4">
      <p class="font-weight-bold mb-0">{{ name }}</p>
      <p style="font-size: 0.6rem">{{ created }}</p>
      <p v-dompurify-html="comment">{{ comment }}</p>
      <p @click="deleteComment()" v-if="canDelete" style="cursor:pointer">
        {{ $t('page:comments-delete') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import axios from 'axios';

  const ADD_COMMENT_ROUTE = '/post/?type=delete_comment';

  Vue.use(VueDOMPurifyHTML);

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

    get canDelete() {
      return this.$vxm.user.uid === this.comment.cid;
    }

    deleteComment() {
      axios
        .post(ADD_COMMENT_ROUTE, { cid: this.comment.cid })
        .then(res => window.location.reload());
    }
  }
</script>

<style scoped lang="scss">
  .header-content {
    bottom: 10px;
    left: 10px;
  }

  .body {
    padding: 40px 30px 5px;
  }
</style>
