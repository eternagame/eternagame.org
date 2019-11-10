<template>
  <NavbarIcon>
    <template #icon>
      <img icon src="@/assets/navbar/Chat.svg" alt="chat"/>
    </template>
    <template #text>
      Chat <span class="online">(X online)</span>
    </template>
    <b-dropdown-item>To be implemented</b-dropdown-item>
    <b-dropdown-item>To be implemented</b-dropdown-item>
    <b-dropdown-item>To be implemented</b-dropdown-item>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class ChatIcon extends Vue {}
</script>

<style lang="scss" scoped>
  .online {
    color: var(--gray);
  }
</style>
