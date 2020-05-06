<template>
  <div>
    <div class="card" style="width:100; border: none;">
      <div
        :style="{
          position: 'relative',
          'background-image': `url(${defaultImage})`,
          height: '250px',
        }"
        class="p-2"
      >
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

    get defaultImage() {
      return defaultImage;
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
</style>
