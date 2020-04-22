<template>
  <div>
    <p style="font-weight:bold;margin-top:20px">Custom Section</p>
    <div class="d-flex">
      <input type="text" :placeholder="$t('edit-profile:section-title')" />
      <b-button variant="outline-secondary">{{
        $t('edit-profile:custom-section-remove')
      }}</b-button>
    </div>
    <EditField :content="$t('edit-profile:new-section-placeholder')" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  import PlayerFeaturedAchievement from './PlayerFeaturedAchievement.vue';

  @Component({
    components: { PlayerFeaturedAchievement, EditField },
  })
  export default class PlayerNewSection extends Vue {
    @Prop({ required: true }) pageData!: object;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .about-me {
    font-size: 1.375rem;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
  }

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
  }
</style>
