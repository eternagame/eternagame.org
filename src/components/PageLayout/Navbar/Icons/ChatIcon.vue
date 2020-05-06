<template>
  <NavbarIcon>
    <template #icon>
      <img icon src="@/assets/navbar/Chat.svg" />
    </template>
    <template #text>
      {{ $t('nav-bar:chat') }}
    </template>
    <template>
      <b-dropdown-item>
        <div id="chat-container" style="height:500px"></div>
      </b-dropdown-item>
    </template>
  </NavbarIcon>
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

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
