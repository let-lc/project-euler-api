import create from 'zustand';
import { persist } from 'zustand/middleware';

type CodeStore = {
  code: string;
  languange: CodeLang;
  setCode: (code: string) => void;
  setLanguange: (languange: CodeLang) => void;
};

export const useCodeStore = create<CodeStore>()(
  persist(
    (set) => ({
      code: '',
      languange: 'javascript',
      setCode: (code: string) => set(() => ({ code })),
      setLanguange: (languange: CodeLang) => set(() => ({ languange })),
    }),
    { name: 'code-store' }
  )
);
