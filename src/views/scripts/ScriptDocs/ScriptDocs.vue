<template>
  <EternaPage title="EternaScript Documentation">
    <b-btn variant="secondary" to="/scripts">View All Scripts</b-btn>

    <b-card class="mt-4">
      <h3 id="general">General Resources</h3>
      <ul>
        <li><a href="https://docs.google.com/document/d/1VC94wTuRhNd-FN60ueaBc5mUxBsiIy8UzJzQL6ap3CE/edit">Eterna Script Intro  (by Eli Fisker)</a></li>
        <li><a href="https://bluejeans.com/s/9oU_K/">Eterna Boosters  (special live chat)</a></li>
      </ul>
    </b-card>

    <b-card class="mt-4">
      <h3 id="general">Utility APIs</h3>
      <h4>Pervasives</h4>
      <ul>
        <li>
          <code>out(text)</code>
          <p>display text in result textarea</p>
        </li>
        <li>
          <code>outln(text)</code>
          <p>display text in result textarea with newline</p>
        </li>
        <li>
          <code>clear()</code>
          <p>clear result textarea</p>
        </li>
      </ul>

      <h4>Library functions</h4>
      <ul>
        <li>
          <code>Lib.bases</code>
          <p>"AGCU"</p>
        </li>
        <li>
          <code>Lib.fold(sequence)</code>
          <p>return folded structure with sequence</p>
          <p>ex) Lib.fold("GGGGCCCC") = "((....))";</p>
        </li>
        <li>
          <code>Lib.energyOfStruct(sequence, structure)</code>
          <p>return energy of structure</p>
        </li>
        <li>
          <code>Lib.EternaScript(script id)</code>
          <p>return other user's script</p>
          <p>ex) var func = Lib.EternaScript(script_id);</p>
          <p>ex) func(parameters);</p>
        </li>
        <li>
          <code>Lib.getStructure(puzzle_id)</code>
          <p>return structure of puzzle</p>
          <p>ex) Lib.getStructure(1001759)</p>
        </li>
        <li>
          <code>Lib.replace(sequence, index, target)</code>
          <p>return sequence which character at index in sequence replaced to target</p>
          <p>ex) Lib.replace("AGCU", 2, "A") = "AGAU";</p>
        </li>
        <li>
          <code>Lib.nextSequence(sequence)</code>
          <p>return next sequence of sequence in the order of default bases</p>
          <p>ex) Lib.nextSequence("AAAA") = "GAAA";</p>
        </li>
        <li>
          <code>Lib.nextSequenceWithBases(sequence, bases)</code>
          <p>return next sequence of sequence in the order of bases</p>
          <p>ex) Lib.nextSequenceWithBases("UUUU", "UCGA") = "CUUU";</p>
          <p>ex) Lib.nextSequenceWithBases("AUAA", "UCGA") = "UCAA";</p>
        </li>
        <li>
          <code>Lib.random(from, to)</code>
          <p>return random number between from and to</p>
        </li>
        <li>
          <code>Lib.randomSequence(size)</code>
          <p>return random sequence with length of size</p>
        </li>
        <li>
          <code>Lib.map(function, sequence)</code>
          <p>applies function to each sequence bases</p>
        </li>
        <li>
          <code>Lib.filter(function, sequence)</code>
          <p>return sequences only satisfy the function</p>
        </li>
        <li>
          <code>Lib.splitDefault(structure)</code>
          <p>split structure into a structure array</p>
          <p>ex) Lib.splitDefault("((..))") = ["((", "..", "))"];</p>
        </li>
        <li>
          <code>Lib.join(array)</code>
          <p>join array with each element to sequence</p>
          <p>ex) Lib.join(Lib.split("((..))")) = "((..))";</p>
        </li>
        <li>
          <code>Lib.distance(source structure, destination structure)</code>
          <p>return differences between source structure and destination structure</p>
          <p>if same then 0 else +1</p>
          <p>if different length then just return -1</p>
          <p>ex) Lib.distance("((..))", "((()))") = 2</p>
          <p>ex) Lib.distance("(((())))", "(())") = -1</p>
        </li>
        <li>
          <code>Lib.distanceCustom(function, source structure, destination structure)</code>
          <p>return differences between source structure and destination structure with custom rule</p>
          <p>ex) Lib.distanceCustom(function(index){ ... }, source, dest);</p>
        </li>
      </ul>

      <h4>Class RNA</h4>
      <ul>
        <li>
          <code>getPairmap(structure)</code>
          <p>return the array of pair information</p>
          <p>ex) getPairmap("((..))") = [5,4, , ,2,1]</p>
        </li>
        <li>
          <code>getStructure</code>
          <p>return structure</p>
        </li>
        <li>
          <code>getRootElement</code>
          <p>return root RNAElement class of rna object</p>
        </li>
        <li>
          <code>map</code>
          <p>applies function to all RNAElement</p>
        </li>
      </ul>

      <h4>Class RNAElement</h4>
      <ul>
        <li>
          <code>getParent()</code>
          <p>return the parent RNAElement class</p>
        </li>
        <li>
          <code>getChilds()</code>
          <p>return the child RNAElement class array</p>
        </li>
        <li>
          <code>getElements()</code>
          <p>return the array of structure and index JSON objects</p>
        </li>
        <li>
          <code>isPaired()</code>
          <p>return boolean whether the stack element is paired or not</p>
        </li>
        <li>
          <code>getBaseType()</code>
          <p>return RNAElement.Stack or RNAElement.Loop if the element is stack or loop</p>
        </li>
        <li>
          <code>getType()</code>
          <p>return RNAElement.Hairpin, RNAElement.Bulge, RNAElement.Internal, RNAElement.Multiloop or RNAElement.Dangling if the element is hairpin, bulge, internal, multiloop or dangling</p>
        </li>
        <li>
          <code>getIndices()</code>
          <p>return the array of indices</p>
        </li>
        <li>
          <code>isStack()</code>/<code>isLoop()</code>/<code>isHairpin()</code>/<code>isBulge()</code>/<code>isInternal()</code>/<code>isMultiloop()</code>/<code>isDangling()</code>
          <p>return boolean whether the element is stack, loop, hairpin, bulge, internal, multiloop or dangling</p>
        </li>
        <li>
          <code>getSegmentCount()</code>
          <p>return how many structure segments included</p>
          <p>if the multiloop consists of 2 branches then getSegmentCount() of multiloop returns 2</p>
        </li>
      </ul>
    </b-card>

    <b-card class="mt-4">
      <h3 id="boosters">Booster APIs</h3>

      <h4>General structure</h4>
      <h5>Accessing the applet </h5>
      <pre>var applet = document.getElementById('maingame');<br/>if (applet == null) return "maingame element missing";</pre>
      <p>from there, APIs can be used like this:</p>
      <pre>var ok = applet.set_sequence_string(my_seq);</pre>
      <h5>Exploring the API without writing a booster  </h5>
      <p>Every modern browser has some sort of console that lets users input javascript commands.</p>
      <ul>
        <li>Open the puzzle</li>
        <li>Use the stamper option in the booster menu, but cancel the operation. This activates the scripting interface</li>
        <li>Open the javascript console of your browser, and play around</li>
      </ul>
      <h5>Synchronous vs Asynchronous</h5>
      <p>The <a href="https://eternagame.org/scripts/7070114">Tsumego</a> script is an example of a synchronous booster. Synchronous boosters have following properties:</p>
      <ul>
        <li>they do not use setTimeout() or setInterval()</li>
        <li>they return a simple value</li>
      </ul>
      <p>The <a href="https://eternagame.org/scripts/6713763">Naive Solver</a> script is an example of an asynchronous booster. The features that make it asynchronous are:</p>
      <ul>
        <li>it uses setTimeout()</li>
        <li>
          the script signals asynchronicity to the applet by using the statement:
          <pre>return {async: "true"};</pre>
        </li>
        <li>
          the actual end of the execution is signalled by calling:
          <pre>applet['end_'+sid](r);</pre>
          where sid is the ID of the script (here,  6713763)
        </li>
        <li>
          EternaScripts have timeout-checking statements automatically inserted in loops. A special statement is used
          in lengthy computations to prevent this global timeout (10 seconds by default) from unwanted triggering:
          <pre>global_timer = new Date();</pre>
        </li>
      </ul>

      <h4>Getters</h4>
      <ul>
        <li>
          <code>get_sequence_string()</code>
          <p>Parameters: none</p>
          <p>Returns: a string representing the sequence</p>
        </li>
        <li>
          <code>get_full_sequence(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to be queried</li>
          </ul>
          <p>Returns: a string representing the full-length sequence, including the oligos in the case of a multistrand puzzle</p>
        </li>
        <li>
          <code>get_locks()</code>
          <p>Parameters: none</p>
          <p>Returns: a 0-based array of booleans indicating locked (true) and mutable (false) positions in the puzzle</p>
        </li>
        <li>
          <code>get_targets()</code>
          <p>Parameters: none</p>
          <p>Returns: an array of objects describing the structural constraints of each state in the puzzle</p>
        </li>
        <li>
          <code>get_target_structure(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to be queried</li>
          </ul>
          <p>Returns: the dot-bracket representation of the target structure for the given state (which include modifications made by magic glue, if applicable)</p>
        </li>
        <li>
          <code>get_native_structure(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to be queried</li>
          </ul>
          <p>Returns: the dot-bracket representation of the predicted MFE for the queried state in the puzzle (i.e. the native fold)</p>
        </li>
        <li>
          <code>get_full_structure(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to be queried</li>
          </ul>
          <p>Returns: the complete dot-bracket representation of the predicted MFE, including oligos, for the queried state in the puzzle (i.e. the native fold)</p>
        </li>
        <li>
          <code>get_free_energy(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to be queried</li>
          </ul>
          <p>Returns: the free energy of the queried state</p>
        </li>
        <li>
          <code>get_tracked_indices()</code>
          <p>Parameters: none</p>
          <p>Returns: an array listing the indices of the bases that have been marked with the black mark</p>
        </li>
        <li>
          <code>get_barcode_indices()</code>
          <p>Parameters: none</p>
          <p>Returns: an array listing the indices of the bases forming the barcode, if present in the lab puzzle</p>
        </li>
        <li>
          <code>is_barcode_available()</code>
          <p>Parameters: none</p>
          <p>Returns: a boolean describing whether the barcode in the puzzle is still available for the current round or not</p>
        </li>
        <li>
          <code>current_folder()</code>
          <p>Parameters: none</p>
          <p>Returns: the name of the currently selected folding engine (only available in labs)</p>
        </li>
        <li>
          <code>get_puzzle_id()</code>
          <p>Parameters: none</p>
          <p>Returns: a number, the currently loaded puzzle ID</p>
        </li>
        <li>
          <code>get_solution_id()</code>
          <p>Parameters: none</p>
          <p>Returns: a number, the currently loaded solution ID, or undefined if no existing solution loaded</p>
        </li>
        <li>
          <code>get_custom_numbering_to_index()</code>
          <p>Parameters: none</p>
          <p>Returns: for puzzles that have custom base numbering, an array mapping the custom base number to the original base index</p>
        </li>
        <li>
          <code>get_index_to_custom_numbering()</code>
          <p>Parameters: none</p>
          <p>Returns: for puzzles that have custom base numbering, an array mapping the original base index to the custom base number</p>
        </li>
        <li>
          <code>check_constraints()</code>
          <p>Parameters: none</p>
          <p>Returns: boolean indicating whether or not all constraints have been satisfied</p>
        </li>
        <li>
          <code>constraint_satisfied(index)</code>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: the index of the constraint to check</li>
          </ul>
          <p>Returns: boolean indicating whether or not the constraint at the given index have been satisfied</p>
        </li>
      </ul>

      <h4>Setters</h4>
      <ul>
        <li>
          <code>select_folder(folder_name)</code>
          <p>selects a folding engine by its name. only available in lab puzzles.</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>folder_name: name of the folding engine to be used</li>
          </ul>
          <p>Returns: a boolean, <code>true</code> if successful, <code>false</code> otherwise (the operation may fail, for instance Vienna2 cannot be selected on a puzzle that contains multistrand states)</p>
        </li>
        <li>
          <code>set_sequence_string(seq)</code>
          <p>sets the sequence in the puzzle. the applet recomputes foldings, free energies and reevaluates contraints.</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: the sequence</li>
          </ul>
          <p>Returns: a boolean, a boolean, <code>true</code> if successful, <code>false</code> otherwise (the operation may fail, if seqcontains invalid characters for instance)</p>
        </li>
        <li>
          <code>set_tracked_indices(marks, options = null)</code>
          <p>sets base rings/black marks in the puzzle</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>
              marks: an array where entries are either indices of bases to be marked (to mark with the default black ring)
              or objects containing a <code>baseIndex</code> and optional <code>color</code> property
              (color should be a numeric RGB color value, eg 0x000000 for black, 0xFFFFFF for white, 0xFF0000 for red, etc)
            </li>
            <li>
              options: an object containing an optional <code>layerName</code> property which can be used to place marks
              on a separate, named, user-selectable layer (by default, they will be placed on the "Script" layer). Note
              that all current base rings on the selected layer are replaced
            </li>
          </ul>
          <p>Returns: nothing</p>
        </li>
        <li>
          <code>set_target_structure(index, structure, startAt = 0)</code>
          <p>
            sets the current target structure, if allowed (ie, in situations where magic glue can be used).
            operates identically to the paste target structure dialog
          </p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>index: 0-based index of the state to set the target structure for</li>
            <li>structure: dot-bracket representation of the desired target structure</li>
            <li>startAt: the index of the first base to start changing the target structure at</li>
          </ul>
          <p>Returns: nothing</p>
        </li>
      </ul>

      <h4>Folding</h4>
      <ul>
        <li>
          <code>fold(seq, constraint = null)</code>
          <p>folds a sequence, eventually considering limitations defined in constraint</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>constraint: optional constraints (Vienna formatted, if applicable for the currently selected engine)</li>
          </ul>
          <p>Returns: the dot-bracket representation of the MFE structure</p>
        </li>
        <li>
          <code>energy_of_structure(seq, secstruct)</code>
          <p>for engines that support it, computes the free energy of a sequence folded as specified by secstruct</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: the sequence</li>
            <li>secstruct: the dot-bracket representation of the secondary structure</li>
          </ul>
          <p>Returns: a floating-point number, expressed in kcal/mol</p>
        </li>
        <li>
          <code>fold_with_binding_site(seq, site, bonus)</code>
          <p>for engines that support it, folds a sequence with a bonus at a particular location for a ligand</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>site: array of base indices describing the binding site of the ligand</li>
            <li>bonus: energy bonus of the ligand</li>
          </ul>
          <p>Returns: the dot-bracket representation of the MFE structure</p>
        </li>
        <li>
          <code>cofold(seq, oligo, malus = 0.0, constraint = null)</code>
          <p>for engines that support it, folds a sequence with a secondary RNA strand</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>oligo: a string representing the sequence of the secondary RNA strand</li>
            <li>malus: factor representing the concentration of the secondary RNA strand</li>
            <li>constraint: optional constraints (Vienna formatted, if applicable for the currently selected engine)</li>
          </ul>
          <p>Returns: the dot-bracket representation of the MFE structure</p>
        </li>
        <li>
          <code>pairing_probabilities(seq, secstruct = null)</code>
          <p>for engines that support it, computes the pairing probabilities/dot plot for a sequence</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to get the pairing probabilities for</li>
            <li>secstruct: a dot-bracket string representing the target structure ("lower left" of the dot plot)</li>
          </ul>
          <p>Returns: the pairing probabilities as a sparse coordinate matrix (an array of the form [i1, j1, val1, i2, j2, val2, ...], omitting matrix entries where the value is zero)</p>
        </li>
        <li>
          <code>subopt_single_sequence(seq, kcalDelta, pseudoknotted = false, temp = 37)</code>
          <p>for engines that support it, folds a sequence and retrieves information about possible suboptimal structures</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>kcalDelta: a number, in kcals per mol, specifying how far from the MFE suboptimal structures should be included</li>
            <li>pseudoknotted: a boolean indicating whether or not pseudoknots should be considered (if supported by the selected engine)</li>
            <li>temp: folding temperature (if supported by the selected engine)</li>
          </ul>
          <p>
            Returns: an object with the properties suboptStructures (an array of dot-bracket strings of suboptimal structures),
            suboptEnergyError (an array of numbers corresponding to the suboptimal structures indicating their energy error),
            and suboptFreeEnergy (an array of numbers corresponding to the suboptimal structures indicating their free energy)
          </p>
        </li>
        <li>
          <code>subopt_oligos(seq, oligos, kcalDelta, pseudoknotted = false, temp = 37)</code>
          <p>for engines that support it, folds a sequence along with some secondary RNA strands and retrieves information about possible suboptimal structures</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>oligos: an array of strings representing the secondary oligo sequences</li>
            <li>kcalDelta: a number, in kcals per mol, specifying how far from the MFE suboptimal structures should be included</li>
            <li>pseudoknotted: a boolean indicating whether or not pseudoknots should be considered (if supported by the selected engine)</li>
            <li>temp: folding temperature (if supported by the selected engine)</li>
          </ul>
          <p>
            Returns: an object with the properties suboptStructures (an array of dot-bracket strings of suboptimal structures),
            suboptEnergyError (an array of numbers corresponding to the suboptimal structures indicating their energy error),
            and suboptFreeEnergy (an array of numbers corresponding to the suboptimal structures indicating their free energy)
          </p>
        </li>
        <li>
          <code>get_defect(seq, secstruct, pseudoknotted = false, temp = 37)</code>
          <p>for engines that support it, calculates the ensemble defect of the given sequence and structure</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>seq: a string representing the sequence to be folded</li>
            <li>secstruct: the dot-bracket target structure</li>
            <li>pseudoknotted: a boolean indicating whether or not pseudoknots should be considered (if supported by the selected engine)</li>
            <li>temp: folding temperature (if supported by the selected engine)</li>
          </ul>
          <p>
            Returns: an object with the properties suboptStructures (an array of dot-bracket strings of suboptimal structures),
            suboptEnergyError (an array of numbers corresponding to the suboptimal structures indicating their energy error),
            and suboptFreeEnergy (an array of numbers corresponding to the suboptimal structures indicating their free energy)
          </p>
        </li>
      </ul>

      <h4>Miscellaneous</h4>
      <ul>
        <li>
          <code>sparks_effect(from, to)</code>
          <p>initiates a sparking effect on the specified segment</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>from: start index</li>
            <li>to: end index</li>
          </ul>
          <p>Returns: nothing</p>
        </li>
        <li>
          <code>submit_solution(details = 'prompt', options = null)</code>
          <p>in experimental puzzles, submits the currently loaded solution.</p>
          <p class="mb-0">Parameters:</p>
          <ul>
            <li>
              details: either be 'prompt' (the default) to show the submission dialog to ask for a title and description,
              or you can pass an object with the properties <code>title</code> and <code>description</code> (if either
              title or description are not specified, the default will be used like if you left the fields blank in the dialog)
            </li>
            <li>
              options: an object with the following properties:
              <ul>
                <li>
                  <code>validate</code>: a boolean, controls whether optional validation is performed - that is, the validation where a player
                  can normally choose to bypass in a dialog, ie whether non-required constraints are satisfied and
                  validating that all pairs are valid in the context of a custom structure. By default, validation is enabled
                </li>
                <li>
                  <code>notifyOnError</code>: a boolean, controls whether errors in the submission process are shown
                  to the user. If true (the default), the user will be shown the normal dialogs that allow for either
                  continuing or canceling submission for optional validation (if enabled) as well as being shown
                  notification dialogs in the situation of other errors (eg, the backend returns an error because
                  the barcode is unique or the user hasn't unlocked the lab, or other required validation fails)
                </li>
              </ul>
            </li>
          </ul>
          <p>
            Returns: Because this function runs asynchronously (both due to the network request being
            asynchronous and the potential for users to be prompted), this function returns a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises">Promise</a>
            <ul>
              <li>The promise will reject if required validation fails or some other unhandled error is encountered</li>
              <li>
                The promise will resolve to <code>false</code> if optional validation failed (with validate set to true)
                and either notifyOnError is false or the user opted to cancel submission in the dialog
              </li>
              <li>The promise will resolve to <code>true</code> if the solution was submitted successfully.</li>
            </ul>
          </p>
        </li>
      </ul>
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
  pre {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 10px;
  }
</style>
