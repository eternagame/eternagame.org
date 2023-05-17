<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label>
    <div>{{ label }}</div>
    <b-form-select :options="options" :value="selectedValue" @change="onChange"/>
  </label>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import SmartLink from '../Common/SmartLink.vue';

  export interface Option {
    value: string;
    text: string;
    link?: string;
    suffix?: string;
  }

  @Component({
    components: { SmartLink },
  })
  export default class DropdownSidebarPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly options!: Option[];

    @Prop({ required: true }) readonly paramName!: string;

    @Prop({ required: true }) readonly label!: string;

    private selected = '';

    get selectedValue() {
      return this.selected || this.$route.query[this.paramName];
    }

    onChange(value: string) {
      const {[this.paramName]: oldMin, skip: oldSkip, ...query} = this.$route.query;
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(value !== '' ? {[this.paramName]: value} : {})
        },
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/_variables.scss';

  img {
    margin-top: -0.2rem;
    width: 0.9rem;
  }

  .options-divider {
    border-color: $white;
    opacity: 0.15;
    margin: 9.375px 0;
  }

  .option {
    padding-left: 3.75px;
    color: $white;
    font-weight: bold;
    opacity: 0.5;
    cursor: pointer;
  }

  .selected {
    opacity: 1;
  }
</style>
