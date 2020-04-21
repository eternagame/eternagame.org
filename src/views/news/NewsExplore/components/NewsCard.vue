<template>
  <div class="page-content card">
    <!-- Padding: top right bottom  left -->
    <div class="container" style="padding:10px">
      <div class="row justify-content-between">
        <div class="col">
          <div v-bind:style="{ color: categoryColor }">{{ `${category.toUpperCase()}` }}</div>
        </div>
        <div class="col" style="text-align:right">
          <div style="opacity: 0.5;">{{ timeStamp }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-12 text-center">
          <img :src="img" style="max-width:258px;height:258px" />
        </div>
        <div class="col-md-8 col-sm-12" style="min-width:268px; text-align: justify;">
          <p style="font-size:20px;font-weight:bold;marginBottom:0px">{{ heading }}</p>
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class NewsCard extends Vue {
    @Prop({
      default: `Help us make better citizen science games in only 15 minutes
Several citizen science games from Foldit to Eyewire to Eterna to Phylo are celebrating years of productive science — now we’re getting together to try to get even better. Here’s the next step. Northeastern University researchers are conducting a…`,
    })
    private text!: string;

    @Prop({ default: 'labs' }) private category!: string;

    @Prop({ default: '21 April 2020' }) private timeStamp!: string;

    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/A629FBC0-9F20-4067-AE83-13160670F883.png',
    })
    private img!: string;

    @Prop({
      default: 'Help us make better citizen science games in only 15 minutes',
    })
    private heading!: string;

    get categoryColor() {
      switch (this.category.toLowerCase()) {
        case 'blogs':
          return '#53b64e';
        case 'labs':
          return '#50b2dc';
        case 'announcements':
          return '#f39c12';
        default:
          return '#53b64e';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 0.75rem !important;
  }

  .card {
    margin-bottom: 50px;
  }
</style>
