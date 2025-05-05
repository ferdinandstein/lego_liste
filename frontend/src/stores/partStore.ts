import { defineStore } from 'pinia';
import type { Part } from '@/model/Part';

export const usePartStore = defineStore('part', {
  state: () => ({
    parts: {} as Record<string, Part>,
  }),
  actions: {
    addPart(partNumber: string, part: Part) {
      this.parts[partNumber] = part;
    },
    getPart(partNumber: string): Part | undefined {
      return this.parts[partNumber];
    },
    hasPart(partNumber: string): boolean {
      return partNumber in this.parts;
    }
  }
});
