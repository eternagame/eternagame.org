<template>
  <div class="page-content card">
    <div style="text-align:left">
      <p>{{ `${category.toUpperCase()}` }}</p>
      <div class="d-flex  flex-column flex-sm-row">
        <div style="min-width:268px">
          <h3 style="font-size:20px;font-weight:bold;marginBottom:0px">
            {{ title }}
          </h3>
          <div v-dompurify-html="body" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';

  Vue.use(VueDOMPurifyHTML);
  @Component({
    components: {},
  })
  export default class ActivityCard extends Vue {
    @Prop() private title!: string;

    @Prop() private body!: string;

    @Prop() private timeStamp!: string;

    @Prop({ default: 'blogs' }) private category!: string;
  }
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card {
    margin-bottom: 50px;
  }
</style>
