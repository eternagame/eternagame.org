<template>
  <div v-if="entries" class="content">
    <hr class="top-border" />
    <h4 class="title">{{ title }}</h4>
    <table class="table">
      <thead>
        <slot name="theader"></slot>
      </thead>
      <tbody>
        <template v-for="item in entries">
          <slot :item="item" name="trow"></slot>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PlayerTable extends Vue {
    @Prop() title!: String;

    @Prop() entries!: object[];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .content {
    margin: 1rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
</style>
