<template>
  <div class="d-flex">
    <img src="@/assets/dollar.svg" class="icon" /> {{ user.points }}
    <img src="@/assets/test-tube.svg" class="icon ml-4" /> {{ user.synthesized_count }}
    <img src="@/assets/calendar.svg" class="icon ml-4" /> {{ formattedCreated }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { UserData } from '@/types/common-types';

  @Component({})
  export default class PlayerHeaderIcons extends Vue {
    @Prop({ required: true }) readonly user!: UserData;

    get formattedCreated(): string {
      const start = this.user.created.indexOf(' ');
      return this.user.created.substring(start);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  img {
    margin-right: 6px;
  }
</style>
