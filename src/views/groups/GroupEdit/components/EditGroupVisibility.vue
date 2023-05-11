<template>
  <div>
    <p style="font-weight:bold">{{ $t('edit-group:privacy') }}</p>
      <b-form-checkbox style="margin-top:15px" :checked="isPrivate" @change="togglePrivate">
      <b>{{ $t('edit-group:private') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class GroupEditVisibility extends Vue {

    @Prop({ required: true }) isPrivate!: boolean;

    togglePrivate(checked: InputEvent) {
      this.$emit('update:isPrivate', checked);
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
