<template>
  <div :id="popoverId">
    <img icon src="@/assets/navbar/Chat.svg" @click="goToChat()" />

    <b-popover
      id="chat-container"
      :target="popoverId"
      triggers="click"
      placement="top"
      @shown="addChat"
      v-if="isInSideBar"
      style="height:500px"
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
    private popoverId: string = 'chat-popover';

    @Prop({ default: false }) private isInSideBar;

    goToChat() {
      if (this.isInSideBar) this.redirect('/chat');
    }

    redirect(path: string) {
      this.$router.push(path);
    }

    addChat() {
      const chat = new Chat({
        container: document.getElementById('chat-container'),
        username: this.$vxm.user.username,
        uid: this.$vxm.user.uid,
        collapsible: true,
        onHidden: () => this.$root.$emit('bv::hide::popover', this.popoverId),
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
