<template>
  <b-nav-item :to="value" v-if="typeof value === 'string'">{{ text }}</b-nav-item>
  <b-nav-item-dropdown v-else menu-class="shadow-sm" :text="text">
    <template v-for="([linkText, to], index) in dropdownEntries">
      <b-dropdown-item :[nav(to)]="to" :key="linkText">
        {{ $t('nav-bar:' + linkText) }}
        <img
          class="ml-2"
          v-if="isExternal(to)"
          src="@/assets/navbar/ExternalLink.svg"
          :alt="$t('nav-bar:external-link')"
        />
      </b-dropdown-item>

      <b-dropdown-divider
        v-if="index < dropdownEntries.length - 1"
        class="divider"
        :key="`${linkText} divider`"
      />
    </template>
  </b-nav-item-dropdown>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  @Component({
    components: {},
  })
  export default class NavbarIcons extends Vue {
    @Prop()
    private text!: string;

    @Prop()
    private value!: string | object;

    nav(link: string): string {
      // Use vue-router for local links, instead of reloading page.
      return Utils.isLinkInternal(link) ? 'to' : 'href';
    }

    isExternal(link: string) {
      return !(link.startsWith('/') || link.startsWith('https://eternagame.org/'));
    }

    // only called if typeof this.value === object
    get dropdownEntries() {
      return Object.entries(this.value as object);
    }
  }
</script>

<style lang="scss" scoped>
  img {
    margin-top: -0.2rem;
    width: 0.9rem;
  }
</style>
