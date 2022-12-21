<template>
  <!-- TODO: Consider making this a NavIcon instead for consistent styling and behavior. -->
  <li style="list-style: none;">
    <div
      class="clickable mt-2"
      @click="goToChat()"
      @keypress.enter="goToChat()"
      @keypress.space="goToChat()"
    >
      <img src="@/assets/navbar/Chat.svg" alt="chat" />
      <span class="d-md-none font-weight-bold">
        {{ $t('nav-bar:chat') }}
      </span>
    </div>

    <b-popover
      :show.sync="show"
      id="chat-container"
      target="chat-popover-anchor"
      triggers="click"
      placement="topleft"
      @shown="addChat"
    >
      <div ref="chatContainer"></div>
    </b-popover>
  </li>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { Chat } from 'eterna-chat-wrapper';

  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class ChatIcon extends Vue {
    @Prop({ default: false }) readonly isInSideBar!: boolean;

    private show: boolean = false;

    @Ref() readonly chatContainer!: HTMLElement;

    chat!: Chat;

    goToChat() {
      if (this.isInSideBar) {
        this.$router.push('/chat');
      } else {
        this.show = !this.show;
      }
    }

    addChat() {
      this.chat = new Chat({
        container: this.chatContainer,
        username: this.$vxm.user.username ? this.$vxm.user.username : '',
        uid: this.$vxm.user.uid ? this.$vxm.user.uid.toString() : '0',
        onHidden: () => this.$root.$emit('bv::hide::popover', 'chat-container'),
        backgroundColor: 'rgb(0, 22, 55)',
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .clickable {
    cursor: pointer;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 0 10px;
  }

  #chat-container {
    border-radius: 5px;
    border: 2px solid rgba(47, 148, 209, 0.4);
    width: 400px;
    height: 500px;
    background-color: rgb(0, 22, 55);
  }

  @media only screen and (max-height: 600px) {
    #chat-container {
      left: unset !important;
      transform: unset !important;
      right: 0 !important;
      height: 100%;
      margin: 0;
    }
  }
</style>

<style>
  #chat-container > .popover-body {
    height: 100%;
  }

  #chat-container > .popover-body > .chat-container {
    height: 100%;
  }

  #chat-container .chat-selectors {
    height: unset;
  }

  #chat-container .chat-frame {
    width: 100%;
    height: 100%;
  }

  #chat-container .chat-close {
    right: -15px;
    top: 5px;
  }

  #chat-container .arrow {
    display: none;
  }
</style>
