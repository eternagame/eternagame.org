<template>
  <EternaPage :title="$t('chat:title')">
    <div id="full-page-chat-container" style="width:100%;height:505px"></div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import { Chat } from 'eterna-chat';

  @Component({
    components: { EternaPage },
  })
  export default class FullPageChat extends Vue {
    mounted() {
      console.log(this.$vxm.user.username);
      const chat = new Chat({
        container: document.getElementById('full-page-chat-container'),
        username: this.$vxm.user.username,
        uid: this.$vxm.user.uid,
        onHidden: () => {
          console.log('Chat.onHidden()');
        },
      });
    }
  }
</script>
