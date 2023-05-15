<template>
  <div>
    <div style="width:100; border: none;">
      <span class="header-content">
        <h3 style="font-size: 23px;font-weight: bold;margin-top:15px">
          {{ $t('lab-view:conclusion') }}
        </h3>
      </span>
    </div>
    <div class="card body conclusion" v-if="$vxm.user.hasLabAccess">
      <div ref="content" style="margin-bottom: 10px;" v-dompurify-html="descriptionToShow"></div>
      <ReadMore v-model="showFullText" v-if="readMoreNeeded"></ReadMore>
    </div>
    <div class="card" v-else>
      <p class="card-body text-center py-4 m-0 font-weight-bold">
        A conclusion is available for this lab - unlock the lab by completing the tutorials
        to view it!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import defaultImage from '@/assets/ribosome_challenge_bg.png';

  const MAX_CHARS = 1000;

  @Component({
    components: {},
  })
  export default class LabConclusion extends Vue {
    @Prop({ required: true }) readonly conclusion!: string;

    @Prop({ default: '250px' }) readonly height!: string;

    showFullText = false;

    get readMoreNeeded() {
      return this.conclusion.length > MAX_CHARS;
    }

    get descriptionToShow() {
      return this.showFullText ? this.conclusion : this.conclusion.substr(0, MAX_CHARS);
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

  .conclusion {
    padding: 40px 30px 5px;
  }
</style>
