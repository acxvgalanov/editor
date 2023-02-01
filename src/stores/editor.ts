import { ref, shallowRef, triggerRef } from 'vue';
import { defineStore } from 'pinia';
import type { BuilderWrapper } from '../builder/elements/BuilderWrapper';
import type { BuilderElementSerialized } from '../builder/elements/BuilderElement';

export const useEditorStore = defineStore('editorStore', () => {
  const currentSection = shallowRef<BuilderWrapper | null>(null);
  const sections = shallowRef<BuilderWrapper[]>([]);
  const addSection = (val: BuilderWrapper) => {
    sections.value.push(val);
    triggerRef(sections);
  };
  const resetSections = (val: BuilderWrapper[]) => {
    sections.value = val;
  };

  return {
    sections,
    currentSection,
    addSection,
    resetSections,
  };
});

export const useDragStore = defineStore('dragStore', () => {
  const draggedEl = shallowRef<BuilderElementSerialized | null>(null);
  const setDraggedEl = (val: BuilderElementSerialized | null) => {
    draggedEl.value = val;
  };
  return { draggedEl, setDraggedEl };
});
