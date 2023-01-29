import {
  ref,
  type ComponentPublicInstance,
  type VNode,
  type RendererNode,
  type RendererElement,
} from 'vue';
import { createCOElement, type COElementType } from '@/builder/utils';
import { useEditor } from '../../../stores/editor';

export type COInlineComponent = VNode<
  RendererNode,
  RendererElement,
  { id: string }
>;

export type COContainerComponent = ComponentPublicInstance<{
  comps: COInlineComponent[];
}>;

export const useContainer = () => {
  const comps = ref<COInlineComponent[]>([]);
  const { editorElement } = useEditor();

  if (!editorElement) {
    throw new Error('Editor is not opened');
  }

  const onDrop = async (e: DragEvent) => {
    console.log(editorElement.shadowRoot?.elementFromPoint(e.pageX, e.pageY));
    e.stopPropagation();
    const type = e.dataTransfer?.getData('type') as COElementType;
    (e.target as Element).classList.remove('co-element--dragover');
    comps.value.push(await createCOElement(type));
  };

  const onDragover = (e: DragEvent) => {
    console.log(editorElement.shadowRoot?.elementFromPoint(e.pageX, e.pageY));
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragenter = (e: DragEvent) => {
    (e.target as Element).classList.add('co-element--dragover');
  };

  const onDragleave = (e: DragEvent) => {
    e.stopPropagation();
    (e.target as Element).classList.remove('co-element--dragover');
  };

  const childDrop = async (childId: string, e: DragEvent) => {
    console.log(editorElement.shadowRoot?.elementFromPoint(e.pageX, e.pageY));
    const index = comps.value.findIndex((comp) => comp.props?.id === childId);
    if (index > -1) {
      const type = e.dataTransfer?.getData('type') as COElementType;
      comps.value.splice(index, 0, await createCOElement(type));
    }
  };

  return {
    comps,
    childDrop,
    events: { onDrop, onDragover, onDragenter, onDragleave },
  };
};

export const useInline = (
  id: string,
  emit: (event: 'inlineDrop', ...args: any[]) => void
) => {
  const onDrop = async (e: DragEvent) => {
    e.stopPropagation();
    (e.target as Element).classList.remove('co-element--dragover');
    emit('inlineDrop', id, e);
  };

  const onDragover = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragenter = (e: DragEvent) => {
    (e.target as Element).classList.add('co-element--dragover');
  };

  const onDragleave = (e: DragEvent) => {
    (e.target as Element).classList.remove('co-element--dragover');
  };

  return {
    events: { onDrop, onDragover, onDragenter, onDragleave },
  };
};
