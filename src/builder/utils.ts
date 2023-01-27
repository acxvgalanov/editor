import shortUUID from 'short-uuid';
import { h } from 'vue';

export enum COElementType {
  TEXT = 'text',
  BLOCK = 'block',
}

export const resolveCOElement = async (type: COElementType) => {
  switch (type) {
    case COElementType.TEXT: {
      const COText = (
        await import('@/components/editor/COElements/COText.ce.vue')
      ).default;
      return h(COText, { id: shortUUID.generate() });
    }
    default:
      throw new Error('Unknown element type');
  }
};
