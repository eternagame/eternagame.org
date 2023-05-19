<template>
  <div class="custom-input-group">
    <input
      type="text"
      :placeholder="placeholder || $t('search:search')"
      :aria-label="placeholder || $t('search:search')"
      class="local-search"
      :value="searchValue"
      @input="onSearch"
    />
    <span>
      <img src="@/assets/sidebar/search.svg" alt="search" />
    </span>
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
  export default class SearchPanel extends mixins(SidebarPanelMixin) {
    @Prop() readonly placeholder?: string;

    private search: string = '';

    get searchValue() {
      return this.search || this.$route.query.search;
    }

    replaceRoute(event: KeyboardEvent) {
      const {search: oldSearch, skip: oldSkip, ...query} = this.$route.query;
      const search = (event.target as HTMLInputElement).value;
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(search ? {search} : {})
        },
        params: { keepScroll: 'true' }
      });
    }

    created() {
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
  .custom-input-group {
    position: relative;
  }

  .custom-input-group {
    span {
      position: absolute;
      top: 7.375px;
      right: 11.25px;
    }
  }
</style>
