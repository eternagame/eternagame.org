<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="Tags" headerIcon="@/assets/sidebar/hashtag.svg">
    <template #header-icon>
      <img src="@/assets/sidebar/hashtag.svg" alt="hashtag" />
    </template>
    <ul style="padding: 0; list-style-type:none">
      <li
        class="gray-header" :class="{ 'text-white': tagSelected(tag) }"
        role="button" v-for="tag in tags" :key="tag"
        @click="toggleTag(tag)"
        @keypress.enter="toggleTag(tag)"
        @keypress.space="toggleTag(tag)"
        tabindex="0"
      >
        {{ tag }}
      </li>
    </ul>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class TagsPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly tags!: string[];

    tagSelected(tag: string) {
      return this.$route.query.tags?.includes(tag.replace('#', ''));
    }

    toggleTag(tag: string) {
      const realTag = tag.replace('#', '');
      const {tags: oldTags, skip: oldSkip, ...query} = this.$route.query;

      const tags = Array.isArray(oldTags) ? oldTags.slice() : [];
      const tagIdx = tags.indexOf(realTag);
      if (tagIdx !== -1) tags.splice(tagIdx, 1);
      else tags.push(realTag);

      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(tags.length ? {tags} : {})
        },
      });
    }
  }
</script>

<style scoped lang="scss">
</style>
