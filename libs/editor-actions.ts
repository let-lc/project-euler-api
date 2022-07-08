import { Monaco } from '@monaco-editor/react';
import saveAs from 'file-saver';
import Zip from 'jszip';
import { editor } from 'monaco-editor';
import { toast } from 'react-toastify';

import getCodeSnippet from './code-snippets';
import { LANG_EXTS, LANG_NAME } from './constants';
import { useCodeStore, useSaveStore } from './hooks';
import runner from './runner';

export const runCode = () => {
  const { languange, code } = useCodeStore.getState();
  runner(languange, code).catch(console.error);
};

export const saveCode = (qid: number) => {
  const { languange, code } = useCodeStore.getState();
  const { save } = useSaveStore.getState();
  save(qid, languange, code);
  toast(`Saved ${LANG_NAME[languange]} codes for question #${qid}.`, {
    type: 'success',
    autoClose: 3000,
  });
};

export const loadCode = (qid: number) => {
  const { languange } = useCodeStore.getState();
  const { load } = useSaveStore.getState();
  const loadedCodes = load(qid, languange);
  if (loadedCodes) {
    useCodeStore.setState({ code: loadedCodes });
    toast(`Loaded saved ${LANG_NAME[languange]} codes question #${qid}.`, {
      type: 'success',
      autoClose: 3000,
    });
  } else {
    toast(`No saved ${LANG_NAME[languange]} codes for question #${qid}.`, {
      type: 'warning',
      autoClose: 5000,
    });
  }
};

export const loadSnippet = () => {
  useCodeStore.setState({
    code: getCodeSnippet(useCodeStore.getState().languange),
  });
};

export const downloadCodes = (qid: number) => {
  const { languange, code } = useCodeStore.getState();
  if (code) {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `project_euler_${qid}.${LANG_EXTS[languange]}`);
  }
};

export const downloadZip = () => {
  const { saves } = useSaveStore.getState();
  const zip = new Zip();
  let count = 0;
  for (const qKey in saves) {
    for (const langKey in saves[qKey]) {
      zip.file(
        `project_euler_${qKey}.${LANG_EXTS[langKey]}`,
        saves[qKey][langKey]
      );
      count++;
    }
  }
  if (count) {
    zip
      .generateAsync({ type: 'blob' })
      .then((archive) => {
        saveAs(archive, `project_euler_${Date.now()}.zip`);
      })
      .catch((err) => {
        toast(`Failed to generate ZIP file: ${err.message}`, {
          type: 'error',
          autoClose: 5000,
        });
      });
  } else {
    toast(`No saved codes in IndexedDB.`, { type: 'warning', autoClose: 3000 });
  }
};

export const addActions = (
  editor: editor.IStandaloneCodeEditor,
  monaco: Monaco,
  qid: number
) => {
  editor.addAction({
    id: 'run-code',
    label: 'Run Code',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyX],
    contextMenuGroupId: 'custom',
    contextMenuOrder: 0,
    run: runCode,
  });
  editor.addAction({
    id: 'save-code',
    label: 'Save Code',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyS],
    contextMenuGroupId: 'custom',
    contextMenuOrder: 1,
    run: () => saveCode(qid),
  });
  editor.addAction({
    id: 'load-code',
    label: 'Load Code',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyO],
    contextMenuGroupId: 'custom',
    contextMenuOrder: 1,
    run: () => loadCode(qid),
  });
  editor.addAction({
    id: 'load-snippet',
    label: 'Load Snippet',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyQ],
    contextMenuGroupId: 'custom',
    contextMenuOrder: 1,
    run: loadSnippet,
  });
};
