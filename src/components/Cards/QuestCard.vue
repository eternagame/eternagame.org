<template>
  <div :id="popoverId">
    <AspectRatioCard>
      <template #header>
        <!-- <div class="quest-card-title" v-if="title">
          <b>{{ title }}</b>
        </div> -->
      </template>
      <div :style="{ cursor: !locked && 'pointer' }" @click="goToQuest()">
        <img :src="image" class="image" />
      </div>
      <template #footer>
        <div style="text-align:center; margin-bottom:0px">
          <img src="@/assets/noun_lock.svg" v-if="locked" />
          <div v-else>
            <p v-if="completed">
              <img src="@/assets/noun_check.svg" @click="goToGame()" /><b>{{
                `completed!`.toUpperCase()
              }}</b>
            </p>
            <div v-else>
              <b-button
                type="submit"
                variant="primary"
                style="margin-bottom:10px"
                @click="goToGame()"
                >{{ $t('quest-card:play') }}</b-button
              >
              <div @click="goToGame()" style="cursor:pointer" v-if="started">
                <b-progress :value="to_next" max="1"></b-progress>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AspectRatioCard>
    <b-popover :target="popoverId" triggers="hover">
      <div v-dompurify-html="desc"></div>
    </b-popover>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';

  @Component({
    components: {
      AspectRatioCard,
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

    redirect(path: string) {
      window.location.href = path;
    }

    goToGame() {
      const link = this.puzzleLink || (this.current_puzzle && `${PUZZLE_ROUTE_PREFIX}${this.current_puzzle}/`);
      if (link) this.redirect(link);
    }

    goToQuest() {
      const link = this.questLink || (this.title && `/quest/${this.title}`);
      if (!this.locked && link) this.redirect(link);
    }

    private locked = Number(this.level) - 1 > Number(this.current_level);

    private started = this.to_next > 0 && !this.locked;

    private completed = this.to_next >= 1 && !this.locked;

    private popoverId: string = `popover-target-${this.title}`;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .image {
    max-width: 242px;
    max-height: 175px;
  }

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
  }

  .quest-card-title {
    height: 30px;
    text-align: center;
  }
</style>
