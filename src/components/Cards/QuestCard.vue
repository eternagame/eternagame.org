<template>
  <div ref="root">
    <AspectRatioCard>
      <template #header> </template>
      <SmartLink :link="toQuest">
        <img :src="image" style="width: 80%; margin: auto" class="scalable" :alt="title" />
      </SmartLink>
      <template #footer>
        <div style="text-align: center; margin-bottom: 0px">
          <img src="@/assets/noun_lock.svg" v-if="locked" alt="locked" />
          <div v-else>
            <p v-if="completed">
              <SmartLink :link="toGame">
                <img src="@/assets/noun_check.svg" alt="completed" />
                <b style="text-transform: uppercase">{{
                  $t('collection:completed')
                }}</b>
              </SmartLink>
            </p>
            <div v-else>
              <b-button
                variant="primary"
                style="margin: 10px 0"
                :[nav]="toGame"
              >
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
    <b-popover :target="() => root" triggers="hover" placement="top">
      <div v-dompurify-html="desc"></div>
    </b-popover>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class QuestCard extends Vue {
    @Prop({ required: true }) readonly image!: string;

    @Prop({ required: true }) readonly to_next!: number;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly desc!: string;

    @Prop({ required: true }) readonly level!: string;

    @Prop() readonly questLink?: string;

    @Prop() readonly puzzleLink?: string;

    @Prop({ required: true }) readonly current_level!: string;

    @Prop() readonly current_puzzle?: string;

    @Ref('root') readonly root!: HTMLDivElement;

    get nav() {
      return Utils.isLinkInternal(this.toGame) ? 'to' : 'href';
    }

    get toGame() {
      return (
        this.puzzleLink ||
        (this.current_puzzle &&
          `/puzzles/${this.current_puzzle}/play`) ||
        this.toQuest
      );
    }

    get toQuest() {
      return this.questLink || (this.title && `/quests/${this.title}`);
    }

    get locked() {
      return Number(this.level) - 1 > Number(this.current_level);
    }

    get started() {
      return this.to_next > 0 && !this.locked;
    }

    get completed() {
      return this.to_next >= 1 && !this.locked;
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.btn {
  display: inline-block;
  width: 48%;
  margin-bottom: 0px;
}
:deep(.card-body) {
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
