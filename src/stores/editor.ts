import { ref, shallowRef, triggerRef } from 'vue';
import { defineStore } from 'pinia';
import type { BuilderWrapper } from '@/models/builder/BuilderWrapper';
import type {
  BuilderElement,
  BuilderElementSerialized,
} from '@/models/builder/BuilderElement';

export const useEditorStore = defineStore('editorStore', () => {
  const currentSection = shallowRef<BuilderWrapper | null>(null);
  const sections = shallowRef<BuilderWrapper[]>([]);
  const selectedElement = shallowRef<BuilderElement | null>(null);
  const setSelectedElement = (val: BuilderElement | null) => {
    selectedElement.value = val;
  };
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
    selectedElement,
    setSelectedElement,
    addSection,
    resetSections,
  };
});

export const useDragStore = defineStore('dragStore', () => {
  const draggedEl = shallowRef<BuilderElementSerialized | null>(null);
  const setDraggedEl = (val: BuilderElementSerialized | null) => {
    draggedEl.value = val;
  };

  const isBefore = ref(false);

  const dropTarget = shallowRef<BuilderElement | null>(null);
  const dropEvent = shallowRef<DragEvent | null>(null);
  const setDropEvent = (e: DragEvent | null) => {
    if (e?.currentTarget) {
      isBefore.value =
        e.offsetX <= (e?.currentTarget as HTMLElement).offsetWidth / 2;
    }
    dropEvent.value = e;
  };
  const setDropTarget = (target: BuilderElement | null) => {
    dropTarget.value = target;
  };
  return {
    isBefore,
    draggedEl,
    dropTarget,
    dropEvent,
    setDraggedEl,
    setDropEvent,
    setDropTarget,
  };
});
