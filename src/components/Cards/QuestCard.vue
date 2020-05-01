<template>
  <div :id="popoverId">
    <AspectRatioCard>
      <template #header>
        <div class="quest-card-title" v-if="title">
          <b>{{ title }}</b>
        </div>
      </template>
      <div>
        <img :src="image" style="height: 100%; width: 100%;" />
      </div>
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
    <b-popover :target="popoverId" triggers="hover">
      <div v-dompurify-html="desc"></div>
    </b-popover>
  </div>
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
  export default class QuestCard extends Vue {
    @Prop({})
    private image!: string;

    @Prop({})
    private current_puzzle!: string;

    @Prop({})
    private title!: string;

    @Prop({})
    private desc!: string;

    @Prop({ default: false }) private locked!: false;

    @Prop({
      default: 50,
    })
    private progress!: number | string;

    private popoverId: string = `popover-target-${this.title}`;
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
    padding: 11.25px !important;
  }

  .card {
    background-color: $input-bg;
  }

  .quest-card-title {
    height: 30px;
    text-align: center;
  }
</style>
