<template>
  <EternaPage :title="`Edit Group`">
    <notifications position="bottom center" width="50%"/>
    <div class="page-content" v-if="fetchState.firstFetchComplete">
      <EditGroupHeader
        :loading="loading"
        @submit="submit"
        @update:picture="pic => newPicture = pic"
        :picture="picture"
      />
      <hr class="top-border" />
      <EditGroupDiscription
        :aboutMe="body"
        @update:aboutMe="text => newBody = text"
        :personalName.sync="name"
      />
      <hr class="top-border" />
      <EditGroupVisibility
        :isPrivate.sync="is_private"
      />
      <hr class="top-border" />
      <EditGroupMembers
        :parentNID="nid"
      />
      <hr class="top-border" />
      <div class="flex" style="margin-top:20px">
        <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit" :disabled="loading">
          {{$t('edit-group:save')}}
          <b-spinner v-if="loading" small />
        </b-button>
        <b-button
          type="submit"
          style="margin-left:10px"
          variant="secondary"
          :to="`/groups/${this.$route.params.id}`"
        >
          {{ $t('edit-group:cancel') }}
        </b-button>
                    <b-modal id="delete" title="Delete Group?" hide-footer>
              <div class="d-block text-center">
                Warning: This will permanently delete the group!
                <br/>
                <br/>
                Enter the title of the group to continue:
              </div>
              <input v-model="deleteTitle"/>
              <b-button
                class="mt-3"
                type="submit"
                style="margin-left: 10px"
                variant="danger"
                :disabled="deleteTitle != name"
                @click="deleteGroup()"
              >
                {{ 'Delete' }}
              </b-button>
              <b-button
                class="mt-3"
                type="submit"
                style="margin-left: 10px"
                variant="secondary"
                @click="$bvModal.hide('delete')"
              >
                {{ 'Cancel' }}
              </b-button>
            </b-modal>
            <b-button
              type="submit"
              style="margin-left: 10px"
              variant="danger"
              v-b-modal.delete
            >
              {{ 'Delete' }}
            </b-button>
      </div>
    </div>
    <Preloader v-else />
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import axios from 'axios';
  import Notifications from 'vue-notification';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { Group } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import Utils from "@/utils/utils";
  import EditGroupHeader from './components/EditGroupHeader.vue';
  import EditGroupDiscription from './components/EditGroupDiscription.vue';
  import EditGroupVisibility from './components/EditGroupVisibility.vue';
  import EditGroupMembers from './components/EditGroupMembers.vue';

  Vue.use(Notifications);

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      EditGroupHeader,
      EditGroupDiscription,
      EditGroupVisibility,
      EditGroupMembers,
      Preloader,
    },
  })
  export default class CreateGroup extends Mixins(FetchMixin) {
    name = "";

    deleteTitle = "";

    nid: string = "";

    body = "";

    is_private = false;

    newBody: string | null = null;

    private currentPicture?: string;

    newPicture: File | null = null;

    loading: Boolean = false;

    async fetch() {
      const group = (await axios.get(`/get/?type=group&nid=${this.$route.params.id}`)).data.data.group as Group;
      this.nid = group.nid;
      this.body = group.body;
      this.name = group.name;
      this.is_private = group.is_private === 'true';
      this.currentPicture = group.picture;
    }

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getGroupAvatar(this.currentPicture || null);
    }

    async deleteGroup() {
      this.$http.post('/post/', new URLSearchParams({
        type: 'delete_group',
        nid: this.nid,
      })).then(() => {
        this.$router.push({path: `/groups`});
      });
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('nid', this.nid);
      data.set('group-title-input', this.name);
      data.set('group-description-input', this.newBody === null ? this.body : this.newBody);
      data.set('group-type', this.is_private? "private" : "public");
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'edit_group');

      try {
        const res = await this.$http.post("/post/", data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/groups/${this.$route.params.id}`);
      } catch (e: any) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
    margin-top: 5px;
  }
</style>
