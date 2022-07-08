import React from 'react';

import Script from 'next/script';

import { Menu } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/solid';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import clsx from 'clsx';
import { editor } from 'monaco-editor';
import ReactTooltip from 'react-tooltip';

import { LANGUAGES, LANG_NAME } from '@/libs/constants';
import {
  addActions,
  downloadCodes,
  downloadZip,
  loadCode,
  loadSnippet,
  runCode,
  saveCode,
} from '@/libs/editor-actions';
import { useCodeStore } from '@/libs/hooks';

type EditorProps = {
  qid: number;
};

const Editor = ({ qid }: EditorProps) => {
  const code = useCodeStore((s) => s.code);
  const setCode = useCodeStore((s) => s.setCode);
  const languange = useCodeStore((s) => s.languange);
  const setLanguange = useCodeStore((s) => s.setLanguange);

  const changeLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguange(e.currentTarget.value as CodeLang);
  };

  const onMountHandler = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    addActions(editor, monaco, qid);
  };

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js" />
      {/* Editor */}
      <div className="relative flex h-screen flex-col items-stretch">
        <div className="flex w-full items-center justify-between border-b bg-gray-50 px-2">
          <EditorMenu
            save={() => saveCode(qid)}
            load={() => loadCode(qid)}
            snippet={loadSnippet}
            download={() => downloadCodes(qid)}
            downloadAll={downloadZip}
          />
          <div className="flex items-stretch">
            {/* Language Switch Dropdown */}
            <select
              value={languange}
              onChange={changeLanguageHandler}
              className="border-0 bg-gray-50 py-0.5 text-sm hover:bg-gray-100 focus:bg-gray-200 focus:ring-0"
            >
              {LANGUAGES.map((lang) => (
                <option key={`lang-${lang}`} value={lang} className="bg-gray-50">
                  {LANG_NAME[lang]}
                </option>
              ))}
            </select>
            {/* Code Run Button */}
            <button
              data-tip
              data-for="dev-tool-msg"
              onClick={runCode}
              className="group flex items-center gap-x-1 self-stretch px-2 text-sm font-medium transition-colors duration-300 hover:bg-green-500 focus:outline-none"
            >
              <span className="group-hover:text-white">
                Run <span className="text-xs font-medium text-gray-500 group-hover:text-white">(Alt+X)</span>
              </span>
              {/* Play Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-green-500 group-hover:text-white"
              >
                <path
                  fill="currentColor"
                  d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888q.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z"
                ></path>
              </svg>
            </button>
            <ReactTooltip
              id="dev-tool-msg"
              effect="solid"
              place="bottom"
              className="w-64 bg-white !opacity-100 drop-shadow-md"
              overridePosition={({ top, left }, _e, _t, _n) => ({ top: top + 10, left: left - 76 })}
            >
              <p>
                Press <kbd className="rounded-sm bg-gray-200 px-px ring-1 ring-gray-300">F12</kbd> and use the
                &quot;Console&quot; tab to view the output of your codes.
              </p>
            </ReactTooltip>
          </div>
        </div>
        {/* Editor */}
        <div className="relative flex-grow">
          <MonacoEditor
            className="absolute inset-0"
            language={languange}
            value={code}
            onChange={setCode}
            onMount={onMountHandler}
            options={{ tabSize: 2 }}
          />
        </div>
      </div>
    </>
  );
};

type EditorMenuProps = {
  save: VoidFunction;
  load: VoidFunction;
  snippet: VoidFunction;
  download: VoidFunction;
  downloadAll: VoidFunction;
};

const EditorMenu = ({ save, load, snippet, download, downloadAll }: EditorMenuProps) => {
  return (
    <Menu as="div" className="relative self-stretch">
      <Menu.Button className="flex h-full items-center bg-gray-50 px-2 text-sm hover:bg-gray-100 focus:outline-none [&[aria-expanded=true]]:bg-gray-200">
        <MenuAlt2Icon className="h-4 w-4" />
        <span className="pl-1">Menu</span>
      </Menu.Button>
      <Menu.Items className="absolute left-0 z-10 mt-px grid divide-y divide-gray-100 bg-white shadow-md focus:outline-none">
        <EditorMenuItem clickFn={save} btnText="Save Code" shortcut="Alt+S" />
        <EditorMenuItem clickFn={load} btnText="Load Code" shortcut="Alt+O" />
        <EditorMenuItem clickFn={snippet} btnText="Load Snippet" shortcut="Alt+Q" />
        <EditorMenuItem clickFn={download} btnText="Export Code to File" />
        <EditorMenuItem clickFn={downloadAll} btnText="Export All Saved Code" />
      </Menu.Items>
    </Menu>
  );
};

type EditorMenuItemProps = {
  clickFn: VoidFunction;
  btnText: string;
  shortcut?: string;
};

const EditorMenuItem = ({ clickFn, btnText, shortcut }: EditorMenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={clickFn}
          className={clsx(
            active && 'bg-gray-100',
            'flex items-center justify-between gap-x-2 whitespace-nowrap px-3 py-0.5 text-left text-sm'
          )}
        >
          <span>{btnText}</span>
          {shortcut && <span className="rounded-sm bg-gray-200 px-px text-xs ring-1 ring-gray-300">{shortcut}</span>}
        </button>
      )}
    </Menu.Item>
  );
};

export default Editor;
