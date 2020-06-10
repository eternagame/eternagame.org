<template>
  <div ref="comp">
    <swiper class="swiper" ref="slider" :options="swiperOption">
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
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { Swiper, SwiperRef, directive } from 'vue-awesome-swiper';
  import { BIconChevronRight, BIconChevronLeft } from 'bootstrap-vue';
  import 'swiper/css/swiper.css';

  @Component({
    components: { Swiper, BIconChevronRight, BIconChevronLeft },
    directives: { swiper: directive },
  })
  export default class Carousel extends Vue {
    @Prop({required: true}) readonly slideTo?: number;

    @Ref('slider') readonly slider!: SwiperRef;

    mounted() {
      if (this.slideTo) this.slider.$swiper.slideTo(this.slideTo);
    }

    private swiperOption = {
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
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

  .swiper {
    margin-left: -$page-margin-side;
    margin-right: -$page-margin-side;
    padding-left: $page-margin-side;
    padding-right: $page-margin-side;
  }

  ::v-deep .swiper-button {
    background-color: black;
    color: teal;
    width: 38px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 40%;
    z-index: 10;
    cursor: pointer;
  }

  ::v-deep .swiper-button.prev-elem {
    border-radius: 0 10px 10px 0;
    left: 0px;
  }

  ::v-deep .swiper-button-disabled {
    display: none;
  }

  ::v-deep .swipper-button-right {
    border-radius: 10px 0 0 10px;
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
