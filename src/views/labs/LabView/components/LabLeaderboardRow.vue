<template>

    <tr class="player-card">
      <td>
        <p class="rank">
          #{{ rank + 1 }}
        </p>
      </td>
      <td style="shrink">
        <img v-if="imageLink" class="rounded-circle player-image" :src="imageLink" />
        <img v-else class="rounded-circle player-image" src="@/assets/front-page/img/icon_user.png" />
      </td>
      <td>
        <div class="player-name">
          <a v-bind:href="'/players/' + rankedSolution.uid">
            {{ rankedSolution.name }}
          </a>
        </div>
       </td>
      <td>
        <a v-bind:href="puzzleLink">
          {{ rankedSolution.puztitle }}
        </a>
      </td>
      <td>
        <a v-bind:href="solutionLink"> 
          {{ rankedSolution.title }} 
        </a>
      </td>
      <td>
        <div class="score">
          {{rankedSolution["synthesis-score"]}}
        </div>
      </td>
    </tr>

</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {
    PUZZLE_ROUTE_PREFIX,
    PUZZLE_ROUTE_BROWSE_PREFIX,
    PUZZLE_ROUTE_SOLUTIONS_PREFIX,
  } from '@/utils/constants';

@Component({
    components: {},
})
  export default class LabLeaderboardRow extends Vue {
    
    @Prop({required: true}) readonly rankedSolution!: any;

    @Prop({required: true}) readonly rank!: number;

    get puzzleLink(){
        return `${PUZZLE_ROUTE_PREFIX}${this.rankedSolution.puznid}/`;
    }

    get solutionLink(){
      return `${PUZZLE_ROUTE_BROWSE_PREFIX}${this.rankedSolution.puznid}/?filter1=Id&filter1_arg1=${this.rankedSolution.id}&filter1_arg2=${this.rankedSolution.id}`;
    }

    get imageLink() {
      return this.rankedSolution.picture && `${process.env.VUE_APP_API_BASE_URL}/${this.rankedSolution.picture}`;
    }
  }
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

.player-card {
    border: 0px;
    color: $white;
    transition: background-color 0.3s ease;

  }
  a:link{
    color:$white;
  }
  a:visited{
    color:$white;
  }
  .player-image {
    object-fit: scale-down;
    margin-right: 1rem;
    width: 40px;
    height: 40px;
    @include media-breakpoint-down(xs) {
      width: 35px;
      height: 35px;
      margin-right: 0.5rem;
    }
  }

  .icons {
    font-weight: bold;
    display: flex;
    top: 0.5rem;
    right: 1rem;
    float: right;
    position: absolute;
    height: 80%;
    align-items: center;
    img {
      margin-left: 50px;
    }
  }

  .rank {
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    margin-right: 1rem;
    @include media-breakpoint-down(xs) {
      margin-right: 0.3rem;
    }
    font-size: 17px;
    margin-left: 10px;
  }

  .player-name {
    //font-size: 22px;
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
    font-size: .75rem;
    padding-bottom: .25rem;
    padding-top: .25rem;
    border-bottom: 1px solid $light-blue;
  }

  td.shrink {
    width: 0.1%;
    white-space: nowrap;
  }

  .top{
      padding-top: 0rem;
  }
  .leaderboard-header
  {
    background-color: #103e85;
  }

</style>
