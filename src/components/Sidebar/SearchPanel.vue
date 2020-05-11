<template>
  <input
    type="text"
    :placeholder="placeholder"
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
  export default class SearchPannel extends mixins(SidebarPanelMixin) {
    @Prop()
    private placeholder!: string;

    private search: string = '';

    get searchValue() {
      return this.search || this.$route.query.search;
    }

    onSearch(event: KeyboardEvent) {
      this.$router.replace({
        name: this.$route.name!,
        query: { ...this.$route.query, search: get(event, 'target.value') },
      });
    }
  }
</script>

<style scoped lang="scss">
  input {
    margin-bottom: 10px;
  }
</style>
