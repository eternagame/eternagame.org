<template>
  <EternaPage :title="`Create New Group`">
    <notifications position="bottom center" width="50%"/>
    <div class="page-content">
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
      <div class="flex" style="margin-top:20px">
        <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit" :disabled="loading">
          {{$t('edit-group:save')}}
          <b-spinner v-if="loading" small />
        </b-button>
        <b-button
          type="submit"
          style="margin-left:10px"
          variant="secondary"
          :to="`/groups`"
        >
          {{ $t('edit-group:cancel') }}
        </b-button>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import Notifications from 'vue-notification';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import Utils from "@/utils/utils";
  import EditGroupHeader from './components/EditGroupHeader.vue';
  import EditGroupDiscription from './components/EditGroupDiscription.vue';
  import EditGroupVisibility from './components/EditGroupVisibility.vue';

  Vue.use(Notifications);

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      EditGroupHeader,
      EditGroupDiscription,
      EditGroupVisibility,
      Preloader,
    },
  })
  export default class CreateGroup extends Mixins(FetchMixin) {
    name = "";

    private nid: string = "";

    body = "";

    is_private = "";

    private group_type = "";

    newBody: string | null = null;

    private currentPicture?: string;

    newPicture: File | null = null;

    private email = "";

    private newPassword?: string;

    private currentPassword = "";

    private messagesNotify = false;

    private newsNotify = false;

    isPrivate = false;

    loading = false;

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getGroupAvatar(this.currentPicture || null);
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      data.set('nid', this.nid);
      data.set('group-title-input', this.name);
      data.set('group-description-input', this.newBody === null ? this.body : this.newBody);
      data.set('group-type', this.is_private? "private" : "public");
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'create_group');

      try {
        const res = await this.$http.post("/post/", data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/groups/`);
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
