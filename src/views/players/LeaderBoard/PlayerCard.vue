<template>
  <div class="card player-card">
    <div class="d-flex align-items-center" style="width:100%">
      <p class="rank">#{{ rank }}</p>
      <img class="rounded-circle player-image" :src="imageLink" v-if="imageLink" />
      <p class="player-name">
        {{ player.name }}
      </p>
    </div>
    <div class="icons">
      <div v-if="points">
        <img src="@/assets/dollar.svg" class="icon" style="margin-bottom:5px" />
        {{ points }}
      </div>
      <div v-if="dateCreated">
        <img src="@/assets/calendar.svg" class="icon" style="margin-bottom:5px" />
        {{ dateCreated }}
      </div>
    </div>

    <hr class="bottom-border" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import axios, { AxiosInstance } from 'axios';
  import { UserData } from '@/types/common-types';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class PlayerCard extends Vue {
    @Prop() private player!: UserData;

    @Prop() private index!: number;

    get points() {
      return this.player.points && parseInt(this.player.points, 10).toLocaleString();
    }

    private rank: string = '';

    created() {
      axios.get(`/get/?type=user&uid=${this.player.uid}`).then(response => {
        this.rank = response.data.data.user.rank;
      });
    }

    get dateCreated() {
      return (
        this.player.created
        && new Date(this.player.created).toLocaleString('default', { month: 'short', year: 'numeric' })
      );
    }

    get imageLink() {
      return `${process.env.VUE_APP_API_BASE_URL}/${this.player.picture}`;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-card {
    border: 0px;
  }

  .bottom-border {
    border-top-color: $light-blue;
  }

  .player-image {
    object-fit: scale-down;
    margin-right: 20px;
    width: 61.58px;
    height: 61.58px;
  }

  .icons {
    display: flex;
    right: 0px;
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
    margin-right: 20px;
    font-size: 17px;
    margin-left: 10px;
  }

  .player-name {
    font-size: 22px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 5px;
  }
</style>
