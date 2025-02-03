<template>
  <div>
    <EternaPage title="Security Hall of Fame">
      <p class="subtitle">
        As part of our responsible disclosure program, we would like to extend our sincere thanks
        to the security researchers who have helped improve the security of our platform.
      </p>

      <section v-for="{year, members, others} in hallOfFame" :key="year">
        <h3>{{ year }}</h3>
        <ul>
          <li v-for="{ name, url } in members" :key="name">
            <a v-if="url" :href="url">{{ name }}</a>
            <template v-else>{{ name }}</template>
          </li>
          <li v-if="others > 0">{{ members.length > 0 ? 'And ' : '' }}{{ others }} other{{ others > 1 ? 's' : '' }}</li>
        </ul>
      </section>

      <template #sidebar="{ isInSidebar }">
        <SidebarPanel :isInSidebar="isInSidebar" header="Program Details" headerIcon="@/assets/info.svg">
          For details about our responsible disclosure policy, please see our
          <a href="https://www.openbugbounty.org/bugbounty/eternagame/">Open Bug Bounty page</a>
        </SidebarPanel>
      </template>
    </EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';

  @Component({
    components: {
      EternaPage,
      SidebarPanel
    },
  })
  export default class SecurityHallOfFame extends Vue {
    hallOfFame = [
      {
        year: 2024,
        members: [
          {name: 'Parth Narula', url: 'https://linkedin.com/in/parth-narula-86283821a'}
        ],
        others: 2,
      },
      {
        year: 2023,
        members: [],
        others: 1,
      },
      {
        year: 2022,
        members: [
          {name: 'haidv35', url: 'https://vn.linkedin.com/in/haidv99'},
          {name: 'Gaurang maheta', url: 'https://linkedin.com/in/gaurang883'},
          {name: 'Nagashree K'}
        ],
        others: 0,
      },
      {
        year: 2021,
        members: [
          {name: 'Chirag Ketan Prajapati - CYBERTIX', url: 'https://linkedin.com/in/imchiragprajapati/'}
        ],
        others: 4,
      }
    ];
  }
</script>
<style lang="scss" scoped>
.subtitle {
  font-size: 1.2rem;
}
</style>
