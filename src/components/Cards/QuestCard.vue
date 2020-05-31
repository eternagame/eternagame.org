<template>
  <div :id="popoverId">
    <AspectRatioCard>
      <template #header>
        <!-- <div class="quest-card-title" v-if="title">
          <b>{{ title }}</b>
        </div> -->
      </template>
      <SmartLink :link="toQuest">
        <img :src="image" style="width: 80%; margin: auto;" class="scalable" />
      </SmartLink>
      <template #footer>
        <div style="text-align:center; margin-bottom:0px">
          <img src="@/assets/noun_lock.svg" v-if="locked" />
          <div v-else>
            <p v-if="completed">
              <SmartLink :link="toGame">
                <img src="@/assets/noun_check.svg" @click="goToGame()" />
                <b>{{ $t('quest:completed').toUpperCase() }}</b>
              </SmartLink>
            </p>
            <div v-else>
              <b-button variant="primary" style="margin:10px 0" :[nav]="toGame">
                {{ $t('quest-card:play') }}
              </b-button>
              <SmartLink v-if="started" :link="toGame">
                <b-progress :value="to_next" max="1"></b-progress>
              </SmartLink>
            </div>
          </div>
        </div>
      </template>
    </AspectRatioCard>
    <b-popover :target="popoverId" triggers="hover" placement="top">
      <div v-dompurify-html="desc"></div>
    </b-popover>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class QuestCard extends Vue {
    @Prop({})
    private image!: string;

    @Prop({})
    private to_next!: number;

    @Prop({})
    private title!: string;

    @Prop({})
    private desc!: string;

    @Prop({})
    private level!: string;

    @Prop({})
    private questLink!: string;

    @Prop({})
    private puzzleLink!: string;

    @Prop({})
    private current_level!: string;

    @Prop({})
    private current_puzzle!: string;

    get nav() {
      return Utils.isLinkInternal(this.toGame) ? 'to' : 'href';
    }

    get toGame() {
      return (
        this.puzzleLink || (this.current_puzzle && `${PUZZLE_ROUTE_PREFIX}${this.current_puzzle}/`)
      );
    }

    get toQuest() {
      return this.questLink || (this.title && `/quests/${this.title}`);
    }

    private locked = Number(this.level) - 1 > Number(this.current_level);

    private started = this.to_next > 0 && !this.locked;

    private completed = this.to_next >= 1 && !this.locked;

    private popoverId: string = `popover-target-${this.title}`;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card {
    background-color: $input-bg;
    transition: 0.3s ease;
  }
  .card:hover {
    background-color: $blue;
  }

  .quest-card-title {
    height: 30px;
    text-align: center;
  }
</style>
