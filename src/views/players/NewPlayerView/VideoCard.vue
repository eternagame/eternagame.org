<template>
  <AspectRatioCard >
    <template >
      <h1 class="puzzle-card-title">
        <b >{{title}}</b>
      </h1>
    </template>
    <template #footer>
        <b>Play Video</b>
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
  export default class VideoCard extends Vue {
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
      vertical-align: middle;
      justify-content: center;
      align-items: center;
  }

  .icon {
    width: 19px;
    margin-right: 5px;
  }

</style>
