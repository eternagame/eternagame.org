<template>
  <EternaPage
    v-if="news"
    title="OpenVaccine Round 3 Launch, Eterna Town Hall, Lightning Round + Round 2 Update"
    :header_date="news.news.created"
    :header_title="announcements.toUpperCase()"
  >
    <div class="page-content">
      <h2>
        Wow, the response to Round 2 exceeded expectations—fantastic job everyone! We are truly
        blown away.
      </h2>

      <p>This is going to be a big update, so hang tight.</p>

      <p>
        First, we are launching the next round in our fight against the coronavirus pandemic: In
        Round 3, we are launching three new puzzles:
      </p>
      <ul>
        <li>• Nanoluciferase: the model protein</li>
        <li>• Designed antigen: the receptor binding domain of the spike protein*</li>
        <li>• Full spike protein: the first vaccine candidate**</li>
      </ul>

      <p>
        *Special thanks to Prof. Possu Huang and Andres Sperberg in Stanford’s Department of
        Bioengineering for sharing with Eterna this sequence. This is part of their ongoing efforts
        to computationally stabilize SARS-CoV-2 proteins to improve COVID-19 vaccine efficacy.
      </p>

      <p>
        **A version of the full spike protein is the first candidate mRNA vaccine to advance to
        human trials from Moderna, an mRNA therapeutics company, in collaboration with the NIH. We
        will be coding for a variation of the spike protein that has been known to form the proper
        shape for host cell infection.
      </p>

      <p>
        We have chosen to grow the mRNA molecules drastically in biological significance and
        complexity. This means the puzzles may be a tad bit more challenging, but it also means one
        or more submissions may be that key molecule that unlocks the mRNA vaccine against the
        coronavirus. If we as a community can come together and achieve this milestone, we will
        change the face of medicine forever. Not only will we significantly impact the coronavirus
        pandemic, but we will forever redefine how medicines are designed and made.
      </p>

      <p>
        Please note that the nanoluciferase and designed antigens will be high-throughput
        experiments (similar to Round 2), and thus we are accepting many submissions. For the full
        spike protein, we are accepting a total of 100 submissions, and will, by vote, synthesis a
        select number of winning designs. So make those designs count!
      </p>

      <p>
        Second, the Eterna OpenVaccine Team will be hosting a regular community chat, called the
        Eterna Town Hall: These meetings will start next Monday (4/13/2020), time TBD. I (Do Soon)
        will be present along with other members of the Eterna Developer and OpenVaccine teams. We
        are looking to answer any questions players might have, share our vision for the project,
        and seek feedback for our mRNA design efforts. We will field questions via Twitter
        (@eternagame), the Eterna Chat client, and Zoom’s chat function as well as any during the
        video call. Expect another update this coming late this week/this weekend with details!
      </p>

      <p>
        Third, updates on the previous two rounds. Like mentioned before—we are blown away. Here is
        where we are on the previous rounds:
      </p>

      <p>
        Lightning Round: DNA encoding the winning designs (by votes) are en route (some have already
        arrived, other arriving later this week) to the laboratory, and experiments will start very
        soon. Results to follow soon after.
      </p>

      <p>
        Round 2: We received an overwhelming number of submissions, and even tried to figure out a
        way to cut down the total number of designs for synthesis (thank you to the players who came
        to the rescue last-minute to filter their own designs!), but after some adjustments on the
        experiment-side, we were able to order ALL submissions for testing! This is quite a large
        order (1200 total sequences in the order), and we are piloting a new synthesis technology to
        meet this demand. We’ll keep you posted throughout the experimental process.
      </p>

      <p>
        Phew, that’s it. Hope everyone is staying safe, and see you next Monday at the Eterna Town
        Hall!
      </p>

      <p>-Do Soon & and Eterna OpenVaccine Team</p>
    </div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <!--      <LabInfoPanel :lab="lab" :isInSidebar="isInSidebar" />-->
      <CalendarPanel :isInSidebar="isInSidebar" />
      <TagsPanel :tags="['#Ribosome', '#Eternacon', '#Chat']" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import NewsData from './types';
  import LabInfoPanel from '../../labs/LabView/components/LabInfoPanel.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=news&nid=${route.params.id}&script=-1`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as NewsData;
    return res;
  }

  @Component({
    components: {
      CalendarPanel,
      LabInfoPanel,
      SidebarPanel,
      EternaPage,
      TagsPanel,
      DropdownSidebarPanel,
    },
  })
  export default class NewsView extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return this.pageData;
    }

    private options: Option[] = [
      { value: 'categories', text: 'All Categories' },
      { value: 'announcements', text: 'Announcements' },
      { value: 'blog', text: 'Blog' },
      { value: 'labs', text: 'Labs' },
    ];
  }
</script>
