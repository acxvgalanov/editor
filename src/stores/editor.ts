import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { COElement } from '../builder/types';

export const useEditor = defineStore('editor', () => {
  const elements = ref<COElement[]>([]);
  const addElement = (el: COElement, parentId?: string) => {};
  return {
    elements,
    addElement,
  };
});
