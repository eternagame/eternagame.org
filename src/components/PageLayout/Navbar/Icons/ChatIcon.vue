<template>
  <img icon src="@/assets/navbar/Chat.svg" :alt="$t('nav-bar:chat')" />
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class ChatIcon extends Vue {}
</script>

<style lang="scss" scoped></style>
