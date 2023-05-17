<template>
  <div>
    <div>{{ label }}</div>
    <div class="custom-input-group">
      <input
        type="number"
        placeholder="Min"
        :aria-label="`Min ${label}`"
        class="local-search"
        :value="minValue"
        @input="onMinSearch"
      />
      <input
        type="number"
        placeholder="Max"
        :aria-label="`Max ${label}`"
        class="local-search"
        :value="maxValue"
        @input="onMaxSearch"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import debounce from 'lodash.debounce';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  // @ts-ignore

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class RangePanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly minParamName!: string;

    @Prop({ required: true }) readonly maxParamName!: string;

    @Prop({ required: true }) readonly label!: string;

    private min: string = '';

    private max: string = '';

    get minValue() {
      return this.min || this.$route.query[this.minParamName];
    }

    get maxValue() {
      return this.max || this.$route.query[this.maxParamName];
    }

    created() {
      this.onMinSearch = debounce(this.onMinSearch, 200);
      this.onMaxSearch = debounce(this.onMaxSearch, 200);
    }

    onMinSearch(event: KeyboardEvent) {
      const {[this.minParamName]: oldMin, skip: oldSkip, ...query} = this.$route.query;
      const min = (event.target as HTMLInputElement).value;
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(min !== '' ? {[this.minParamName]: min} : {})
        },
      });
    }

    onMaxSearch(event: KeyboardEvent) {
      const {[this.maxParamName]: oldMax, skip: oldSkip, ...query} = this.$route.query;
      const max = (event.target as HTMLInputElement).value;
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(max !== '' ? {[this.maxParamName]: max} : {})
        },
      });
    }
  }
</script>

<style scoped lang="scss">
  .custom-input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    input {
      width: calc(50% - 5px);
    }
  }
</style>
