<template>
  <EternaPage :title="$t('chat:title')">
    <div id="full-page-chat-container" ref="chatContainer" style="width:100%"></div>
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
    $refs!: {
      chatContainer: HTMLElement
    };

    mounted() {
      const chat = new Chat({
        container: this.$refs.chatContainer,
        username: this.$vxm.user.username ? this.$vxm.user.username : '',
        uid: this.$vxm.user.uid ? this.$vxm.user.uid.toString() : '0',
        onHidden: () => {},
        backgroundColor: 'rgb(0, 22, 55)',
      });
    }
  }
</script>

<style>
  #full-page-chat-container .chat-container {
    height: 100%;
  }

  #full-page-chat-container .chat-selectors {
    height: unset;
  }

  #full-page-chat-container .chat-frame {
    width: 100%;
    height: 100%;
  }

  #full-page-chat-container .chat-close {
    display: none;
  }

  #full-page-chat-container .arrow {
    display: none;
  }

    @media (max-height: 730px) {
    #full-page-chat-container {
      height:calc(100vh - 225px);
    }
  }
  @media (min-height: 730px) {
    #full-page-chat-container {
      height:505px;
    }
  }
</style>
