<template>
  <b-dropdown-item
    style="padding-left:0px;margin-left:0px"
    :to="isLinkInternal(to) ? to : undefined"
    :href="isLinkInternal(to) ? undefined : to"
  >
    <div class="d-flex">
      <img
        class="d-none d-sm-block rounded-circle player-image-large"
        :src="avatar"
        v-if="avatar"
        style="margin-right:10px;position:relative;top:10px;width:30px;height:30px"
        alt=""
      />
      <div class="description">
        <span v-if="prefix">
          {{ prefix }}
        </span>
        <b v-dompurify-html="strippedBody(content)"/>
      </div>
    </div>
  </b-dropdown-item>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  @Component({})
  export default class BaseNotification extends Vue {
    @Prop({ required: true }) readonly to!: string;

    @Prop() readonly avatar?: string;

    @Prop() readonly prefix?: string;

    @Prop({ required: true }) readonly content!: string;

    strippedBody = Utils.strippedBody;

    isLinkInternal = Utils.isLinkInternal;
  }
</script>

<style lang="scss" scoped>
  .description {
    margin-top: 5px;
    font-weight: normal;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-transform: none;
  }
</style>
