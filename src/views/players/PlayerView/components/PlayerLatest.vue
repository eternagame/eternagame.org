<template>
  <div v-if="latest" class="content">
    <hr class="top-border" />
    <h4 class="title">
      {{ $t('player-view:latest-activity') }}
    </h4>
    <table class="table">
      <thead>
        <tr class="table-primary">
          <th scope="col">{{ $t('player-view:latest-played-puzzles') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in latest" :key="item.id">
          <td>
            <a :href="`/puzzle/${item.puznid}/`">{{ item.title }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class PlayerLatest extends Vue {
    @Prop() latest!: object[];
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
