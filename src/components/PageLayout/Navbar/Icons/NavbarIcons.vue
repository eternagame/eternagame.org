<template>
  <div>
    <UserIcon class="float-lg-right icon" />
    <BellIcon class="float-lg-right icon" />
    <ChatIcon class="float-lg-right icon" :isInSideBar="isInSideBar" style="float:left" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ChatIcon from './ChatIcon.vue';
  import BellIcon from './BellIcon/BellIcon.vue';
  import UserIcon from './UserIcon.vue';

  @Component({
    components: {
      ChatIcon,
      BellIcon,
      UserIcon,
    },
  })
  export default class NavbarIcons extends Vue {
    @Prop({ default: false }) private isInSideBar;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
