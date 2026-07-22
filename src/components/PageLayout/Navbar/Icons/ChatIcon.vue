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

    <eterna-chat
      :username.prop="$vxm.user.username ?? ''" :uid.prop="`${$vxm.user.uid ?? 0}`" :appContext.prop="'web'"
      :defaultX.prop="windowSize.width - 400 - 30" :defaultY.prop="windowSize.height - 350 - 30"
      :defaultWidth.prop="400" :defaultHeight.prop="350"
      v-if="show"
    />
  </li>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class ChatIcon extends Vue {
    @Prop({ default: false }) readonly isInSideBar!: boolean;

    show: boolean = false;

    goToChat() {
      this.show = !this.show;
    }

    get windowSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
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

  eterna-chat::part(chat-window) {
    box-shadow: 1px 1px 4px #000;
    border: 2px solid rgba(47,148,209,.6);
  }

  eterna-chat {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
  }
</style>
