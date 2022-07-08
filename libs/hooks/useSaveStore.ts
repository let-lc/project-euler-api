import create from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from './storage';

type SaveStore = {
  saves: Record<number, Record<CodeLang, string>>;
  save: (qid: number, languange: CodeLang, code: string) => void;
  load: (qid: number, languange: CodeLang) => string;
};

export const useSaveStore = create<SaveStore>()(
  persist(
    (set, get) => ({
      saves: {},
      save: (qid, languange, code) => {
        set({
          saves: {
            ...get().saves,
            [qid]: { ...get().saves?.[qid], [languange]: code },
          },
        });
      },
      load: (qid, language) => get().saves?.[qid]?.[language],
    }),
    { name: 'save-store', getStorage: () => storage }
  )
);
