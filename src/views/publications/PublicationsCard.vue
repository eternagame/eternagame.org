<template>
  <div class="page-content card">
    <div class="container">
      <div class="row">
        <div class="col-sm order-1 order-sm-2">
          <h3 class="card-title mb-2">
            <a :href="link">{{ title }}</a>
          </h3>
          <p class="font-weight-bold mb-2">
            <a :href="pdf_link">{{ journal }}</a> - {{ pub_date }}
          </p>
          <p v-dompurify-html="authors"></p>
        </div>
        <div class="col-sm-4 order-2 order-sm-1" v-if="image">
          <img class="thumbnail" :src="`/sites/default/files/${image}`" />
        </div>
      </div>
      <div v-if="abstract" v-dompurify-html="abstract" class="text mt-3" />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  
  @Component({
    components: {},
  })
  export default class NewsCard extends Vue {
    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly abstract!: string;

    @Prop({ required: true }) readonly authors!: string;

    @Prop({ required: true }) readonly link!: string;

    @Prop({ required: true }) readonly pdf_link!: string;

    @Prop({ required: true }) readonly journal!: string;

    @Prop({ required: true }) readonly pub_date!: string;

    @Prop({ required: true }) readonly image!: string;
  }
</script>

<style lang="scss" scoped>
  .card-title a {
    color: white;
  }

  .card-title {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .thumbnail {
    max-width: 100%;
  }

  .card {
    padding: 2rem 1rem;
    margin-bottom: 1.5rem;
  }
</style>
