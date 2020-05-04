<template>
  <div>
    <img src="@/assets/dollar.svg" class="icon" /> {{ user.points }}
    <img src="@/assets/test-tube.svg" class="icon" /> {{ user.ten_tools_puzzle_count }}
    <img src="@/assets/calendar.svg" class="icon" /> {{ user.created }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  @Component({})
  export default class PlayerHeaderIcons extends Vue {
    @Prop() user!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  img {
    margin-left: 20px;
  }
</style>
