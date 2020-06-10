<template>
  <div class="container" ref="container">
    <div class="row justify-content-between">
      <div class="col p-0" style="text-align:right">
        <div class="b" style="opacity: 0.5; ">{{ timeCreated }}</div>
      </div>
    </div>

    <div>
      <div class="row d-flex" :style="{ marginTop: '10px' }">
        <SmartLink :link="'/players/' + sender">
          <img
            class="d-none d-sm-block rounded-circle player-image"
            :src="avatar"
            style="margin-right:10px"
          />
        </SmartLink>
        <p style="margin-top:5px">
          <slot/>
        </p>
      </div>
      <div v-dompurify-html="message" style="word-wrap: break-word;" />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
  import Utils from '@/utils/utils';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import VueScrollTo from 'vue-scrollto';
  import { NotificationNotificationItem, NotificationMessage, PrivateNotificationMessage, NotificationMessageType } from '@/types/common-types';

  Vue.use(VueScrollTo);

  @Component({
    components: { SmartLink },
  })
  export default class MessageItem extends Vue {
    @Prop({ required: true }) readonly sender!: string;

    @Prop({ required: true }) readonly message!: string;

    @Prop({ required: true }) readonly created!: string;

    @Prop({ required: true }) readonly avatar!: string;

    @Ref('container') readonly scrollTarget!: HTMLElement;

    maybeScroll() {
      if (window.location.hash && window.location.hash.substr(1) === String(this.created)) {
        VueScrollTo.scrollTo(this.scrollTarget, { offset: -100 });
      }
    }

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange() {
      this.maybeScroll();
    }

    mounted() {
      this.maybeScroll();
    }

    get timeCreated() {
      return new Date(Number(this.created) * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-image {
    width: 30px;
    height: 30px;
  }

  .btn {
    display: inline-block;
    width: 48%;
    margin-bottom: 0px;
  }

  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: $white;
  }

  .b {
    font-weight: bold;
  }

  .icon-text {
    margin-left: 7px;
    position: relative;
    top: 7px;
    font-weight: bold;
  }

  .card {
    color: $white;

    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    max-height: 600px;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }

  a:hover {
    text-decoration: none;
  }

  .text ::v-deep img {
    max-width: 100% !important;
  }
</style>
