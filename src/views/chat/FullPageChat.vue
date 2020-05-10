<template>
  <EternaPage :title="$t('chat:title')">
    <div id="chat-container" style="width:100%;height:100%"></div>
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
      const chat = new Chat({
        container: document.getElementById('chat-container'),
        username: this.$vxm.user.username,
        uid: this.$vxm.user.uid,
        onHidden: () => {
          console.log('Chat.onHidden()');
        },
      });
    }
  }
</script>
