<template>
  <EternaPage v-if="fetchState.firstFetchComplete && group" :title="group.name">
    <notifications position="top center" width="50%" />
    <div class="page-content">
      <h2>About the Group</h2>
      <div class="d-flex flex-wrap justify-content-between" xs="12" sm="8">
        <div style="text-align: center" class="order-sm-2 image-col">
          <div class="group-image">
            <img alt="" v-if="group.picture" :src="group.picture" />
            <img alt="" v-if="!group.picture" src="@/assets/group.svg" />
          </div>
        </div>

        <div class="order-sm-1 description-col">
          <hr class="top-border d-sm-none" />
          <div
            class="group-description"
            style="overflow-wrap: break-word"
            v-dompurify-html="group.body"
          />
        </div>
      </div>
      <div class="flex" style="margin-top: 20px">
        <b-button v-b-modal.modal-members style="margin-left: 10px"
          >View Members</b-button
        >
        <b-modal id="modal-members" title="Group Members">
          <div>
            Admins:
            <ul>
              <li v-for="player in admins" :key="player.name">
                <img alt="" :src="`../${player.picture}`" class="icon" />
                <router-link :to="`/players/${player.uid}/`">
                  {{ player.name }}
                </router-link>
              </li>
            </ul>
          </div>
          <div>
            Members:
            <ul>
              <li v-for="player in members" :key="player.name">
                <img alt="" :src="`../${player.picture}`" class="icon" />
                <router-link :to="`/players/${player.uid}/`">
                  {{ player.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </b-modal>
        <b-button
          v-if="editRights"
          v-b-modal.modal-message
          style="margin-left: 10px"
          >Message Members</b-button
        >
        <b-modal id="modal-message" title="Message Group Members">
          <GroupMessageCompose
            @submit-message="sentMessage"
            :parentNID="group.nid"
          />
        </b-modal>
        <b-button
          v-if="editRights && pendings"
          v-b-modal.modal-pending
          style="margin-left: 10px"
          >Pending Members</b-button
        >
        <b-modal id="modal-pending" title="Group Members">
          <div>
            Pending Members:
            <ul>
              <li v-for="player in pendings" :key="player.name">
                <img :src="`../${player.picture}`" class="icon" alt="" />
                <router-link :to="`/players/${player.uid}/`">
                  {{ player.name }}
                </router-link>
                <b-btn
                  type="submit"
                  variant="primary"
                  class="submit-button"
                  @click="accept(player.uid)"
                  style="margin-left: 5px;"
                >
                  Accept
                </b-btn>
                <b-btn
                  type="submit"
                  variant="primary"
                  class="submit-button"
                  @click="reject(player.uid)"
                  style="margin-left: 5px;"
                >
                  Decline
                </b-btn>
              </li>
            </ul>
          </div>
        </b-modal>
      </div>
    </div>
    <Comments :comments="comments" :nid="group.nid" />

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('group-view:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" alt="info" />
        </template>
        <ul style="padding: 0; list-style-type: none" v-if="group">
          <li>
            <img :src="`../${group.founder_picture}`" alt="founder" class="icon" />{{
              group.founder_name
            }}
          </li>
          <li>
            <img src="@/assets/dollar.svg" class="icon" alt="total points"/>{{ group.score }}
          </li>
          <li>
            <img src="@/assets/people.svg" class="icon" alt="number of members"/>{{
              group.num_members
            }}
          </li>
          <li>
            <img src="@/assets/calendar.svg" class="icon" alt="created on"/>{{ group.created }}
          </li>
          <li></li>
          <div v-if="editRights">
            <li>
              <b-button
                type="submit"
                variant="primary"
                class="submit-button"
                :to="`/groups/${nid}/edit`"
              >
                {{ $t('edit-group-title:description') }}
              </b-button>
            </li>
          </div>
          <div v-if="$vxm.user.loggedIn">
            <li>
              <b-button
                v-if="!following"
                type="submit"
                variant="primary"
                class="submit-button"
                @click="follow"
              >
                {{ $t('group-view:follow') }}
              </b-button>
              <b-button
                v-if="following"
                type="submit"
                variant="primary"
                class="submit-button"
                @click="unfollow"
              >
                {{ $t('group-view:unfollow') }}
              </b-button>
            </li>
            <li>
              <b-button
                v-if="!subscribed && !is_pending"
                type="submit"
                variant="primary"
                class="submit-button"
                @click="subscribe"
              >
                {{ $t('group-view:subscribe') }}
              </b-button>
              <b-button
                v-if="is_pending"
                type="submit"
                variant="primary"
                class="submit-button"
                disabled
              >
                {{ $t('group-view:pending') }}
              </b-button>
              <b-button
                v-if="subscribed"
                type="submit"
                variant="primary"
                class="submit-button"
                @click="unsubscribe"
              >
                {{ $t('group-view:unsubscribe') }}
              </b-button>
            </li>
          </div>
        </ul>
      </SidebarPanel>
      <!-- <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
  <Preloader v-else style="margin-top: 10rem" />
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Utils from '@/utils/utils';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import {
    GroupResponse,
    Group,
    CommentItem,
    UserData,
  } from '@/types/common-types';
  import GroupMessageCompose from './components/GroupMessageCompose.vue';

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      SidebarPanel,
      Preloader,
      Comments,
      GroupMessageCompose,
    },
  })
  export default class GroupView extends Mixins(FetchMixin) {
    private deleteRoute: string = '';

    editRights: boolean = false;

    following: boolean = false;

    subscribed: boolean = false;

    group: Group | null = null;

    nid: string = '';

    admins: UserData[] = [];

    members: UserData[] = [];

    is_private: string = 'false';

    comments: CommentItem[] = [];

    is_pending: boolean = false;

    pendings: UserData[] = [];

    async fetch() {
      const res = (
        await this.$http.get(
          `/get/?type=group&nid=${this.$route.params.id}&script=-1`,
          {
            params: {
              order: this.$route.query.sort,
              filters:
                this.$route.query.filters &&
                (this.$route.query.filters as string).split(','),
            },
          },
        )
      ).data.data as GroupResponse;
      this.group = res.group;
      this.nid = res.group.nid;
      this.admins = res.group_admins;
      this.members = res.group_members;
      this.is_private = res.group.is_private;
      this.following = res.is_following;
      this.subscribed = res.is_member;
      this.is_pending = res.is_pending;
      this.comments = res.comments;
      this.pendings = res.group_pendings;
      if (this.group.founder_name === this.$vxm.user.username || res.is_admin)
        this.editRights = true;
    }

    get avatar() {
      return Utils.getAvatar(this.group?.founder_picture || null);
    }

    async accept(uid: string) {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'accept',
            uid,
            nid: this.nid,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    async reject(uid: string) {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'reject',
            uid,
            nid: this.nid,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    async subscribe() {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'subscribe',
            uid: (this.$vxm.user.uid === null
              ? 0
              : this.$vxm.user.uid
            ).toString(),
            nid: this.nid,
            is_private: this.is_private,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.follow_success !== undefined && resData.follow_success)
          this.following = true;
        if (resData?.subscribe_success !== undefined && resData.subscribe_success)
          this.subscribed = true;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    async follow() {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'follow_group',
            uid: (this.$vxm.user.uid === null
              ? 0
              : this.$vxm.user.uid
            ).toString(),
            nid: this.nid,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.success !== undefined && resData.success)
          this.following = true;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    async unsubscribe() {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'unsubscribe',
            uid: (this.$vxm.user.uid === null
              ? 0
              : this.$vxm.user.uid
            ).toString(),
            nid: this.nid,
            is_private: this.is_private,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.unfollow_success !== undefined && resData.unfollow_success)
          this.following = false;
        if (
          resData?.unsubscribe_success !== undefined &&
          resData.unsubscribe_success
        )
          this.subscribed = false;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    async unfollow() {
      try {
        const res = await this.$http.post(
          '/post/',
          new URLSearchParams({
            type: 'unfollow_group',
            uid: (this.$vxm.user.uid === null
              ? 0
              : this.$vxm.user.uid
            ).toString(),
            nid: this.nid,
          }),
        );
        const resData = res?.data?.data;
        if (resData?.success !== undefined && resData.success)
          this.following = false;
        if (resData?.error) this.$notify({ text: resData.error });
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
      this.fetch();
    }

    sentMessage() {
      this.$fetch();
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
  .description-col,
  .image-col {
    width: 100%;
  }
}

.quest-image {
  margin: 15px;
}

.group-image {
  width: 100%;
  //background-color: #041227;
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

#modal-members ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 10px;
  }
}

#modal-pending ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 10px;
  }
}
</style>
