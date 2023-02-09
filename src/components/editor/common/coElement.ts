import { shallowRef, triggerRef } from 'vue';
import type { BuilderElement } from '@/builder/elements/BuilderElement';
import { deSerializeBuilderElement } from '@/builder/utils';
import { useDragStore } from '@/stores/editor';

export const useCOElement = <T extends BuilderElement>(currentComp: T) => {
  const current = shallowRef<T>(currentComp);

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

  const onDragenter = (e: DragEvent) => {
    e.stopPropagation();
  };

  const onDragleave = (e: DragEvent) => {
    e.stopPropagation();
  };

  return {
    current,
    events: { onDrop, onDragover, onDragenter, onDragleave },
  };
};
