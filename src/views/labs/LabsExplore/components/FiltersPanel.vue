<template>
  <AsidePanel>
    <template #header>
      <img src="@/assets/Filter.svg"/>
      Filters
    </template>
    <b-checkbox-group v-model="selected" :options="options" stacked/>
  </AsidePanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AsidePanel from '@/components/Aside/AsidePanel.vue';

  @Component({
    components: {
      AsidePanel,
    },
  })
  export default class LabInfoPanel extends Vue {
    @Prop({ required: true })
    private filters!: string[];

    private selected: boolean[] = [];

    get options() {
      return this.filters.map(filter => ({ text: filter, value: filter }));
    }
  }

  class Filter {
    state: boolean = false;

    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }
</script>

<style scoped lang="scss">

</style>
