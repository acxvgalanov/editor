import { computed, shallowRef, triggerRef } from 'vue';
import type { BuilderElement } from '@/models/builder/BuilderElement';
import { deSerializeBuilderElement } from '@/models/utils';
import { useDragStore, useEditorStore } from '@/stores/editor';
import { COElementType } from '@/models/types';

export const useCOElement = <T extends BuilderElement>(currentComp: T) => {
  const current = shallowRef<T>(currentComp);

  const editorStore = useEditorStore();

  const isSelected = computed(() => {
    return editorStore.selectedElement === current.value;
  });

  const onDrop = async (e: DragEvent) => {
    const { draggedEl, setDropEvent, dropTarget, isBefore } = useDragStore();
    setDropEvent(null);
    e.stopPropagation();
    if (!draggedEl || !current.value.canContain(draggedEl.type)) {
      (e.currentTarget as HTMLElement).parentElement?.dispatchEvent(
        new DragEvent(e.type)
      );
      return;
    }
    const builderElement = deSerializeBuilderElement(draggedEl);
    let insertIndex: number | undefined;
    if (current.value === dropTarget) {
      insertIndex = isBefore ? 0 : undefined;
    } else {
      const childIndex = current.value.children.findIndex(
        (child) => child === dropTarget
      );
      if (childIndex !== -1) {
        insertIndex = isBefore ? childIndex : childIndex + 1;
      }
    }
    current.value.addChild(builderElement, insertIndex);
    triggerRef(current);
  };

  const onDragover = (e: DragEvent) => {
    const { draggedEl, dropTarget, setDropEvent, setDropTarget } =
      useDragStore();
    if (
      !dropTarget ||
      !draggedEl ||
      !current.value.canContain(draggedEl.type)
    ) {
      setDropEvent(e);
      setDropTarget(current.value);
      return;
    }
    if (e.target === e.currentTarget) {
      setDropTarget(current.value);
      setDropEvent(e);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const onClick = (e: MouseEvent) => {
    editorStore.setSelectedElement(
      current.value.type === COElementType.WRAPPER ? null : current.value
    );
    e.stopPropagation();
    e.preventDefault();
  };

  return {
    current,
    isSelected,
    events: { onDrop, onDragover, onClick },
  };
};
