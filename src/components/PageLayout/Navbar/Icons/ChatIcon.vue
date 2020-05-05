<template>
  <NavbarIcon>
    <template #icon>
      <img icon src="@/assets/navbar/Chat.svg" />
    </template>
    <template #text>
      {{ $t('nav-bar:chat') }}
    </template>
    <template> </template>
  </NavbarIcon>
</template>
<script lang="ts">
  // @ts-ignore
  import get from 'lodash.get';
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';

  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class PlayerIcon extends Vue {}
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
