<template>
  <div>
    <ChatIcon/>
    <BellIcon/>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ChatIcon from './ChatIcon.vue';
  import BellIcon from './BellIcon.vue';

  @Component({
    components: {
      ChatIcon,
      BellIcon,
    },
  })
  export default class NavbarIcons extends Vue {}
</script>

<style lang="scss" scoped>

</style>
