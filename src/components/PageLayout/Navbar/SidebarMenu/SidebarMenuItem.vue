<template>
  <b-nav-item class="menu-item" :to="value" v-if="typeof value === 'string'">{{ text }}</b-nav-item>
  <div class="menu-item" v-else>
    <b-nav-item @click="contentVisible = !contentVisible" :class="{ active: contentVisible }">
      {{ $t('nav-bar:' + text) }}
      <span class="triangle" :class="{ rotated: !contentVisible }"></span>
    </b-nav-item>
    <b-collapse
      @input="onToggle"
      :accordion="accordion"
      v-model="contentVisible"
      :id="collapseId"
      class="sublist"
    >
      <b-nav-item
        v-for="(to, linkText) in value"
        :[nav(to)]="to"
        :key="linkText"
        :target="isExternal(to) ? '_blank' : '_self'"
      >
        {{ $t('nav-bar:' + linkText) }}
        <img
          v-if="isExternal(to)"
          class="ml-2"
          src="@/assets/navbar/ExternalLink.svg"
          :alt="$t('nav-bar:external-link')"
        />
      </b-nav-item>
      <div class="mb-1"></div>
    </b-collapse>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  @Component({
    components: {},
  })
  export default class SidebarMenuItem extends Vue {
    @Prop({ required: true }) readonly text!: string;

    @Prop({ required: true }) readonly value!: string | object;

    @Prop({ required: true }) readonly accordion!: string;

    @Prop({ required: true }) readonly index!: number;

    contentVisible = false;

    // TODO: Try to dedupe with NavbarMenuItem
    nav(link: string): string {
      // Use vue-router for local links, instead of reloading page.
      return Utils.isLinkInternal(link) ? 'to' : 'href';
    }

    isExternal(link: string): boolean {
      return Utils.isExternal(link);
    }

    get collapseId() {
      return `${this.accordion}-${this.index}`;
    }

    // Only called if the b-collapse exists
    onToggle(visible: boolean) {
      this.contentVisible = visible;
    }
  }
</script>

<style lang="scss" scoped>
  .sublist {
    margin-left: 10px;
    .nav-link {
      padding-top: 6.75px;
      padding-bottom: 6.75px;
      font-size: 11.25px;
    }
  }

  .menu-item {
    margin-bottom: 7.5px;
    white-space: nowrap;
  }

  .triangle {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    transition: transform 0.35s;
  }

  .rotated {
    transform: rotate(-90deg);
  }

  img {
    margin-top: -0.2rem;
    width: 0.9rem;
  }
</style>
