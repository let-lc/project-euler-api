import localforage from 'localforage';
import { StateStorage } from 'zustand/middleware';

export const storage: StateStorage = {
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  getItem: async (name: string): Promise<string> => {
    return await localforage.getItem(name);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};
