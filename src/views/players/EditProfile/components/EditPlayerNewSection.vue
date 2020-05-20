<template>
  <div>
    <p style="font-weight:bold;margin-top:20px">{{ $t('edit-profile:custom-section-title') }}</p>
    <div class="d-flex">
      <input
        type="text"
        @input="setTitle"
        :value="title"
        :placeholder="$t('edit-profile:section-title')"
      />
      <b-button variant="outline-secondary">{{
        $t('edit-profile:custom-section-remove')
      }}</b-button>
    </div>
    <EditField @input="setText" :content="$t('edit-profile:new-section-placeholder')" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class PlayerNewSection extends Vue {
    private title: string = '';

    private text: string = '';

    setTitle(event: any) {
      // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
      const title = event.target.value;
      this.title = title;
      this.sendSection();
    }

    setText(text: string) {
      this.text = text;
      this.sendSection();
    }

    sendSection() {
      this.$emit('set-section', { title: this.title, text: this.text });
    }
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

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
  }
</style>
