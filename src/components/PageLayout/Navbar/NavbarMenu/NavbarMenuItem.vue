<template>
  <b-nav-item :to="value" v-if="typeof value ==='string'">{{text}}</b-nav-item>
  <b-nav-item-dropdown v-else menu-claskk="shadow-sm" :text="text">
    <template v-for="([linkText, to], index) in dropdownEntries">
      <b-dropdown-item :to="to" :key="linkText">{{linkText}}</b-dropdown-item>
      <b-dropdown-divider v-if="index < dropdownEntries.length - 1"
                          class="divider" :key="`${linkText} divider`"/>
    </template>
  </b-nav-item-dropdown>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class NavbarIcons extends Vue {
    @Prop()
    private text!: string;

    @Prop()
    private value!: string | object;

    // only called if typeof this.value === object
    get dropdownEntries() {
      return Object.entries(this.value as object);
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .dropdown-item {
    font-weight: bold;
    padding: 13px 20px;
  }

  ::v-deep .dropdown-toggle {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  ::v-deep .dropdown-divider {
    margin: 0;
  }

  ::v-deep .dropdown-menu {
    margin-top: 0;
    border-top-left-radius: 0;
    padding: 0;

    li:first-child {
      .dropdown-item {
        border-top-right-radius: 0.25rem !important;
      }
    }
    li:last-child {
      .dropdown-item {
        border-bottom-right-radius: 0.25rem !important;
        border-bottom-left-radius: 0.25rem !important;
      }
    }
  }
</style>
