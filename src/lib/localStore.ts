import type { Database } from '../types';

const STORAGE_KEY = 'uber-ai-agent-db';

const defaultData: Database = {
  conversations: {
    section2: [],
    section3: [],
    section4: [],
  },
  settings: {
    defaultModel: 'gpt-5-mini',
  },
};

class LocalStorageDB {
  data: Database;

  constructor() {
    this.data = this.load();
  }

  private load(): Database {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
    return structuredClone(defaultData);
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }

  updateData(updater: (data: Database) => void): void {
    updater(this.data);
    this.save();
  }

  reset(): void {
    this.data = structuredClone(defaultData);
    this.save();
  }
}

export const localStore = new LocalStorageDB();

export function clearConversation(section: keyof Database['conversations']) {
  localStore.updateData((data) => {
    data.conversations[section] = [];
  });
}
