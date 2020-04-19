<template>
  <div ref="comp">
    <swiper
      class="swiper"
      :options="{ slidesPerView: slidesPerView, ...swiperOption }"
      :key="slidesPerView"
    >
      <slot> </slot>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button prev-elem" slot="button-prev">
        <b-icon-chevron-left></b-icon-chevron-left>
      </div>
      <div class="swiper-button swipper-button-right next-elem" slot="button-next">
        <b-icon-chevron-right></b-icon-chevron-right>
      </div>
    </swiper>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import get from 'lodash.get';
  import { Swiper, directive } from 'vue-awesome-swiper';
  import { BIconChevronRight, BIconChevronLeft } from 'bootstrap-vue';
  import 'swiper/css/swiper.css';
  @Component({
    components: { Swiper, BIconChevronRight, BIconChevronLeft },
    directives: { swiper: directive },
  })
  export default class Carousel extends Vue {
    private windowWidth = 1000;

    @Prop() private name!: string;

    get getWidth() {
      return this.windowWidth;
    }

    get slidesPerView() {
      if (this.windowWidth <= 576) return 1;
      if (this.windowWidth < 992) return 3;
      return 4;
    }

    mounted() {
      // @ts-ignore
      this.windowWidth = this.$refs.comp.clientWidth;

      window.addEventListener('resize', () => {
        // @ts-ignore
        this.windowWidth = this.$refs.comp.clientWidth;
      });
    }

    private swiperOption = {
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.next-elem',
        prevEl: '.prev-elem',
      },
    };
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  ::v-deep .swiper-button {
    background-color: black;
    color: teal;
    width: 38px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
    position: absolute;
    top: 30%;
    z-index: 10;
    cursor: pointer;
  }

  ::v-deep .swiper-button-disabled {
    display: none;
  }

  ::v-deep .swipper-button-right {
    right: 0px;
  }

  ::v-deep .swiper-pagination {
    position: static !important;
    .swiper-pagination-bullet {
      background-color: white;

      .swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }
</style>
