<template>
  <div class="page-content card">
    <div style="text-align:left">
      <p>{{ `${category.toUpperCase()}` }}</p>
      <div class="d-flex  flex-column flex-sm-row">
        <div>
          <img :src="img" style="width:258px;height:258px;marginRight:13px" />
        </div>
        <div style="min-width:268px">
          <p style="font-size:20px;font-weight:bold;marginBottom:0px">
            {{ heading }}
          </p>
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
  export default class ActivityCard extends Vue {
    @Prop({
      default: `Help us make better citizen science games in only 15 minutes
Several citizen science games from Foldit to Eyewire to Eterna to Phylo are celebrating years of productive science — now we’re getting together to try to get even better. Here’s the next step. Northeastern University researchers are conducting a…`,
    })
    private text!: string;

    @Prop({ default: 'blogs' }) private category!: string;

    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/A629FBC0-9F20-4067-AE83-13160670F883.png',
    })
    private img!: string;

    @Prop({ default: 'Help us make better citizen science games in only 15 minutes' })
    private heading!: string;
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
