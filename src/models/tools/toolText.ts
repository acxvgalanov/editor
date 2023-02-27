import { COElementType, type BuilderTool } from '@/models/types';
import shortUUID from 'short-uuid';
import {
  type BuilderTextSerialized,
  defaultStyle,
} from '../builder/BuilderText';

export type ToolText = BuilderTool & {
  getElement: () => BuilderTextSerialized;
};

export const toolText = (): ToolText => {
  return {
    getElement() {
      const id = shortUUID.generate();
      return {
        id,
        content: `I am a text! ${id}`,
        style: defaultStyle,
        type: COElementType.TEXT,
      };
    },
    title: 'Text',
  };
};
