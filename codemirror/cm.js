import { EditorState, basicSetup } from "../libs/@codemirror/basic-setup.js";
import { EditorView, keymap } from "../libs/@codemirror/view.js";
import { indentWithTab } from "../libs/@codemirror/commands.js";
import { javascript } from "../libs/@codemirror/lang-javascript.js";
import booleanCheckbox from './booleanCheckbox.js';
import editors from './editors.js';
import { foldRange, foldAll } from "../libs/index-120515b5.js";

export function createEditorView(onUpdate = () => {}) {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
        javascript(),
        booleanCheckbox,
        editors,
        EditorView.updateListener.of(onUpdate)
      ]
    })
  });

  editor.foldRange = foldRange;
  editor.foldAll = foldAll;

  return editor;
}