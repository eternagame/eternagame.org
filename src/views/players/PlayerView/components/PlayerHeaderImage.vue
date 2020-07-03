<template>
  <div v-if="user">
    <img
      v-if="picture"
      class="rounded-circle player-image-large"
      :src="picture"
      alt="player-image"
    />
    <img
      v-else
      class="d-none d-sm-block rounded-circle player-image-large"
      src="@/assets/front-page/img/icon_user.png"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { UserData } from '@/types/common-types';
  import Utils from '@/utils/utils';

  @Component({
    components: {},
  })
  export default class PlayerHeaderImage extends Vue {
    @Prop({ required: true }) readonly user!: UserData;

    get picture() {
      return Utils.getAvatar(this.user.picture);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-image-large {
    width: 115.93px;
    height: 115.93px;
    object-fit: cover;
    margin-right: 20px;
  }
</style>
