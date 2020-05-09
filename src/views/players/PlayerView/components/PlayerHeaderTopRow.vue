<template>
  <div class="d-flex">
    <b-form-checkbox
      class="mt-1 mr-3"
      id="checkbox-1"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
      >{{ $t('player-view:following') }}
    </b-form-checkbox>
    <b-button type="submit" style="margin-left:10px; padding: 0 30px;" variant="primary">{{
      $t('player-view:message')
    }}</b-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import axios, { AxiosInstance } from 'axios';
  import { UserData } from '@/types/common-types';

  @Component({})
  export default class PlayerHeaderTopRow extends Vue {
    @Prop() user!: UserData;

    private follows = false;

    created() {
      axios.get(`/get/?type=follow&id=${'2804'}`).then(response => {
        this.follows = response.data.data.follows.includes(this.user.uid);
      });
    }
  }
</script>
