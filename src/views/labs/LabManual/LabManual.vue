<template>
  <EternaPage title="Lab Manual">
    <b-card>
      <h3 id="barcodes">Special requirements for RNA Lab - Barcodes</h3>
        <img
          src="/sites/default/files/chat_screens/10_1358979415.png"
          alt="An Eterna solution, focusing on the barcode region, where a long stack and a hairpin loop are shown with black and white striped rings around each nucleotide"
          style="display: block; margin: auto; padding: 10px;"
        >

      <p>
        In the cloud labs, we use a state-of-the-art experimental pipeline and protocol which would allows to synthesize
        hundreds of sequences at once (potentially tens of thousands in near future).
      </p>
      <p>
        Our experimental protocol creates all the designs at once inside a single test tube! We are then able to infer
        what data go with which design based on the sequence at the last part of the sequence. Each lag puzzle includes
        a seven-base-pair hairpin near the end. Your sequence in the last seven nucleotides of this hairpin act as a
        'barcode' for identifying your design.
      </p>
      <p>
        For that reason, it is important that your barcode hairpin sequence is "unique". Not just among the lab, but
        among all the sequences that will be synthesized together.
      </p>
      <p>
        The barcode region is marked with rounded barcodes as in the screenshot above. If you try to submit a sequence
        with a barcode that exists in other submitted sequences, you will get a warning message and won't be able to
        submit your sequence.
      </p>
    </b-card>
    <b-card class="mt-2">
      <h3>Dictionary</h3>
      <h4>Free energy</h4>
      <p>
        When you are playing the puzzles in Eterna, there is a box in the top left corner which displays the [free]
        energy of the current molecule. What that is a measure of is the potential energy of the molecule. Everything
        (at temperatures above 0 K) has some amount of internal energy. When you look at energy, LOWER ENERGY IS
        (generally) BETTER, meaning larger negative numbers. In the world of protein folding and RNA folding, the
        general theory is that the lowest energy state is the most stable. However, this does not necessarily mean
        that when designing a solution for the RNA lab, you should try to get the lowest possible free energy.
      </p>
      <h4>Melting point</h4>
      <p>
        The melting temperature can be thought of as the temperature at which there would be enough energy to pull
        the structure apart from it folded structure to a linear form. In general, a higher melting temperature
        indicates higher stability in your structure. However there is a caveat which is that the algorithm in
        Eterna that calculates the melting temperature is not very good. It is only accurate to the nearest 10 degrees.
        Therefore, you should be careful in trying to use the information from the melting temperature. Melting
        temperature relates to the free energy in that as free energy goes down, melting temperature goes up,
        as both are measures of stability.
      </p>
      <h4>Pairing probability</h4>
      <p>
        <img src="/sites/default/files/dotplot.png" style="float: left; margin-right: 22px" alt="An example dot plot. The square is split by a diagonal line going from top left to bottom right. In the lower left section (labelled lower half) there are a few dark diagonal lines, and in the top right section (labeled upper half) there area also a few dark diagonal lines as well as a number of grey shapes and lines. On the left side on the top is a 1, and on the bottom is a 123. On the bottom on the left is a 1, and on the right is a 123. A circle just to the top and left of the center of the graph is marked pairing probability of base 53 and 32." />
        RNA folds into the minimum free energy structure (i.e, the most stable shape, or the predicted shape in the game.) However, in nature, it does not constantly stay in the structure, but constantly shifts between other structures as well. The pairing probability plot represents what possibilities of two bases pairing up in one of such transitions. The plot has 2 axis, both horizontal axis and vertical axis representing the RNA sequence. The upper half triangle of the plot shows full set of pairing possibilities. The color at the position (x,y) represents the probability that base x and base y pairs up. The darker the color, the higher the probability. The lower half triangle of the plot only colors pairs that are in the minimum free energy structure. In general, the more the upper half looks like the lower half, it would mean the RNA has more chance of staying in the predicted shape. However, as with the melting point, calculation of paring probabilities is only a simulation and therefore you should be careful in trying to use the information.
      </p>
    </b-card>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage
    }
  })
  export default class Navbar extends Vue {

  }
</script>

<style lang="scss" scoped>
</style>
