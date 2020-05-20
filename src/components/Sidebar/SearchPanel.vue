<template>
  <input
    type="text"
    :placeholder="placeholder || $t('search:search')"
    class="local-search"
    :value="searchValue"
    @input="onSearch"
  />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  // @ts-ignore
  import get from 'lodash.get';
  // @ts-ignore
  import debounce from 'lodash.debounce';

  import icon from '@/assets/Filter.svg';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class SearchPanel extends mixins(SidebarPanelMixin) {
    @Prop()
    private placeholder!: string;

    private search: string = '';

    get searchValue() {
      return this.search || this.$route.query.search;
    }

    replaceRoute(event: KeyboardEvent) {
      this.$router.replace({
        name: this.$route.name!,
        query: { ...this.$route.query, search: get(event, 'target.value') },
      });
    }

    craeted() {
      this.replaceRoute = debounce(this.replaceRoute, 200);
    }

    onSearch(event: KeyboardEvent) {
      this.replaceRoute(event);
    }
  }
</script>

<style scoped lang="scss">
  input {
    margin-bottom: 10px;
  }
</style>
