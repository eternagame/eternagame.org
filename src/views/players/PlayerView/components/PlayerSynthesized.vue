<template>
  <div v-if="synthesized" class="content">
    <hr class="top-border" />
    <h4 class="title">
      {{ $t('player-view:synthesized-rnas') }}
    </h4>
    <table class="table">
      <thead>
        <tr class="table-primary">
          <th scope="col">{{ $t('player-view:rna-title') }}</th>
          <th scope="col">{{ $t('player-view:score') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in synthesized" :key="item.id">
          <td>
            <!-- TODO: need to include filters e.g. https://eternagame.org/game/browse/6296743/?filter1=Id&filter1_arg1=6348941&filter1_arg2=6348941 -->
            <a :href="`https://eternagame.org/game/browse/${item.puznid}/`">{{ item.title }}</a>
          </td>
          <td class="font-weight-bold">{{ item.score || 'Waiting' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { SynthesizedData } from '../../types';

  @Component({
    components: {},
  })
  export default class PlayerSynthesized extends Vue {
    @Prop() synthesized!: SynthesizedData[];
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
