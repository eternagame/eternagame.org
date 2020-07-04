<template>
  <EternaPage title="Script Documentation">
    <div class="page">
      <a href="https://docs.google.com/document/d/1VC94wTuRhNd-FN60ueaBc5mUxBsiIy8UzJzQL6ap3CE/edit#">General Scripting Introduction by Eli Fisker</a><br>
      <a href="https://bluejeans.com/playback/s/pdm4Opyt0KLwxVaTkncmMv2nncZjmECWejnBNxVdgQHhqJ4J2cMM21dVExCO1R9Z">Recording of live chat about boosters</a>
      <section>
        <h4>Functions and Classes</h4>
        <h5>Pervasives</h5>
        <h5>Library Functions</h5>
        <h5>RNA Class</h5>
        <h5>RNAElement Class</h5>
      </section>
      <section>
        <h4>Booster API</h4>
        <h5>Accessing the applet</h5>
        <p>To access the applet, use this code</p>
        <code>
          var applet = document.getElementById('maingame');<br>
          if (applet == null) return "maingame element missing";<pre></pre>
        </code>
        <h5>Exploring API without writing a booster</h5>
        <p>You can use the API without making a booster in your browser's JavaScript console. To access the console, use <kbd>⌘ Command</kbd> <kbd>⌥ Option</kbd> <kbd>J</kbd> on a Mac, and <kbd>^ Control</kbd>  <kbd>⇧ Shift</kbd> <kbd>J</kbd> on Windows</p>
        <p>Once you have opened the console, type the code above to access the API</p>
        <p>Now, you can use the API as you would in a booster without writing one</p>
        <h5>Synchronous and Asynchronous</h5>
        <p>The <router-link to="/script/7070114/">Tsumego</router-link> is a synchronous booster</p>
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
        <h5>Getters</h5>
        <h6>get_sequence_string()</h6>
        <p>No parameters</p>
        <p>Returns a string with the current RNA sequence</p>
        <h6>get_full_sequence(index)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            Index - 0-based index of the state to be queried
          </li>
        </ul>
        <p>Returns a string representing the full-length sequence, including the oligos in the case of a multistrand puzzle</p>
        <h6>get_locks()</h6>
        <p>No parameters</p>
        <p>Returns an array of booleans. Each zero-based entry represents a base; if the value is true the base is locked and vice versa</p>
        <h6>get_targets()</h6>
        <p>No parameters</p>
        <p>Returns an object containing information about the structure constraints for each puzzle state</p>
        <h6>get_native_structure(index)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            Index - 0-based index of the state to be queried
          </li>
        </ul>
        <p>Returns the dot-bracket representation of the predicted MFE for the queried state in the puzzle (i.e. the native fold)</p>
        <h6>get_full_structure(index)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            Index - 0-based index of the state to be queried
          </li>
        </ul>
        <p>Returns the complete dot-bracket representation of the predicted MFE, including oligos, for the queried state in the puzzle (i.e. the native fold)</p>
        <h6>get_free_energy(index)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            Index - 0-based index of the state to be queried
          </li>
        </ul>
        <p>Returns the free energy of the queried state</p>
        <h6>get_tracked_indices()</h6>
        <p>No parameters</p>
        <p>Returns an array of the indices of marked bases</p>
        <h6>get_barcode_indices()</h6>
        <p>No parameters</p>
        <p>Returns an array of the indices of bases in the barcode (for lab puzzles)</p>
        <h6>is_barcode_available()</h6>
        <p>No parameters</p>
        <p>Returns a boolean describing whether the current (lab) puzzle is using a barcode</p>
        <h6>current_folder()</h6>
        <p>No parameters</p>
        <h5>Setters</h5>
        <h6>set_folder(folder_name)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            folder_name - The name of the folder (folding engine) to change to
          </li>
        </ul>
        <p>Changes the folding engine (only available in lab puzzles). Returns a boolean indicating whether the operation was successful</p>
        <h6>set_folder(folder_name)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            folder_name - The name of the folder (folding engine) to change to
          </li>
        </ul>
        <p>Changes the folding engine (only available in lab puzzles). Returns a boolean indicating whether the operation was successful</p>
        <h6>set_sequence_string(folder_name)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            folder_name - The name of the folder (folding engine) to change to
          </li>
        </ul>
        <p>Changes the folding engine (only available in lab puzzles). Returns a boolean indicating whether the operation was successful</p>
        <h6>set_folder(folder_name)</h6>
        <p>Parameters:</p>
        <ul>
          <li>
            folder_name - The name of the folder (folding engine) to change to
          </li>
        </ul>
        <p>Changes the folding engine (only available in lab puzzles). Returns a boolean indicating whether the operation was successful</p>
        <h5>Folding</h5>
        <h5>Miscellaneous</h5>
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
