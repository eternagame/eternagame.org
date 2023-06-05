<template>
  <div>
    <template v-if="editable">
      Press escape then tab if you wish to use tab to focus other page elements while focused on the editor.
    </template>
    <div class="cm-container" :class="{editable}" ref="container"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
  import {
    EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
    rectangularSelection, crosshairCursor, lineNumbers, highlightActiveLineGutter
  } from "@codemirror/view";
  import {EditorState, Compartment} from "@codemirror/state";
  import {defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
          foldGutter, foldKeymap} from "@codemirror/language";
  import {defaultKeymap, history, historyKeymap, indentWithTab} from "@codemirror/commands";
  import {search, searchKeymap, highlightSelectionMatches} from "@codemirror/search";
  import {autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap} from "@codemirror/autocomplete";
  import {lintKeymap} from "@codemirror/lint";
  import { javascript } from '@codemirror/lang-javascript';

  @Component({})
  export default class CodeMirror extends Vue {
    @Ref() readonly container!: HTMLElement;

    @Prop({ required: true }) editable!: boolean;

    @Prop({ default: '' }) source!: string;

    view!: EditorView;

    mounted() {
      const fixedHeightEditor = EditorView.theme({
        "&": {height: "800px"},
        ".cm-scroller": {overflow: "auto"}
      });

      const readonly = new Compartment();

      this.view = new EditorView({
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          search({ top: true }),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
            indentWithTab
          ]),
          javascript(),
          fixedHeightEditor,
          readonly.of(EditorState.readOnly.of(!this.editable)),
          EditorView.updateListener.of((viewUpdate) => {
            if (viewUpdate.docChanged) {
              this.$emit('source:changed', viewUpdate.state.doc.toString());
            }
          })
        ],
        parent: this.container,
        doc: this.source,
      });
    }

    destroyed() {
      this.view.destroy();
    }
  }
</script>

<style scoped lang="scss">
  .cm-container {
    color: black;
    background-color: #CCCCCC;
    font-size: 14px;
  }

  .cm-container.editable {
    background-color: #fff;
  }
</style>
