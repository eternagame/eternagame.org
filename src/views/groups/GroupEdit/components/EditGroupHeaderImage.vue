<template>
  <div>
    <div v-if="picture">
      <img
        class="d-block d-sm-none player-image"
        :src="picture"
        alt="avatar"
      />
      <img
        class="d-none d-sm-block player-image-large"
        :src="picture"
        alt="avatar"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class GroupHeaderImage extends Vue {
    @Prop({ required: true }) readonly picture!: File;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-image {
    object-fit: scale-down;
    margin-right: 20px;
    width: 61.58px;
    height: 61.58px;
  }

  .player-image-large {
    object-fit: scale-down;
    margin-right: 20px;
    width: 115.93px;
    height: 115.93px;
  }
</style>
