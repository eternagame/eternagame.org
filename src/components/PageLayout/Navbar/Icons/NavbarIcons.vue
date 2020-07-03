<template>
  <div>
    <UserIcon class="float-lg-right icon" />
    <NotificationIcon class="float-lg-right icon" />
    <ChatIcon class="float-lg-right icon" :isInSideBar="isInSideBar" style="float:left" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ChatIcon from './ChatIcon.vue';
  import NotificationIcon from './NotificationIcon/NotificationIcon.vue';
  import UserIcon from './UserIcon.vue';

  @Component({
    components: {
      ChatIcon,
      NotificationIcon,
      UserIcon,
    },
  })
  export default class NavbarIcons extends Vue {
    @Prop({ default: false }) readonly isInSideBar!: boolean;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
