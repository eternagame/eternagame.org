<template>
  <!-- TODO: Consider making this a NavIcon instead for consistent styling and behavior. -->
  <div>
    <img icon src="@/assets/navbar/Chat.svg" @click="goToChat()" />

    <p id="chat-popover-anchor" class="anchor">.</p>

    <b-popover
      :show.sync="show"
      id="chat-container"
      target="chat-popover-anchor"
      triggers="click"
      placement="topleft"
      @shown="addChat"
    >
      <div></div>
    </b-popover>
  </div>
</template>
<script lang="ts">
  // @ts-ignore
  import get from 'lodash.get';
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { Chat } from 'eterna-chat';

  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class PlayerIcon extends Vue {
    @Prop({ default: false }) private isInSideBar;

    private show: Boolean = false;

    goToChat() {
      if (this.isInSideBar) {
        this.redirect('/chat');
      } else {
        this.show = !this.show;
      }
    }

    redirect(path: string) {
      this.$router.push(path);
    }

    addChat() {
      const chat = new Chat({
        container: document.getElementById('chat-container'),
        username: this.$vxm.user.username,
        uid: this.$vxm.user.uid,
        onHidden: () => this.$root.$emit('bv::hide::popover', 'chat-container'),
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  img {
    margin-top: 0.3rem;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  // Hidden element on screen bottom right, to anchor the chat popover.
  .anchor {
    bottom: 0;
    right: 3rem;
    position: fixed;
    z-index: -3000;
    opacity: 0;
  }

  #chat-container {
    width: 400px;
    height: 600px;
  }
</style>
