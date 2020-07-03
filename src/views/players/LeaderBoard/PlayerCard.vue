<template>
  <!--
    Table rows can't be links, so we lose out on accessiblity of the hover hint.
    role="button" should help a bit.
  -->
  <tr @click="$router.push('/players/' + player.uid)" class="player-card" role="button">
    <td style="shrink">
      <p class="rank">#{{ index + 1 }}</p>
    </td>
    <td style="shrink">
      <img v-if="imageLink" class="rounded-circle player-image" :src="imageLink" />
      <img v-else class="rounded-circle player-image" src="@/assets/front-page/img/icon_user.png" />
    </td>
    <td>
      <div class="player-name">
        {{ player.name }}
      </div>
    </td>

    <td>
      <div v-if="points">
        <img src="@/assets/dollar.svg" class="icon" style="margin-bottom:5px" />
        {{ points }}
      </div>
    </td>
    <td>
      <div v-if="points" class="d-none d-md-block">
        <img src="@/assets/test-tube.svg" class="icon" style="margin-bottom:5px" />
        {{ synths }}
      </div>
    </td>
    <td>
      <div v-if="dateCreated" class="d-none d-sm-block">
        <img src="@/assets/calendar.svg" class="icon" style="margin-bottom:5px" />
        {{ dateCreated }}
      </div>
    </td>
  </tr>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import axios, { AxiosInstance } from 'axios';
  import { UserData } from '@/types/common-types';
  import { DEFAULT_PLAYER_PICTURE } from '@/utils/constants';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class PlayerCard extends Vue {
    @Prop({ required: true }) readonly player!: UserData;

    @Prop({ required: true }) readonly index!: number;

    get points() {
      return (this.player.points && parseInt(this.player.points, 10).toLocaleString()) || 0;
    }

    get synths() {
      return (this.player.synths && parseInt(this.player.synths, 10).toLocaleString()) || 0;
    }

    private rank: string = '';

    created() {
      axios.get(`/get/?type=user&uid=${this.player.uid}`).then(response => {
        this.rank = response.data.data.user.rank;
      });
    }

    get dateCreated() {
      return (
        this.player.created &&
        new Date(this.player.created).toLocaleString('default', { month: 'short', year: 'numeric' })
      );
    }

    get imageLink() {
      return this.player.picture && `${process.env.VUE_APP_API_BASE_URL}/${this.player.picture}`;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-card {
    border: 0px;
    color: $white;
    transition: background-color 0.3s ease;
    padding-right: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .player-card:hover {
    background-color: #21508c;
  }
  a:hover {
    text-decoration: none;
  }

  .player-image {
    object-fit: scale-down;
    margin-right: 1rem;
    width: 61.58px;
    height: 61.58px;
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
    font-size: 22px;
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
