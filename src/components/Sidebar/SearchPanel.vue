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
  import vueDebounce from 'vue-debounce';

  import icon from '@/assets/Filter.svg';

  Vue.use(vueDebounce, {
    listenTo: 'input',
  });

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

    onSearch(event: KeyboardEvent) {
      this.$router.replace({
        name: this.$route.name!,
        // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
        // @ts-ignore
        query: { ...this.$route.query, search: event.target.value },
      });
    }
  }
</script>

<style scoped lang="scss">
  input {
    margin-bottom: 10px;
  }
</style>
