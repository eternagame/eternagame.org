<template>

    <div class="card">
      <div class="margins">
      <h3>{{$t('lab-view-leaderboard:leaderboard')}}</h3>
      <table style="width:100%">
        <colgroup>
          <col style="width:5%">
          <col style="width:5%">
          <col style="width:10%">
          <col style="width:20%"><!-- modify here for puzzle header size  -->
          <col style="width:20%">
          <col style="width:1%">
        </colgroup>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:rank')}}
        </th>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:user')}}
        </th>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:name')}}
        </th>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:puzzle')}}
        </th>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:solution')}}
        </th>
        <th class="leaderboard-header">
          {{$t('lab-view-leaderboard:score')}}
        </th>
        <tbody>
          <LabLeaderboardRow v-for="(rankedSolution, rank) in labData" :key="rankedSolution.id" :rankedSolution="rankedSolution" :rank="rank"/>
        </tbody>
      </table>
      </div>
  </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import LabLeaderboardRow from './LabLeaderboardRow.vue';
  
  @Component({
    components: {
      LabLeaderboardRow
    },
  })
  export default class LabLeaderboardCard extends Vue {

    @Prop({required: true}) readonly labData!: any;
    
  }
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

  .rank {
    font-weight: bold;
    font-size: 1rem;
    margin-top: 20px;
    margin-right: 1rem;
    @include media-breakpoint-down(xs) {
      margin-right: 0.3rem;
    }
    font-size: 17px;
    margin-left: 10px;
  }

  .player-name {

    @include media-breakpoint-down(xs) {
      font-size: 17px;
      margin: 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
    font-weight: bold;
    margin-left: 5px;
    color: white;
    text-decoration: none;
  }
  .score{
    margin-right: 10%;
    font-weight: bold;
  }
  td {
    font-size: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    border-bottom: 1px solid $light-blue;
    
  }

  .card{
    margin-top: 2rem;
  }

  .margins{
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  td.shrink {
    width: 0.1%;
    white-space: nowrap;
  }

  .leaderboard-header
  {
    background-color: #063a88;
  }

</style>
