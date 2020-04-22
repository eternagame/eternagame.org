<template>
  <div>
    <img src="@/assets/dollar.svg" class="icon" /> {{ pageData.points }}
    <img src="@/assets/test-tube.svg" class="icon" /> {{ pageData.ten_tools_puzzle_count }}
    <img src="@/assets/calendar.svg" class="icon" /> {{ pageData.created }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  @Component({})
  export default class PlayerHeaderIcons extends Vue {
    @Prop({ required: true }) pageData!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  img {
    margin-left: 20px;
  }
</style>
