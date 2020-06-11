<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot:default="editorParams">
      <div class="editor-toolbar">
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
  import {
    Heading, Bold, Underline, Image, HardBreak, OrderedList,
    ListItem, Code, Italic, Link, Strike, BulletList, History, Placeholder
  // @ts-ignore
  } from 'tiptap-extensions';

  import EditorMenuButton from './EditorMenuButton.vue';

  Component.registerHooks(['beforeDestroy']);

  @Component({
    components: { Editor, EditorContent, EditorMenuButton, EditorMenuBar },
  })
  export default class EditField extends Vue {
    // TODO i18n
    @Prop({ default: '' }) readonly content!: string;

    get editor() {
      const parent = this;
      return new Editor({
        content: this.content,
        // @ts-ignore
        onUpdate: ({ getHTML }) => {
          parent.$emit('input', getHTML());
        },
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
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Type your message...',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
      });
    }

    private beforeDestroy() {
      this.editor.destroy();
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@fortawesome/fontawesome-free/css/all.css';

  .editor {
    background-color: rgba(16, 16, 16, 0.5);
  }
  .btn-light {
    color: #fff;
    border-color: #101010;
    background: #101010;
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

  .ProseMirror {
    text-align: initial;
  }

  .editor ::v-deep p.is-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }

  .editor ::v-deep p {
    margin-bottom: 0;
    padding-bottom: 1rem;
  }
</style>
