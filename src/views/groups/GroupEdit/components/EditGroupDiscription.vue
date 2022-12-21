<template>
  <div class="b-container">
    <div class="row">
      <!-- div class="col-md-8"-->
      <div class="col-md-12">
        <h4 class="about-me">{{ $t('group-view:group-info') }}</h4>
        <p style="font-weight:bold;margin-top:10px">{{ $t('edit-group:group-name') }}</p>
        <input
          style="color:#fff"
          type="text"
          :placeholder="$t('edit-group:group-name')"
          :aria-label="$t('edit-group:group-name')"
          :value="personalName"
          @input="e => $emit('update:personalName', e.target.value)"
        />
        <p style="font-weight:bold;margin-top:10px">{{ $t('edit-group:discription') }}</p>
        <EditField class="editor" :content="aboutMe" @input="text => $emit('update:aboutMe', text)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class GroupDescription extends Vue {
    @Prop({required: true}) aboutMe!: string;

    @Prop({required: true}) personalName!: string;

    private addingSection: boolean = false;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .about-me {
    font-size: 20.625px;
    font-weight: bold;
  }

  .about-me-text {
    max-width: 710px;
  }

  input, .editor {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
  }
</style>
