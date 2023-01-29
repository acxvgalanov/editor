import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useEditor = defineStore('editor', () => {
  const editorElement = ref<HTMLElement | null>(null);
  const setEditorElement = (el: HTMLElement) => {
    editorElement.value = el;
  };
  return {
    editorElement,
    setEditorElement,
  };
});
