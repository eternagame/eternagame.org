<template>
  <SmartLink :link="backgroundLink ? `/groups/${nid}` : ''">
    <AspectRatioCard :aspectRatio="aspectRatio" :id="`popover-target-${nid}`" class="card">
      <template #header>
        <div class="group-card-title" v-if="name">
          <SmartLink :link="`/groups/${nid}`"><img src="@/assets/info.svg" alt="info" v-if="rightNumber" style="float:right" /></SmartLink>

          <b>{{ name }}</b>
        </div>
      </template>
      <img :src="picture" alt="" v-if="picture != null" style="width: 100%; margin: auto; max-height: 400px" class="scalable" />
      <img src="@/assets/group.svg" alt="" v-if="picture == null" style="width: 100%; margin: auto; max-height: 400px" class="scalable" />
      <template #footer>
        <div style="width: 100%;" class="d-flex justify-content-between" v-if="$slots.buttons">
          <slot name="buttons" />
        </div>


        <b-row class="mb-2" style="margin-top:10px">
          <b-col cols="6">
            <div class="left-col" v-if="founder_name">
              <slot name="left-icon">
                <img src="@/assets/calendar.svg" alt="created on" class="icon" />              </slot>
              <div v-if="created"> {{ created }} </div>
            </div>

          </b-col>
          <b-col cols="6">
            <div class="right-col" v-if="numJoined">
              <slot name="right-icon">
                <img src="@/assets/people.svg" alt="players joined" class="icon" />
              </slot>
              {{ numJoined }}
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2" style="margin-top:10px">
          <b-col cols="6">
            <div class="left-col" v-if="founder_name">
              <slot name="left-icon">
                <img :src="founder_picture" alt="" id="avatarimage" class="icon">
              </slot>
              <div v-if="founder_name"> {{ founder_name }} </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="right-col">
              <slot name="right-icon">
                <img src="@/assets/noun_lock.svg" alt="private" v-if="is_private === 'true'" class="icon" />
              </slot>
            </div>
          </b-col>
        </b-row>

      </template>
    </AspectRatioCard>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import AspectRatioCard from './AspectRatioCard.vue';
  import StateCounter from './StateCounter.vue';
  import SmartLink from '../Common/SmartLink.vue';

  @Component({
    components: {
      StateCounter,
      AspectRatioCard,
      SmartLink,
    },
  })
  export default class GroupCard extends Vue {
    @Prop({required: true}) readonly name!: string;

    @Prop({required: true}) readonly nid!: string;

    @Prop() readonly founder_picture?: string;

    @Prop() readonly founder_name?: string;

    @Prop() readonly picture?: string;

    @Prop() readonly leftNumber?: number;

    @Prop() readonly rightNumber?: number;

    @Prop() readonly created?: number;

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop({ default: false }) readonly is_private!: string;

    @Prop({ default: false }) readonly joined!: boolean;

    @Prop({ default: false }) readonly madeByPlayer!: boolean;

    // Whether clicking on the card background should link to the group.
    @Prop({ default: true }) readonly backgroundLink!: boolean;

    get numJoined() {
      if (this.$attrs.num_members){
        return this.$attrs.num_members;
      }
      return 0;
    }

    get avatar() {
      return Utils.getAvatar(this.founder_picture || null);
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

  .group-card-title {
    height: 50px;
    text-align: center;
  }

  .middle-num {
    position: absolute;
    top: Calc(50%);
    left: 50%;
    transform: translate(-50%, -50%);
    color: #21508c;
    font-size: 8px;
    font-weight: 900;
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

  .right-col {
    justify-content: flex-end;
  }

  .inner {
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    position: absolute;
    z-index: 1;
  }

  .card {
    transition: 0.3s ease;
    color: $white;
  }

  .card:hover {
    border: 1px solid gold;
  }

  .card:active {
    background-color: #01010188;
  }
</style>
