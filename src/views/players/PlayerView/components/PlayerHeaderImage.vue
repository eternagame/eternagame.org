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
  import { DEFAULT_PLAYER_PICTURE } from '@/utils/constants';

  @Component({
    components: {},
  })
  export default class PlayerHeaderImage extends Vue {
    get picture() {
      const playerImage = this.user.picture;
      const lowercaseUrl = playerImage.toLowerCase();
      let fullUrl = playerImage;
      if (lowercaseUrl.length === 0) {
        fullUrl = DEFAULT_PLAYER_PICTURE;
      } else if (!(lowercaseUrl.startsWith('http://') || lowercaseUrl.startsWith('https://'))) {
        fullUrl = `${process.env.VUE_APP_API_BASE_URL}/${playerImage}`;
      }
      console.log(fullUrl);
      return fullUrl;
    }

    @Prop() user!: UserData;
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
