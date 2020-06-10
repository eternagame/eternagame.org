<template>
  <div v-if="isInSidebar">
    <template v-for="({ text, value, link, suffix }, index) in options">
      <SmartLink
        class="option"
        :link="navTarget(link, value)"
        :key="`${value}-${link}`"
        :replace="replace"
        :class="{ selected: routeSelected(index, link) }"
        @click.native="onClick(index, link)"
      >
        {{ $t(text) }} {{ suffix && suffix }}
        <!-- Note: Can't use Utils.isInternal(). #anchors use href, but not external icon. -->
        <img
          v-if="link && !(link.startsWith('/') || link.startsWith('#'))"
          class="ml-2"
          src="@/assets/navbar/ExternalLink.svg"
          :alt="$t('nav-bar:external-link')"
        />
      </SmartLink>
      <hr v-if="index < options.length - 1" class="options-divider" :key="`${value} ${link} divider`" />
    </template>
  </div>
  <b-dropdown variant="link" :text="dropdownText" right v-else>
    <template v-for="({ text, value, link, suffix }, index) in options">
      <b-dropdown-item
        :[nav(link)]="navTarget(link, value)"
        :key="`${value}-${link}`"
        :replace="replace"
        :disabled="routeSelected(index, link)"
        @click.native="onClick(index, link)"
      >
        {{ $t(text) }} {{ suffix && suffix }}
      </b-dropdown-item>
      <b-dropdown-divider v-if="index < options.length - 1" :key="`${value} divider`" />
    </template>
  </b-dropdown>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import Utils from '@/utils/utils';
  import SmartLink from '../Common/SmartLink.vue';

  @Component({
    components: { SmartLink },
  })
  class DropdownSidebarPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly options!: Option[];

    @Prop({ default: 0 }) readonly defaultIndex!: number;

    @Prop({ required: true }) readonly paramName!: string;

    @Prop({ default: false }) readonly replace!: boolean;

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

    nav(link?: string): string {
      // Use vue-router for local links, instead of reloading page.
      return link && !link.startsWith('/') ? 'href' : 'to';
    }

    // If a link is provided, navigate to that; otherwise, update the query params.
    navTarget(link?: string, value?: string) {
      return link || { name: this.$route.name, query: this.generateQuery(value || '') };
    }

    get dropdownText() {
      if (!(this.options[this.selectedIndex] && this.options[this.selectedIndex].text)) {
        return '';
      }
      const selectedOption = this.options[this.selectedIndex];
      return this.$t(selectedOption.text);
    }
  }

  export interface Option {
    value: string;
    text: string;
    link?: string;
    suffix?: string;
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
