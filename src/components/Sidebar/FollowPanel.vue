<template>
  <div v-if="fetchState.firstFetchComplete">
    <b-btn
      variant="primary"
      @click="follow" v-if="follows.length === 0"
      :disabled="processing"
    >
      Follow
      <b-spinner v-if="processing" small></b-spinner>
    </b-btn>
    <b-btn
      variant="primary"
      @click="unfollow" v-if="follows.length === 1"
      :disabled="processing"
    >
      Unfollow
      <b-spinner v-if="processing" small></b-spinner>
    </b-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import FetchMixin from '@/mixins/FetchMixin';
  import { FollowItem } from '@/types/common-types';

  @Component({})
  export default class FollowPanel extends mixins(SidebarPanelMixin, FetchMixin) {
    @Prop({ required: true }) nid!: number;

    follows: FollowItem[] = [];

    processing = false;

    async fetch() {
      const res = await this.$http.get(`/get/?type=follow&id=${this.nid}&follow_type=node`);
      this.follows = res.data.data.follow;
    }

    async follow() {
      this.processing = true;
      try {
        await this.$http.post('/post/', new URLSearchParams({
          type: 'follow',
          id: this.nid.toString(),
          follow_type: 'node'
        }));
        await this.$fetch();
      } finally {
        this.processing = false;
      }
    }

    async unfollow() {
      this.processing = true;
      try {
        await this.$http.post('/post/', new URLSearchParams({
          type: 'expire_follow',
          id: this.nid.toString(),
          follow_type: 'node'
        }));
        await this.$fetch();
      } finally {
        this.processing = false;
      }
    }
  }
</script>

<style scoped lang="scss"></style>
