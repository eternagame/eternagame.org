<template>
  <SmartLink :link="backgroundLink ? `/groups/${nid}` : ''">
    <AspectRatioCard :aspectRatio="aspectRatio" :id="`popover-target-${nid}`" class="card">
      <template #header>
        <div class="group-card-title" v-if="name">
          <img src="@/assets/noun_check.svg" v-if="false" style="float:right" />
          
          <SmartLink :link="`/groups/${nid}`"><img src="@/assets/info.svg" v-if="rightNumber" style="float:right" /></SmartLink>

          <b>{{ name }}</b>
        </div>
      </template>
      <img :src="picture" style="width: 80%; margin: auto;" class="scalable" />
      <img src="@/assets/noun_lock.svg" v-if="is_private" class="inner" />
      <template #footer>
        <div style="width: 100%;" class="d-flex justify-content-between" v-if="$slots.buttons">
          <slot name="buttons" />
        </div>


        <b-row class="mb-2" style="margin-top:10px">
          <b-col cols="6">
            <div class="left-col" v-if="founder_name">
              <slot name="left-icon">
                <img :src="founder_picture" id="avatarimage" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMy45OTkiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQiPg0KICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMiwyNEExMiwxMiwwLDEsMSwyNCwxMiwxMi4wMTMsMTIuMDEzLDAsMCwxLDEyLDI0Wk04LjE4NSwxMi44NzJhLjQ5LjQ5LDAsMCwxLC4xMzQuMDIuNDczLjQ3MywwLDAsMSwuMzE5LjMxOCw2LjEsNi4xLDAsMCwwLDEuMTA4LDIuMjE5LjQ3Mi40NzIsMCwwLDEsLjExMS4zdjEuMzM3YS45NjMuOTYzLDAsMCwxLS40OTEuODEyLjQ3Ny40NzcsMCwwLDEtLjExOC4wNDMsMTUuNTU0LDE1LjU1NCwwLDAsMC00Ljg0MiwyLjEsMTEuMDMsMTEuMDMsMCwwLDAsMTUuMTkxLDAsMTUuNCwxNS40LDAsMCwwLTQuODQxLTIuMS40NDMuNDQzLDAsMCwxLS4xMTctLjA0Mi45NTEuOTUxLDAsMCwxLS40OTItLjgxM1YxNS43MzJhLjQ2OS40NjksMCwwLDEsLjExMS0uMyw2LjEsNi4xLDAsMCwwLDEuMTA3LTIuMjE5LjQ2Ni40NjYsMCwwLDEsLjMxOS0uMzE5LjQ3OS40NzksMCwwLDEsLjEzNC0uMDIuNDY5LjQ2OSwwLDAsMSwuMjkyLjEsNi45NTgsNi45NTgsMCwwLDAsLjI0Ni0xLjgybC0uMDEzLDBoLS4wMzRhLjQ2OS40NjksMCwwLDEtLjQ2OC0uNTRjLjEyNS0uODI4LjMtMi44OTItLjgtNC4xNzFBMy44MTMsMy44MTMsMCwwLDAsMTIsNS4zMDksMy44MSwzLjgxLDAsMCwwLDguOTYyLDYuNDQ4Yy0xLjEsMS4yNzgtLjkyNiwzLjM0Mi0uOCw0LjE3YS40NjkuNDY5LDAsMCwxLS40NjguNTQuNDA3LjQwNywwLDAsMS0uMDQ3LDAsNi45MjUsNi45MjUsMCwwLDAsLjI0NSwxLjgyQS40NzEuNDcxLDAsMCwxLDguMTg1LDEyLjg3MlpNMTYuMSwxMy45NzdBNi43NSw2Ljc1LDAsMCwxLDE1LjA4NiwxNS45djEuMTM3YTE1LjgsMTUuOCwwLDAsMSw1LjE4LDIuMywxMS4wNTgsMTEuMDU4LDAsMSwwLTE2LjUzMywwLDE1Ljk4NiwxNS45ODYsMCwwLDEsNS4xODEtMi4zVjE1LjlBNi43Nyw2Ljc3LDAsMCwxLDcuOSwxMy45NzdsLS4wNjQsMGEuOC44LDAsMCwxLS42NTMtLjM1Miw1LjI0NSw1LjI0NSwwLDAsMS0uMzM4LTMuMTg3LjYxNi42MTYsMCwwLDEsLjMyMS0uMjQ4QTUuODg4LDUuODg4LDAsMCwxLDguMjQ5LDUuODM0LDQuNyw0LjcsMCwwLDEsMTIsNC4zNjlhNC43LDQuNywwLDAsMSwzLjc1MSwxLjQ2NCw1Ljg4OSw1Ljg4OSwwLDAsMSwxLjA4Niw0LjM2LjYyMy42MjMsMCwwLDEsLjMyMi4yNDgsNS4yNTIsNS4yNTIsMCwwLDEtLjMzOCwzLjE4Ni44LjgsMCwwLDEtLjY1NC4zNTNsLS4wNjQsMFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K'" class="icon">
              </slot>
              <div v-if="founder_name"> {{ founder_name }} </div>
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

    @Prop({ default: 1 }) readonly aspectRatio!: number;

    @Prop({ default: false }) readonly is_private!: boolean;

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

  ::v-deep .card-body {
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
