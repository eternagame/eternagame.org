<template>
  <div v-if="isInSidebar">
    <template v-for="({ text, value, link }, index) in options">
      <!-- Use regular a link for external links -->
      <a v-if="link && !link.startsWith('/')" class="option" :key="value" :href="link">
        {{ $t(text) }}
        <img
          class="ml-2"
          src="@/assets/navbar/ExternalLink.svg"
          :alt="$t('nav-bar:external-link')"
        />
      </a>
      <!-- Otherwise, use a router-link -->
      <router-link
        v-else
        :to="navTarget(link, value)"
        :key="value"
        class="option"
        :replace="replace"
        :class="{ selected: routeSelected(index, link) }"
        @click.native="onClick(index, link)"
      >
        {{ $t(text) }}
      </router-link>
      <hr v-if="index < options.length - 1" class="options-divider" :key="`${value} divider`" />
    </template>
  </div>
  <b-dropdown variant="link" right v-else>
    <template v-for="({ text, value, link }, index) in options">
      <b-dropdown-item
        :[nav(link)]="navTarget(link, value)"
        :key="value"
        :replace="replace"
        :disabled="routeSelected(index, link)"
        @click.native="onClick(index, link)"
      >
        {{ $t(text) }}
      </b-dropdown-item>
      <b-dropdown-divider v-if="index < options.length - 1" :key="`${value} divider`" />
    </template>
  </b-dropdown>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {},
  })
  class DropdownSidebarPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true })
    options!: Option[];

    @Prop({ default: 0 })
    defaultIndex!: number;

    @Prop({ required: true })
    paramName!: string;

    @Prop({ default: false })
    replace!: boolean;

    selectedIndex = this.defaultIndex;

    @Watch('$route')
    readFromQuery() {
      const data = this.$route.query[this.paramName];
      if (data && typeof data === 'string') {
        this.selectedIndex = this.options.map(option => option.value).indexOf(data);
      }
    }

    created() {
      this.readFromQuery();
    }

    routeSelected(index: number, link?: string) {
      return this.selectedIndex === index || link === window.location.pathname;
    }

    onClick(index: number, link?: string) {
      this.selectedIndex = index;
    }

    generateQuery(value: string) {
      const query = { ...this.$route.query };
      query[this.paramName] = value;
      return query;
    }

    nav(link: string): string {
      // Use vue-router for local links, instead of reloading page.
      return link && !link.startsWith('/') ? 'href' : 'to';
    }

    // If a link is provided, navigate to that; otherwise, update the query params.
    navTarget(link: string, value: string) {
      return link || { name: this.$route.name, query: this.generateQuery(value) };
    }
  }

  export interface Option {
    value: string;
    text: string;
    link?: string;
  }
  export default DropdownSidebarPanel;
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
