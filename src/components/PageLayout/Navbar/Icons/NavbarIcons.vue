<template>
  <div>
    <!-- <ChatIcon /> -->
    <BellIcon style="float:right" />
    <UserIcon style="float:right" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ChatIcon from './ChatIcon.vue';
  import BellIcon from './BellIcon.vue';
  import UserIcon from './UserIcon.vue';

  @Component({
    components: {
      ChatIcon,
      BellIcon,
      UserIcon,
    },
  })
  export default class NavbarIcons extends Vue {}
</script>

<style lang="scss" scoped></style>
