<template>
  <AspectRatioCard>
    <template #header>
      <div class="puzzle-card-title">
        <b>{{title}}</b>
      </div>
    </template>
  </AspectRatioCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import AspectRatioCard from '../../../components/Cards/AspectRatioCard.vue';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class GameCard extends Vue {
    @Prop({ required: true }) private title!: string;
  }
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body{
    padding: 0.75rem !important;
  }

  .puzzle-card-title {
    height: 50px;
    text-align: center;
  }

  .icon {
    width: 19px;
    margin-right: 5px;
  }

</style>
