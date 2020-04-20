<template>
  <div>
    <p style="font-weight:bold">{{ $t('edit-profile:change-password') }}</p>
    <input type="text" :placeholder="$t('edit-profile:new-password')" />
    <input type="text" :placeholder="$t('edit-profile:confirm-password')" />

    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-address') }}</p>
    <input type="text" placeholder="me@here.com" />
    <p>{{ $t('edit-profile:email-details') }}</p>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-notifications') }}</p>
    <b-form-checkbox
      id="checkbox-1"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
      ><b>{{ $t('edit-profile:email-private-messages') }}</b>
    </b-form-checkbox>
    <b-form-checkbox
      id="checkbox-1"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
      ><b>{{ $t('edit-profile:email-news-posts') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class PlayerEditCredentials extends Vue {
    @Prop({ required: true }) pageData!: object;

    private addingSection: boolean = false;
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
