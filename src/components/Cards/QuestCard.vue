<template>
  <AspectRatioCard
    :style="{
      background: `url(${imageUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '180px',
    }"
  >
    <template #footer>
      <b-progress :value="progress"></b-progress>
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
  export default class VideoCard extends Vue {
    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/9FA562FE-9341-4261-8C3C-7E9679642CAE.png',
    })
    private imageUrl!: string;

    @Prop({
      default: 50,
    })
    private progress!: number;
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
