<template>
  <div class="arrow" :class="[`arrow-${direction}`]">
    <img class="arrow-icon" src="@/assets/components/gallery/left-arrow.svg"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {

    },
  })
  export default class HorizontalGalleryArrow extends Vue {
    @Prop({ required: true })
    direction!: 'left' | 'right';
  }
</script>

<style scoped lang="scss">
  $height: 1.5rem;
  .arrow {
    background-color: black;
    height: $height;
    width: $height * 4 / 3;
    border-top-left-radius: $height / 3;
    border-bottom-left-radius: $height / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .arrow-right {
    transform: scaleX(-1);
  }

</style>
