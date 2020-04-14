<template>
  <div>
    <EternaPage
      title="Eterna End User License Agreement (EULA)"
      header_title="TERMS & CONDITIONS"
      header_date="Last updated: Sept 9, 2018"
    >
      <div class="page-content">
        <h3>This is an agreement between you and Eterna.</h3>
        <p>
          Eterna is a place where professional scientists and non-professional scientists come
          together to play puzzles and research RNA. By joining the Eterna community, you’re helping
          to study one of the building blocks of life and to create new RNA-based technologies.
        </p>

        <h3>Designs you create</h3>
        <p>
          To help create better RNA technology, Eterna developers and participants analyze the
          designs you make and how you make them.
        </p>

        <p>
          All designs that you create using Eterna, including experimental results of such designs,
          will be made accessible to all, online, for as long as Eterna exists.
        </p>

        <p>
          Eterna may record the steps you make to solve a puzzle to help the community develop
          better solutions to RNA problems. These records may be made available to you, to community
          members who have solved the puzzle, and to Eterna developers. These records are associated
          with your Eterna account. You may opt-out of these records in your profile.
        </p>

        <h3>Stuff you write</h3>
        <p>
          You may contribute to the Eterna Wiki or create other content while you’re here at Eterna.
          Unless you specify otherwise, copyright protection for this content will be covered by
          Creative Commons license 4.0, which allows others to share and adapt your work so long as
          they give appropriate credit, indicate whether changes were made, and add no further
          restrictions. You have copyright over anything you write. This includes writing or images
          you create in the forums, in comments, or in your profile.
        </p>

        <h3>Programs you make</h3>
        <p>
          If you contribute a script to the EternaScript library, you agree that any software you
          create will be licensed under the BSD 3-Clause license, which ensures that others can use,
          modify, and share your code. You may develop other software related to Eterna not using
          EternaScript. Of course, how you license that software is up to you.
        </p>

        <h3>Other Intellectual Property</h3>
        <p>
          To support itself, Eterna licenses RNA-related software commercially, in part by using
          design strategies and solutions contributed by the community.
        </p>

        <p>
          Licensing profits support the development of Eterna software through an organization
          called Eterna Commons. Eterna Commons is a collaboration between the institutions that
          develop Eterna. It aims to advance RNA science for the public benefit through the Eterna
          platform and to support participants’ scientific endeavors. You can read more about it
          here.
        </p>

        <p>
          Patents and any other intellectual property developed by Eterna will also be managed by
          Eterna Commons.
        </p>

        <p>
          Any use of Eterna content to produce new technology obligates you to respect human rights
          in the maintenance, distribution, and development of such technology.
        </p>

        <h3>Your age</h3>
        <p>
          Due to applicable U.S. laws, Eterna is only for people 13 or older. If you are younger
          than 13, please consider joining NOVA Labs and the many other great science projects
          directed toward people under the age of 13.
        </p>

        <h3>Behavior and Conduct</h3>
        <p>
          Eterna is a game and a science lab, but it is also a community. Be respectful of others.
          Since Eterna is open to people from many different age groups and many different
          backgrounds, the Eterna community does not tolerate profanity or obscenity. The Eterna
          community does not tolerate harassment or bullying. Eterna developers reserve the right to
          end your participation if you violate Eterna’s code of conduct.
        </p>

        <h3>Updates to this agreement</h3>
        <p>
          Eterna is a big project with lots going on. Future developments may require alteration of
          this agreement. If that happens, we will notify you next time you log in.
        </p>
        <hr class="top-border" />
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
          >I accept the terms of this License Agreement.
        </b-form-checkbox>
      </div>
      <template #sidebar="{ isInSidebar }">
        <DropdownSidebarPanel
          :options="options"
          paramName="sort"
          replace
          :isInSidebar="isInSidebar"
        />
      </template>
    </EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class TermsAndConditions extends Vue {
    private options: Option[] = [
      { value: 'about', text: 'About Eterna' },
      { value: 'publications', text: 'Publications' },
      { value: 'software', text: 'Software' },
      { value: 'terms', text: 'Terms & Conditions' },
      { value: 'code_conduct', text: 'Code of Conduct' },
    ];

    get loggedIn() {
      return this.$vxm.user.loggedIn; // TODO change
    }
  }
</script>
<style lang="scss" scoped>
  h3,
  p {
    font-size: 0.56rem;
    font-weight: normal;
    line-height: 1.36;
  }

  h3 {
    font-weight: bold;
  }
  h2 {
    font-size: 10.72rem;
    font-weight: bold;
  }
</style>
