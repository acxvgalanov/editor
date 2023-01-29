import shortUUID from 'short-uuid';
import { h } from 'vue';
import type { COInlineComponent } from '../components/editor/common/dragNDrop';

export enum COElementType {
  TEXT = 'text',
  BLOCK = 'block',
}

export const createCOElement = async (
  type: COElementType
): Promise<COInlineComponent> => {
  switch (type) {
    case COElementType.TEXT: {
      const COText = (await import('@/components/editor/COElements/COText.vue'))
        .default;
      return h(COText, { id: shortUUID.generate() }) as COInlineComponent;
    }
    case COElementType.BLOCK: {
      const COText = (
        await import('@/components/editor/COElements/COBlock.vue')
      ).default;
      return h(COText, { id: shortUUID.generate() }) as COInlineComponent;
    }
    default:
      throw new Error('Unknown element type');
  }
};
