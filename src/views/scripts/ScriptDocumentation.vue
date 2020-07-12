<template>
  <EternaPage title="Script Documentation">
    <div class="page">
      <a href="https://docs.google.com/document/d/1VC94wTuRhNd-FN60ueaBc5mUxBsiIy8UzJzQL6ap3CE/edit#">General Scripting Introduction by Eli Fisker</a><br>
      <a href="https://bluejeans.com/playback/s/pdm4Opyt0KLwxVaTkncmMv2nncZjmECWejnBNxVdgQHhqJ4J2cMM21dVExCO1R9Z">Recording of live chat about boosters</a>
      <pre></pre>
      <h5>Table of Contents</h5>
      <ul>
        <li>
          <a href='#functions-and-classes'>Functions and Classes</a>
          <ul>
            <li>
              <a href='#pervasives'>Pervasives</a>
              <ul>
                <li><a href='#out'>out(text)</a></li>
                <li><a href='#outln'>outln(text)</a></li>
                <li><a href='#clear'>clear()</a></li>
              </ul>
            </li>
            <li>
              <a href='#lib-funcs'>Library Functions</a>
              <ul>
                <li><a href='#bases'>Lib.bases()</a></li>
                <li><a href='#lib-fold'>Lib.fold(sequence, engine = 'Vienna')</a></li>
                <li><a href='#energy-struct'>Lib.energy_of_structure(sequence, structure, engine = 'Vienna')</a></li>
                <li><a href='#eterna-script'>Lib.EternaScript(id)</a></li>
                <li><a href='#get-struct'>Lib.getStructure(id)</a></li>
                <li><a href='#replace'>Lib.replace(sequence, index, target)</a></li>
                <li><a href='#next-seq'>Lib.nextSequence(sequence)</a></li>
                <li><a href='#next-seq-bases'>Lib.nextSequenceWithBases(sequence, bases)</a></li>
                <li><a href='#random'>Lib.random(from, to)</a></li>
                <li><a href='#random-seq'>Lib.randomSequence(size)</a></li>
                <li><a href='#lib-map'>Lib.map(function, sequence)</a></li>
                <li><a href='#filter'>Lib.filter(function, sequence)</a></li>
                <li><a href='#split'>Lib.splitDefault(structure)</a></li>
                <li><a href='#join'>Lib.join(array)</a></li>
                <li><a href='#dist'>Lib.distance(source structure, destination structure)</a></li>
                <li><a href='#dist-custom'>Lib.distanceCustom(function, source structure, destination structure)</a></li>
              </ul>
            </li>
            <li>
              <a href='#class-rna'>RNA Class</a>
              <ul>
                <li><a href='#pairmap'>RNA.getPairmap(structure)</a></li>
                <li><a href='#rna-get-struct'>RNA.getStructure()</a></li>
                <li><a href='#root-el'>RNA.getRootElement()</a></li>
                <li><a href='#rna-map'>RNA.map(function)</a></li>
              </ul>
            </li>
            <li>
              <a href='#class-rna-el'>RNAElement Class</a>
              <ul>
                <li><a href='#get-parent'>getParent()</a></li>
                <li><a href='#get-childs'>getChilds()</a></li>
                <li><a href='#get-els'>getElements()</a></li>
                <li><a href='#paired'>isPaired()</a></li>
                <li><a href='#base-type'>getBaseType()</a></li>
                <li><a href='#get-type'>getType()</a></li>
                <li><a href='#get-indices'>getIndices()</a></li>
                <li><a href='#is-type'>isStack()/isLoop()/isHairpin()/isBulge()/isInternal()/isMultiloop()/isDangling()</a></li>
                <li><a href='#segment-count'>getSegmentCount()</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href='#booster'>Booster API</a>
          <ul>
            <li><a href='#access-applet'>Accessing the applet</a></li>
            <li><a href='#no-booster-access'>Exploring the API without writing a booster</a></li>
            <li><a href='#sync-async'>Synchronous and Asynchronous</a></li>
            <li>
              <a href='#getters'>Getters</a>
              <ul>
                <li><a href='#get-seq'>get_sequence_string()</a></li>
                <li><a href='#get-seq-full'>get_full_sequence(index)</a></li>
                <li><a href='#get-locks'>get_locks()</a></li>
                <li><a href='#get-targs'>get_targets()</a></li>
                <li><a href='#get-native-struct'>get_native_structure(index)</a></li>
                <li><a href='#get-full-struct'>get_full_structure(index)</a></li>
                <li><a href='#get-energy'>get_free_energy(index)</a></li>
                <li><a href='#get-marks'>get_tracked_indices()</a></li>
                <li><a href='#get-barcode'>get_barcode_indices()</a></li>
                <li><a href='#barcode-available'>is_barcode_available()</a></li>
                <li><a href='#current-folder'>current_folder()</a></li>
              </ul>
            </li>
            <li>
              <a href='#setters'>Setters</a>
              <ul>
                <li><a href='#set-folder'>set_folder(folder_name)</a></li>
                <li><a href='#set-marks'>set_tracked_indices(indices)</a></li>
                <li><a href='#set-seq'>set_sequence_string(sequence)</a></li>
                <li><a href='#set-title'>set_design_title(name)</a></li>
              </ul>
            </li>
            <li>
              <a href='#folding'>Folding</a>
              <ul>
                <li><a href='#app-fold'>fold(sequence, engine = 'Vienna')</a></li>
                <li><a href='#app-energy-of-struct'>energy_of_structure(sequence, structure, engine = 'Vienna')</a></li>
              </ul>
            </li>
            <li>
              <a href='#misc'>Miscellaneous</a>
              <ul>
                <li><a href='#sparks'>sparks_effect(from, to)</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <section id="functions-and-classes">
        <h4>Functions and Classes</h4>
        <h5 id="pervasives">Pervasives</h5>
        <section id="out">
          <h6>out(text)</h6>
          Parameters:
          <ul>
            <li>
              text - Text to be printed to the console
            </li>
          </ul>
          <p>Prints text to the console</p>
        </section>
        <section id="outln">
          <h6>outln(text)</h6>
          Parameters:
          <ul>
            <li>
              text - Text to be printed to the console
            </li>
          </ul>
          <p>Prints text to the console on a new line</p>
        </section>
        <section id="clear"> 
          <h6>clear()</h6>
          <p>
          No parameters. <br>
          Clears the console
          </p>
        </section>
        <h5 id="lib-funcs">Library Functions</h5>
        <section id="bases">
          <h6>Lib.bases()</h6>
          <p>
            No parameters
            Returns the RNA nucleotide letters: 'AGCU'
          </p>
        </section>
        <section id="lib-fold">
          <h6>Lib.fold(sequence, engine = 'Vienna')</h6>
          Parameters:
          <ul>
            <li>
              sequence - The sequence to fold
            </li>
            <li>
              engine - The engine to fold the sequence in. Default is Vienna
            </li>
          </ul>
          <p>Folds and RNA sequence and returns the structure in dot-bracket notation.</p>
        </section>
        <section id="energy-struct">
          <h6>Lib.energy_of_structure(sequence, structure, engine = 'Vienna')</h6>
          Parameters:
          <ul>
            <li>
              sequence - The sequence to calculate the energy of
            </li>
            <li>
              structure - The structure to calculate the energy of
            </li>
            <li>
              engine - The engine to calculate energy in. Default is Vienna.
            </li>
          </ul>
          <p>Returns the energy of the specified sequence in the specified structure expressed in kilocalories per mole.</p>
        </section>
        <section id="eterna-script">
          <h6>Lib.EternaScript(id)</h6>
          Parameters:
          <ul>
            <li>
              id - The id of the script to return
            </li>
          </ul>
          <p>Returns the result of another user's script</p>
        </section>
        <section id="get-struct">
          <h6>Lib.getStructure(id)</h6>
          Parameters:
          <ul>
            <li>
              id - The id of the puzzle to return the structure of
            </li>
          </ul>
          <p>Returns the structure of a puzzle</p>
        </section>
        <section id="replace">
          <h6>Lib.replace(sequence, index, target)</h6>
          Parameters:
          <ul>
            <li>
              sequence - A string containing the index to be replaced
            </li>
            <li>
              index - The index of the string (zero-based) to replace
            </li>
            <li>
              target - The new character at the given index of the string
            </li>
          </ul>
          <p>Returns the string with the character at the specified index replaced</p>
        </section>
        <section id="next-seq">
          <h6>Lib.nextSequence(sequence)</h6>
          Parameters:
          <ul>
            <li>
              sequence - The input sequence to start with
            </li>
          </ul>
          <p>Returns the next sequence after the input, in the default base order (AGCU)</p>
        </section>
        <section id="next-seq-bases">
          <h6>Lib.nextSequenceWithBases(sequence, bases)</h6>
          Parameters:
          <ul>
            <li>
              sequence - The input sequence to start with
              bases - The bases to use.
            </li>
          </ul>
          <p>Returns the next sequence after the input, in the given base order.</p>
        </section>
        <section id="random">
          <h6>Lib.random(from, to)</h6>
          <p>Returns a random number between from to</p>
        </section>
        <section id="random-seq">
          <h6>Lib.randomSequence(size)</h6>
          <p>Returns a random sequence with length of size</p>
        </section>
        <section id="lib-map">
          <h6>Lib.map(function, sequence)</h6>
          <p>Applies function to each base in the sequence</p>
        </section>
        <section id="filter">
          <h6>Lib.filter(function, sequence)</h6>
          <p>Returns only sequences that satisfy the function</p>
        </section>
        <section id="split">
          <h6>Lib.splitDefault(structure)</h6>
          <p>Splits structure into an array</p>
        </section>
        <section id="join">
          <h6>Lib.join(array)</h6>
          <p>Joins an array with each element to sequence</p>
        </section>
        <section id="dist">
          <h6>Lib.distance(source structure, destination structure)</h6>
          <p>Returns differences between source structure and destination structure
          If they are the same, returns 0
          If they are of different lengths, returns -1</p>
        </section>
        <section id="dist-custom">
          <h6>Lib.distanceCustom(function, source structure, destination structure)</h6>
          <p>Return differences between source structure and destination structure with a custom rule</p>
        </section>
        <h5 id="class-rna">RNA Class</h5>
        <section id="pairmap">
          <h6>RNA.getPairmap(structure)</h6>
          <p>Returns a pairmap of the given structure</p>
        </section>
        <section id="rna-get-struct">
          <h6>RNA.getStructure()</h6>
          <p>Returns the RNA structure</p>
        </section>
        <section id="root-el">
          <h6>RNA.getRootElement()</h6>
          <p>Returns the root element of the RNA</p>
        </section>
        <section id="rna-map">
          <h6>RNA.map(function)</h6>
          <p>Applies the function to each RNAElement</p>
        </section>
        <h5 id="class-rna-el">RNAElement Class</h5>
        <section id="get-parent">
          <h6>getParent()</h6>
          <p>Returns the parent RNAElement class</p>
        </section>
        <section id="get-childs">
          <h6>getChilds()</h6>
          <p>Returns the child RNAElement class array</p>
        </section>
        <section id="get-els">
          <h6>getElements()</h6>
          <p>Returns the array of structure and index JSON objects</p>
        </section>
        <section id="paired">
          <h6>isPaired()</h6>
          <p>Returns boolean whether the stack element is paired or not</p>
        </section>
        <section id="base-type">
          <h6>getBaseType()</h6>
          <p>Returns RNAElement.Stack or RNAElement.Loop if the element is stack or loop</p>
        </section>
        <section id="get-type">
          <h6>getType()</h6>
          <p>Returns RNAElement.Hairpin, RNAElement.Bulge, RNAElement.Internal, RNAElement.Multiloop or RNAElement.Dangling if the element is hairpin, bulge, internal, multiloop or dangling</p>
        </section>
        <section id="get-indices">
          <h6>getIndices()</h6>
          <p>Returns the array of indices</p>
        </section>
        <section id="is-type">
          <h6>isStack()/isLoop()/isHairpin()/isBulge()/isInternal()/isMultiloop()/isDangling()</h6>
          <p>Returns whether the element is stack, loop, hairpin, bulge, internal, multiloop or dangling</p>
        </section>
        <section id="segment-count">
          <h6>getSegmentCount()</h6>
          <p>Returns how many structure segments included
          If a multiloop consists of 2 branches then getSegmentCount() of the multiloop returns 2</p>
        </section>
      </section>
      <section id="booster">
        <h4>Booster API</h4>
        <section id="access-applet">
          <h5>Accessing the applet</h5>
          <p>To access the applet, use this code</p>
          <code>
            var applet = document.getElementById('maingame');<br>
            if (applet == null) return "maingame element missing";<pre></pre>
          </code>
        </section>
        <section id="no-booster-access">
          <h5>Exploring API without writing a booster</h5>
          <p>You can use the API without making a booster in your browser's JavaScript console. To access the console, use <kbd>⌘ Command</kbd> <kbd>⌥ Option</kbd> <kbd>J</kbd> on a Mac, and <kbd>^ Control</kbd>  <kbd>⇧ Shift</kbd> <kbd>J</kbd> on Windows</p>
          <p>Once you have opened the console, type the code above to access the API</p>
          <p>Now, you can use the API as you would in a booster without writing one</p>
        </section>
        <section id="sync-async">
          <h5>Synchronous and Asynchronous</h5>
          <p><router-link to="/script/7070114/">Tsumego</router-link> is a synchronous booster</p>
          <ul>
            <li>When it is started, nothing else happens while it runs</li>
            <li>It does not use <code>setTimeout()</code> or <code>setInterval()</code></li>
            <li>It returns a simple value</li>
          </ul>
          <p>The <router-link to="/script/6713763/">Naive Solver</router-link> is an asynchronous booster</p>
          <ul>
            <li>When it is started, other things can happen while it runs</li>
            <li>It uses <code>setTimeout()</code></li>
            <li>It signals it is asynchronous through <code>return {async: "true"};</code></li>
            <li>It is ended when it runs <code>applet['end_'+sid](r);</code>, where sid is the script ID</li>
            <li>It uses <code>global_timer = new Date();</code> to disable automatic timeout-checking so it can run for more than 10 seconds</li>
          </ul>
        </section>
        <h5 id="getters">Getters</h5>
        <section id="get-seq">
          <h6>get_sequence_string()</h6>
          <p>No parameters</p>
          <p>Returns a string with the current RNA sequence</p>
        </section>
        <section id="get-seq-full">
          <h6>get_full_sequence(index)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              Index - 0-based index of the state to be queried
            </li>
          </ul>
          <p>Returns a string representing the full-length sequence, including the oligos in the case of a multistrand puzzle</p>
        </section>
        <section id="get-locks">
          <h6>get_locks()</h6>
          <p>No parameters</p>
          <p>Returns an array of booleans. Each zero-based entry represents a base; if the value is true the base is locked and vice versa</p>
        </section>
        <section id="get-targs">
          <h6>get_targets()</h6>
          <p>No parameters</p>
          <p>Returns an object containing information about the structure constraints for each puzzle state</p>
        </section>
        <section id="get-native-struct">
          <h6>get_native_structure(index)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              Index - 0-based index of the state to be queried
            </li>
          </ul>
          <p>Returns the dot-bracket representation of the predicted MFE for the queried state in the puzzle (i.e. the native fold)</p>
        </section>
        <section id="get-full-struct">
          <h6>get_full_structure(index)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              Index - 0-based index of the state to be queried
            </li>
          </ul>
          <p>Returns the complete dot-bracket representation of the predicted structure, including oligos, for the queried state in the puzzle (i.e. the native fold)</p>
        </section>
        <section id="get-energy">
          <h6>get_free_energy(index)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              Index - 0-based index of the state to be queried
            </li>
          </ul>
          <p>Returns the free energy of the queried state</p>
        </section>
        <section id="get-marks">
          <h6>get_tracked_indices()</h6>
          <p>No parameters</p>
          <p>Returns an array of the indices of marked bases</p>
        </section>
        <section id="get-barcode">
          <h6>get_barcode_indices()</h6>
          <p>No parameters</p>
          <p>Returns an array of the indices of bases in the barcode (for lab puzzles)</p>
        </section>
        <section id="barcode-available">
          <h6>is_barcode_available()</h6>
          <p>No parameters</p>
          <p>Returns a boolean describing whether the current (lab) puzzle is using a barcode</p>
        </section>
        <section id="current-folder">
          <h6>current_folder()</h6>
          <p>No parameters</p>
          <p>Returns the current folder (folding engine)</p>
        </section>
        <h5 id="setters">Setters</h5>
        <section id="set-folder">
          <h6>set_folder(folder_name)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              folder_name - The name of the folder (folding engine) to change to
            </li>
          </ul>
          <p>Changes the folding engine (only available in lab puzzles). Returns a boolean indicating whether the operation was successful</p>
        </section>
        <section id="set-marks">
          <h6>set_tracked_indices(indices)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              indices - The name of the folder (folding engine) to change to
            </li>
          </ul>
          <p>Changes the marked indices.</p>
        </section>
        <section id="set-seq">
          <h6>set_sequence_string(sequence)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              sequence - The new sequence
            </li>
          </ul>
          <p>Changes the sequence. Folding, energy, and constraints are recomputed</p>
        </section>
        <section id="set-title">
          <h6>set_design_title(name)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              name - A string containing the title
            </li>
          </ul>
          <p>Data browser specific. Displays a title for the current view.</p>
        </section>
        <h5 id="folding">Folding</h5>
        <section id="app-fold">
          <h6>fold(sequence, engine = 'Vienna')</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              sequence - The sequence to fold
              engine - The engine to use for the folding. Defaults to Vienna
            </li>
          </ul>
          <p>Folds the sequence in the specified engine. Returns a string representing the structure in dot-bracket notation.</p>
        </section>
        <section id="app-energy-of-struct">
          <h6>energy_of_structure(sequence, structure, engine = 'Vienna')</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              sequence - The sequence to test
              structure - The structure to fold
              engine - The engine to calculate the energy in. Default is Vienna
            </li>
          </ul>
          <p>Returns a number representing the free energy of the specified sequence in the specified structure in kilocalories per mole.</p>
        </section>
        <h5 id="misc">Miscellaneous</h5>
        <section id="sparks">
          <h6>sparks_effect(from, to)</h6>
          <p>Parameters:</p>
          <ul>
            <li>
              from - The start index
              to - The end index
            </li>
          </ul>
          <p>Causes a sparking effect on the specified segment</p>
        </section>
      </section>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class ScriptDocumentation extends Vue {}
</script>
<style scoped>
.keyboard {
  color: white;
  font-family: monospace;
  font-size: 1.2rem;
  background-color: darkgray;
  margin: 0px 1px;
  border-radius: 2px;
}
</style>
