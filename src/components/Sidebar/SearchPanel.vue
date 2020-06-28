<template>
  <div class="custom-input-group">
    <input
      type="text"
      :placeholder="placeholder || $t('search:search')"
      class="local-search"
      :value="searchValue"
      @input="onSearch"
    />
    <span>
      <img src="@/assets/sidebar/search.svg" />
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  // @ts-ignore
  import debounce from 'lodash.debounce';

  import icon from '@/assets/Filter.svg';

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
      this.$router.replace({
        name: this.$route.name!,
        query: { ...this.$route.query, search: (event.target as HTMLInputElement).value },
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
