<template>
  <EternaPage v-if="fetchState.firstFetchComplete && script" :title="script.title">
    <div class="page-content">
      <div
        style="overflow-wrap: break-word;"
        v-dompurify-html="script.body"
      />
      <!-- TODO: Script inputs -->
      <!-- TODO: Script source -->
      <!-- TODO: Script execution -->
    </div>
    <Comments :comments="comments" :nid="script.nid" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        header="Script Info"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" alt="info" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="script">
          <li>
            <img :src="avatar" alt="author" class="icon" />{{ script.author.name }}<span v-b-tooltip.hover title="Trusted author" v-if="script.is_trusted === '1'">&nbsp;✔</span>
          </li>
          <li>{{ script.type }}</li>
        </ul>
      </SidebarPanel>
      <div>
        <!-- TODO: Favorite -->
        <!-- TODO: Private -->
        <!-- TODO: Edit type -->
        <!-- TODO: Edit name/body -->
        <FollowPanel class="submit-button" :nid="$route.params.id" :isInSidebar="isInSidebar" v-if="isInSidebar" />
      </div>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { Script, ScriptResponse, CommentItem } from '@/types/common-types';
  import FollowPanel from '@/components/Sidebar/FollowPanel.vue';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      EternaPage,
      SidebarPanel,
      Preloader,
      Comments,
      FollowPanel
    },
  })
  export default class ScriptView extends Mixins(FetchMixin) {
    script: Script | null = null;

    comments: CommentItem[] = [];

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=script&need=script&id=${this.$route.params.id}`)
      ).data.data as ScriptResponse;
      // eslint-disable-next-line prefer-destructuring
      this.script = res.script[0];
      this.comments = res.comments;
    }

    get avatar() {
      return Utils.getAvatar(null);
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }

  li {
    margin-bottom: 20px;
  }
</style>
