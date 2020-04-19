<template>
  <AspectRatioCard>
    <template #body>
      <div
        :style="{
          background: `url(${imageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }"
      >
        <img :src="imageUrl" style="height: 100%; width: 100%;" />
      </div>
    </template>
    <template #footer>
      <div style="text-align:center; margin-bottom:0px">
        <img src="@/assets/noun_lock.svg" v-if="locked" />

        <p v-if="progress === 'COMPLETED'">
          <img src="@/assets/noun_check.svg" /><b>{{ `completed!`.toUpperCase() }}</b>
        </p>
        <b-button type="submit" variant="primary" v-else-if="progress === 'NOT_STARTED'">{{
          $t('quest-card:play')
        }}</b-button>
        <b-progress v-else :value="progress"></b-progress>
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
  export default class VideoCard extends Vue {
    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/9FA562FE-9341-4261-8C3C-7E9679642CAE.png',
    })
    private imageUrl!: string;

    @Prop({ default: false }) private locked!: false;

    @Prop({
      default: 50,
    })
    private progress!: number | string;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 0.75rem !important;
  }

  .card {
    background-color: $input-bg;
  }
</style>
