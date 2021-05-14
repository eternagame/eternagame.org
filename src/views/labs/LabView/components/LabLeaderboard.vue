<template>
    <tr class="player-card">
      <td>
        <p class="rank">#{{ rank + 1 }}</p>
      </td>
      <td style="shrink">
        <img v-if="imageLink" class="rounded-circle player-image" :src="imageLink" />
        <img v-else class="rounded-circle player-image" src="@/assets/front-page/img/icon_user.png" />
      </td>
      <td>
        <div class="player-name">
          <a v-bind:href="'/players/' + player.uid">
            {{ player.name }}
          </a>
        </div>
       </td>
      <td>
        <a v-bind:href="puzzleLink">
          {{player.puztitle}}
        </a>
      </td>
      <td>
        <a v-bind:href="solutionLink"> {{player.title}} </a>
      </td>
      <td>
        <div class="score">
          {{player["synthesis-score"]}}
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
  export default class LabLeaderboard extends Vue {

    @Prop({required: true}) readonly player!: any;

    @Prop({required: true}) readonly rank!: number;

    get puzzleLink(){
        return `${PUZZLE_ROUTE_PREFIX}${this.player.puznid}/`;
    }

    get solutionLink(){
      return `${PUZZLE_ROUTE_BROWSE_PREFIX}${this.player.puznid}/?filter1=Id&filter1_arg1=${this.player.id}"&filter1_arg2="${this.player.id}`;
    }

    get imageLink() {
      return this.player.picture && `${process.env.VUE_APP_API_BASE_URL}/${this.player.picture}`;
    }
  }
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

.player-card {
    border: 0px;
    color: $white;
    transition: background-color 0.3s ease;
    padding-right: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
    width: 55px;
    height: 55px;
    @include media-breakpoint-down(xs) {
      width: 52px;
      height: 52px;
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
    margin-top: 20px;
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
  }
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid $light-blue;
  }

  td.shrink {
    width: 0.1%;
    white-space: nowrap;
  }
</style>
