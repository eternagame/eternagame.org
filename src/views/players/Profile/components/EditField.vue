<template>
  <v-container>
    <v-row>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div>
          <v-btn
            text
            icon
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <b> H1 </b>
          </v-btn>
          <v-btn text icon :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn
            text
            icon
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>
        </div>
      </editor-menu-bar>
    </v-row>
    <v-row>
      <v-col cols="12">
        <editor-content class="editor-box" :editor="editor" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  // @ts-ignore
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
  // @ts-ignore
  import { Heading, Bold, Underline, Image } from 'tiptap-extensions';

  Component.registerHooks(['beforeDestroy']);

  @Component({
    components: { Editor },
  })
  export default class EditField extends Vue {
    private editor = new Editor({
      content: `Type here...
         `,
      extensions: [new Heading({ levels: [1, 2, 3] }), new Bold(), new Underline(), new Image()],
    });

    private beforeDestroy() {
      this.editor.destroy();
    }
  }
</script>
<style lang="scss" scoped>
  .editor-box > * {
    border-color: grey;
    border-style: solid;
    border-width: 1px;
  }

  .is-active {
    border-color: grey;
    border-style: solid;
    border-width: 1px;
  }
  /* *:focus {
    outline: none;
}  */
</style>
