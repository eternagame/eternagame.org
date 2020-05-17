<template>
  <div>
    <div class="card" style="width:100; border: none;">
      <div class="lab-header p-2" :style="{
        'background-image': `linear-gradient(
          to bottom,
          transparent 0%,
          rgba(0, 0, 0, 0.6) 70%,
          rgba(0, 0, 0, 0.9) 100%
        ), url(${heroImage})`
      }">
        <span class="header-content">
          <h3>
            <b>{{ lab.title }}</b>
          </h3>
        </span>
      </div>
      <div class="body">
        <div ref="content" style="margin-bottom: 10px;" v-dompurify-html="descriptionToShow"></div>
        <ReadMore v-model="readMore"></ReadMore>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import defaultImage from '@/assets/ribosome_challenge_bg.png';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import { LabData } from '../types';

  Vue.use(VueDOMPurifyHTML);

  @Component({
    components: {},
  })
  export default class LabDescription extends Vue {
    @Prop()
    private lab!: LabData;

    @Prop()
    private height!: string;

    @Prop()
    private maximumCollapsedHeight!: number;

    private readMore = false;

    get descriptionToShow() {
      return this.readMore ? this.lab.body : this.lab.body.substr(0, 1000);
    }

    get heroImage() {
      return this.lab.banner_image  || DefaultHero;
    }
  }
</script>

<style scoped lang="scss">
  .header-content {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  .body {
    padding: 40px 30px 5px;
  }

  .lab-header {
    position: relative;
    background-position: center;
    height: 250px;
  }

  /*.lab-header::after {
    display: block;
    position: relative;
    background-image: 
    margin-top: -300px;
    height: 300px;
    width: 100%;
    content: '';
  }*/
</style>
