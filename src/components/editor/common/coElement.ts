import { shallowRef, triggerRef } from 'vue';
import { cloneDeep, throttle } from 'lodash';
import type { BuilderElement } from '@/builder/elements/BuilderElement';
import { deSerializeBuilderElement } from '@/builder/utils';
import { useDragStore } from '@/stores/editor';

export const useCOElement = (currentComp: BuilderElement) => {
  const current = shallowRef<BuilderElement>(currentComp);

  const onDrop = async (e: DragEvent) => {
    const { draggedEl, setDraggedEl } = useDragStore();
    if (!draggedEl || !current.value.canContain(draggedEl.type)) {
      return;
    }
    const builderElement = deSerializeBuilderElement(draggedEl);
    current.value.addChild(builderElement);
    triggerRef(current);
    setDraggedEl(null);
    e.stopPropagation();
  };

  const dragOverHandler = throttle(
    (target: EventTarget | null, currentTarget: EventTarget | null) => {
      if (target === currentTarget) {
        return;
      }
    },
    500
  );

  const onDragover = (e: DragEvent) => {
    const { draggedEl } = useDragStore();
    if (!draggedEl || !current.value.canContain(draggedEl.type)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    dragOverHandler(e.target, e.currentTarget);
  };

  const onDragenter = (e: DragEvent) => {
    e.stopPropagation();
    console.log('onDragenter');
  };

  const onDragleave = (e: DragEvent) => {
    e.stopPropagation();
    console.log('onDragleave');
  };

  return {
    current,
    events: { onDrop, onDragover, onDragenter, onDragleave },
  };
};
