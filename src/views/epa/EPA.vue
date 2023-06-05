<template>
  <EternaPage title="Eterna Players Alliance (EPA)">
    <div class="purpose-container">
      <div class="row">
        <div class="col">
          <h4 class="header">Purpose</h4>
          <ul>
            <li>Ensure the continuing growth and success of Eterna</li>
            <li>
              Promote the recognition and appreciation of both RNA design and
              citizen science
            </li>
            <li>
              Represent player's interests in decisions impacting the future of
              Eterna
            </li>
          </ul>
          <h4 class="header">Membership Requirements</h4>
          <ul>
            <li>Willing to respond & participate in EPA and in labs</li>
          </ul>
          <h4 class="header">EPA Members</h4>
          <ul>
            <li>Are eligible to vote at all meetings of the full membership</li>
            <li>
              Get updates at Eterna Town Hall meetings and via messages from the
              EPA Group
            </li>
            <li>
              Can nominate and vote for members of the EPA Board of Directors
            </li>
            <li>Can serve on and chair EPA committees and teams</li>
          </ul>
          <h4 class="header">Learn More and Help Out</h4>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1NaWWhIvJA1rGio4uIn0joAttiVKa__MiG2flknU3zvA/"
                >Current Board of Directors/Officers, Meeting Schedule, and Video Link</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1CglhMMf61XqSbMijc8NoRdytYmFcHqbp/"
                >EPA Bylaws</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1DBXhraizu62LfAVf2od2Q5NCkZaez3Rq/"
                >EPA Workplan</a
              >
              and
              <a
                target="_blank"
                href="https://docs.google.com/presentation/d/1nngPduJESf74D4DUng0JtIoI_LWHGQfm/"
                >Recent EPA Activities</a
              >
            </li>
          </ul>
        </div>
        <div class="col">
          <div class="row d-flex justify-content-center align-content-center">
            <img
              src="https://eternagame.org/sites/default/files/pictures/picture-10246970.png"
              alt="The Eterna Players Alliance logo, a gold bordered badge containing simplified human-like figures on a hill under a starry sky, with the text Eterna Players Alliance and the Eterna logo"
            />
          </div>
          <br>
          <div class="row d-flex justify-content-center align-content-center">
            <b-button
              type="submit"
              variant="primary"
              class="submit-button"
              :to="`/groups/10246970`"
              size="lg"
            >
              {{ 'Join Now!' }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class EPA extends Vue {}
</script>
<style lang="scss" scoped>
@import '@/styles/global.scss';

.purpose-container {
  position: relative;
  border-radius: 5px;
  padding: 25px;
  margin-bottom: 30px;
}

.header {
  margin-bottom: 1.5rem;
}
</style>
