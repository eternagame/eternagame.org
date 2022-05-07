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
          :src="getImage(puzzles[0].nid)"
          style="width: 80%; margin: auto"
          class="scalable"
        />
      </SmartLink>
      <template #footer>
        <div style="width: 100%;" class="d-flex justify-content-between" v-if="$slots.buttons">
          <slot name="buttons" />
        </div>
        <b-row class="mb-2" style="margin-top: 10px">
          <b-col cols="6">
            <div class="left-col">
              <slot name="left-icon">
                <img
                  src="@/assets/chemical_bond.svg"
                  alt="collection size"
                  class="icon"
                />
              </slot>
              {{ puzzles.length }}
            </div>
          </b-col>
          <b-col cols="6">
            <div class="right-col">
              <slot name="right-icon">
                <img
                  :src="founder_picture"
                  alt="founder image"
                  class="icon"
                  id="avatarimage"
                />
              </slot>
              {{ founder_name }}
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2" style="margin-top: 10px">
          <b-col>
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
          </b-col>
        </b-row>
      </template>
    </AspectRatioCard>
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

    @Prop({ required: true }) readonly founder_picture!: string;

    @Prop({ required: true }) readonly founder_name!: string;

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

    getImage(nid: string) {
      const image = Utils.getPuzzleMiddleThumbnail(nid);
      return image;
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

  .icon {
    width: 19px;
    margin-right: 5px;
  }

  .left-col,
  .right-col {
    font-size: 11px;
    display: flex;
    align-items: center;
    font-weight: bold;

    & > .icon {
      width: 12.57px;
    }
  }
</style>