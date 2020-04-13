<template>
  <EternaPage title="Code Of Conduct"
    ><div class="page">
      <div style="padding: 10px; text-align: justify;">
        <h3 style="padding-bottom: 16px;">Respect the Eterna Community</h3>
        Eterna players come from different countries, age groups, institutions, schools, companies,
        teaching, online gaming, and scientific communities. As a part of the Eterna community, you
        are invited to discuss research topics, game experiences, competitions status, lab results,
        puzzle strategies, ideas, suggestions, and just to socialize! We trust you to be responsible
        in the community. While playing Eterna, please follow the community guidelines highlighted
        here. While using the Eterna site and chat:<br /><br />
        <ul style="padding-left: 20px;">
          <li>
            Please do not display any violent, nude, racial, unsuitable pictures or posts,
            derogatory language, or links to adult content.
          </li>
          <li>Please do not abuse, harass, or threaten any person.</li>
          <li>Please do not send spams (unwanted messages) or virus links</li>
          <li>
            Please do not behave like a
            <a href="http://en.wikipedia.org/wiki/Troll_(Internet)" target="_blank">troll</a>
          </li>
        </ul>
        <p style="padding-top: 15px;">
          While off topic conversation is frequent in chat, it is generally not tolerated when it
          disrupts legitimate Eterna conversation.
        </p>
        <br /><br />
        <p>
          These rules also apply to Username, About Me, Group Description, Player and Group profile
          pictures. Anyone who fails to follow the guidelines may be suspended or banned from
          Eterna. Remember that Eterna is your community! Each and every player helps Eterna get
          better. To report abuses of the Code of Conduct, please send a private message to our
          <a href="/web/player/48290/" target="_blank">development team</a>, who will keep your
          identity confidential. <br /><br /><br /><br />Thanks for reading and understanding the
          guidelines! <br /><br />The Eterna Team.
        </p>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class CodeOfConduct extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
    padding: 20px;
  }
</style>
