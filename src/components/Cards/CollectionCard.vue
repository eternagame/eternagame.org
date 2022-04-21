<template>
  <div ref="root">
    <AspectRatioCard>
      <template #header>
        <div class="collection-card-title">
          {{ title }}
        </div>
      </template>
      <SmartLink :link="toCollection">
        <img
          v-if="image"
          :src="image"
          style="width: 80%; margin: auto"
          class="scalable"
        />

        <img
          v-if="!image"
          src="@/assets/logo.svg"
          style="width: 80%; margin: auto"
          class="scalable"
        />
      </SmartLink>
      <template #footer>
        <div style="text-align: center; margin-bottom: 0px">
          <img src="@/assets/noun_lock.svg" v-if="locked" />
          <div v-else>
            <p v-if="completed">
              <SmartLink :link="toGame">
                <img src="@/assets/noun_check.svg" />
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
  import { Component, Mixins, Prop, Ref, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import Utils from '@/utils/utils';
  import {
    ClearedPuzzle,
    CollectionResponse,
    PuzzleItem,
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';

  @Component({
    components: {
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class CollectionCard extends Mixins(FetchMixin) {
    @Prop({ required: true }) readonly image!: string;

    @Prop({ required: false }) to_next!: number;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly desc!: string;

    @Prop({ required: false }) readonly level!: string;

    @Prop({ required: true }) readonly nid!: string;

    @Prop() readonly collectionLink?: string;

    @Prop() readonly puzzleLink?: string;

    @Prop({ required: false }) readonly current_level!: string;

    @Prop() readonly current_puzzle?: string;

    @Ref('root') readonly root!: HTMLDivElement;

    puzzles: PuzzleItem[] = [];

    cleared: ClearedPuzzle[] = [];

    get nav() {
      return Utils.isLinkInternal(this.toGame) ? 'to' : 'href';
    }

    get toGame() {
      return (
        this.puzzleLink ||
        (this.current_puzzle &&
          `${PUZZLE_ROUTE_PREFIX}${this.current_puzzle}/`) ||
        this.toCollection
      );
    }

    get toCollection() {
      return this.collectionLink || (this.title && `/collections/${this.nid}`);
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

    async fetch() {
      const res = (await this.$http.get(`/get/?type=collection&nid=${this.nid}`))
        .data.data as CollectionResponse;
      const puzzlelist = res.collection.puzzles.split(',');
      Object.values(puzzlelist).forEach(async (puzz) =>
        this.puzzles.push(
          (await this.$http.get(`/get/?type=puzzle&nid=${parseInt(puzz, 10)}`))
            .data.data as PuzzleItem,
        ),
      );
      this.cleared = await (
        await this.$http.get(`/get/?type=puzzle&nid=${puzzlelist[0]}`)
      ).data.data.cleared;
      this.cleared = this.cleared.filter((x) =>
        this.puzzles.map((y) => y.nid).includes(x.nid),
      );
      this.to_next = this.cleared.length / this.puzzles.length;
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

.collection-card-title {
  height: 30px;
  text-align: center;
}
</style>