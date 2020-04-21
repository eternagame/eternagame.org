<template>
  <div class="main">
    <editor-menu-bar :editor="editor" v-slot:default="editorParams">
      <div class="border bg-light rounded-top">
        <div class="btn-toolbar p-1" role="toolbar" aria-label="Editor Toolbar">
          <div class="btn-group btn-group-sm mr-2" role="group">
            <editor-menu-button command="undo" :editor-params="editorParams" />
            <editor-menu-button command="redo" :editor-params="editorParams" />
          </div>
          <div class="btn-group btn-group-sm mr-2" role="group">
            <editor-menu-button command="bold" :editor-params="editorParams" />
            <editor-menu-button command="italic" :editor-params="editorParams" />
            <editor-menu-button command="underline" :editor-params="editorParams" />
            <editor-menu-button
              command="strike"
              icon="strikethrough"
              :editor-params="editorParams"
            />
          </div>
          <div class="btn-group btn-group-sm mr-2" role="group">
            <editor-menu-button command="paragraph" :editor-params="editorParams" />
            <editor-menu-button
              command="heading"
              :args="{ level: 2 }"
              :editor-params="editorParams"
            />
            <editor-menu-button
              command="bullet_list"
              icon="list-ul"
              :editor-params="editorParams"
            />
            <editor-menu-button
              command="ordered_list"
              icon="list-ol"
              :editor-params="editorParams"
            />
          </div>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content class="editor-box" :editor="editor" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  // @ts-ignore
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
  // eslint-disable-next-line max-len
  // prettier-ignore
  // @ts-ignore
  import { Heading, Bold, Underline, Image, HardBreak, OrderedList, ListItem, Code, Italic, Link, Strike, BulletList, History } from 'tiptap-extensions';

  import EditorMenuButton from './EditorMenuButton.vue';

  Component.registerHooks(['beforeDestroy']);

  @Component({
    components: { Editor, EditorContent, EditorMenuButton, EditorMenuBar },
  })
  export default class EditField extends Vue {
    @Prop({ default: 'Type here...' }) private content!: string;

    private editor = new Editor({
      content: this.content,
      extensions: [
        new HardBreak(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
      ],
    });

    private beforeDestroy() {
      this.editor.destroy();
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@fortawesome/fontawesome-free/css/all.css';

  .main {
    background-color: #0a223c;
  }

  .editor-box {
    padding: 10px;
  }

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
  .ProseMirror {
    text-align: initial;

    &:focus {
      /*outline: none;*/
    }
  }

  .editor {
    position: relative;
    &__floating-menu {
      position: absolute;
      z-index: 1;
      margin-top: -0.75rem;
      margin-left: 1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;
      &.is-active {
        opacity: 1;
        visibility: visible;
      }
    }

    .menububble {
      position: absolute;
      display: flex;
      z-index: 20;
      margin-bottom: 0.5rem;
      transform: translateX(-50%);
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;

      &.is-active {
        opacity: 1;
        visibility: visible;
      }

      &__form {
        display: flex;
        align-items: center;
      }

      &__input {
        font: inherit;
        border: none;
        background: transparent;
      }
    }
  }
</style>
