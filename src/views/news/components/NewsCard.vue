<template>
  <AspectRatioCard :aspectRatio="163 / 700">
    <template>
      <div style="text-align:left">
        <p>{{ `${category.toUpperCase()}` }}</p>
        <div class="d-flex">
          <img :src="img" style="width:236px;height:134px;marginRight:13px" />
          <div>
            <p style="font-size:20px;font-weight:bold;marginBottom:0px">{{ heading }}</p>
            <p>{{ text }}</p>
          </div>
        </div>
      </div>
    </template>
  </AspectRatioCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class NewsCard extends Vue {
    @Prop({
      default: `Help us make better citizen science games in only 15 minutes
Several citizen science games from Foldit to Eyewire to Eterna to Phylo are celebrating years of productive science — now we’re getting together to try to get even better. Here’s the next step. Northeastern University researchers are conducting a…`,
    })
    private text!: string;

    @Prop({ default: 'blogs' }) private category!: string;

    @Prop() private img: string =
      'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/A629FBC0-9F20-4067-AE83-13160670F883.png';

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
</style>
