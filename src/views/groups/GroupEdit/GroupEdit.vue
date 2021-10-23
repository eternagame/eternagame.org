<template>

  <EternaPage v-if="fetchState.firstFetchComplete && group">

    <b-form-input v-model="groupTitle" no-resize size="lg"></b-form-input>
    <div class="page-content">
      <h2>About the Group</h2>
      <div class="d-flex flex-wrap justify-content-between" xs="12" sm="8">
        <div style="text-align:center" class="order-sm-2 image-col">
          <div class="group-image">
            <img v-if="imageURL" :src="imageURL" />
          </div>
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            @click="submit"
            :disabled="!groupBody || !groupTitle || !access"
          >
          {{ $t('edit-submit') }}
          </b-button>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <b-textarea v-model="groupBody" rows="12" max-rows="12" no-resize></b-textarea>
          <div/>
        </div>
      </div>
    </div>


    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('group-view:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" />
        </template>
        <ul style="padding: 0; list-style-type:none" v-if="group">
        <li>
            <img :src="group.founder_picture" class="icon" />{{ group.founder_name }}
        </li>
        <li>
            <img src="@/assets/dollar.svg" class="icon" />{{ group.score }}
        </li>
        <li>
            <img src="@/assets/people.svg" class="icon" />{{ group.num_members }}
        </li>
        <li>
            <img src="@/assets/calendar.svg" class="icon" />{{ group.created }}
        </li>
        <li>
          <b-button
            type="submit"
            variant="primary"
            class="submit-button"
            :href="`${tutorialRoute}${group.nid}`"
          >
          {{ $t('edit-group-delete') }}
          </b-button>
          </li>
        </ul>
      </SidebarPanel>
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem;" />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { GroupResponse, Group, CommentItem, } from '@/types/common-types';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      SidebarPanel,
      Preloader,

    },
  })
  export default class GroupView extends Mixins(FetchMixin) {
    
    group: Group | null = null;

    nid: string = "";

    comments: CommentItem[] = [];
    
    access: boolean = false;

    groupTitle: string = "";

    groupBody: string = "";

    async submit(){
      
      if(this.access && this.groupTitle && this.groupBody){
 
        this.$http.post('/post/', new URLSearchParams({
          type: 'edit_group',
          nid: this.nid,
          name: this.groupTitle,
          body: this.groupBody,
        }))
          .then(res => {
            this.$router.push({path: `/groups/${this.nid}`});
          });
      }
    }

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=group&nid=${this.$route.params.id}`)
      ).data.data as GroupResponse;

      if(this.$vxm.user.username !== res.group.founder_name){
        this.$router.push({path: `/groups/${res.uid}`});
      }
      this.access = true;
      this.group = res.group;
      this.nid = res.group.nid;
      this.comments = res.comments;
      this.groupTitle = res.group.name;
      this.groupBody = res.group.body;

    }

    get avatar() {
      return Utils.getAvatar(this.group?.founder_picture || null);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';


  .description-col {
    width: calc(60% - 15px);
  }

  .image-col {
    width: 40%;
  }

  @include media-breakpoint-down(xs) {
    .description-col, .image-col {
      width: 100%;
    }
  }

  .quest-image {
    margin: 15px;
  }

  .group-image {
    width: 100%;
    background-color: #041227;
    border-radius: 5px;
    padding: 1.6rem 2.2rem;
    img {
      width: 100%;
      max-height: 400px;
    }
  }

  .group-description {
    white-space: pre-wrap;
  }

  .submit-button {
    margin-top: 15px;
  }
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  h3 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
  }
  p {
    font-size: 17px;
    line-height: 1.47;
  }

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
