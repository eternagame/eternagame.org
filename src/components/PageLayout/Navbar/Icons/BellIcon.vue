<template>
  <NavbarIcon>
    <template #icon>
      <img src="@/assets/navbar/Bell.svg" :alt="$t('nav-bar:notifications')" />
    </template>
    <template #text>
      {{ $t('nav-bar:notifications') }}
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
  export default class BellIcon extends Vue {}
</script>

<style lang="scss" scoped></style>
