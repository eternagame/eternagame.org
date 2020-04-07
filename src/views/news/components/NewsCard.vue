<template>
  <AspectRatioCard
    :style="{
      background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${imageUrl})`,
      backgroundSize: 'contain',
    }"
  >
    <template>
      <h1>News Card</h1>
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
    @Prop({ required: true }) private title!: string;

    @Prop({ default: true }) private completed!: boolean;

    @Prop({ default: false }) private locked!: boolean;

    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/8A2F6295-67E8-407F-9A70-910D8262D0EF.png',
    })
    private imageUrl!: string;
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
