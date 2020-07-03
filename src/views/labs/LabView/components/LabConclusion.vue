<template>
  <div v-if="lab.conclusion">
    <div style="width:100; border: none;">
      <span class="header-content">
        <h3 style="font-size: 23px;font-weight: bold;margin-top:15px">
          {{ $t('lab-view:conclusion') }}
        </h3>
      </span>
    </div>
    <div class="card body">
      <div ref="content" style="margin-bottom: 10px;" v-dompurify-html="descriptionToShow"></div>
      <ReadMore v-model="readMore"></ReadMore>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import defaultImage from '@/assets/ribosome_challenge_bg.png';
  import { LabData } from '../types';

  @Component({
    components: {},
  })
  export default class LabConclusion extends Vue {
    @Prop({ required: true }) readonly lab!: LabData;

    @Prop({ default: '250px' }) readonly height!: string;

    private readMore = false;

    get descriptionToShow() {
      return this.readMore ? this.lab.conclusion : this.lab?.conclusion?.substr(0, 1000);
    }

    get defaultImage() {
      return defaultImage;
    }
  }
</script>

<style scoped lang="scss">
  .header-content {
    bottom: 10px;
    left: 10px;
  }

  .body {
    padding: 40px 30px 5px;
  }
</style>
