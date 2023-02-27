import { COElementType, type BuilderTool } from '@/models/types';
import shortUUID from 'short-uuid';
import {
  defaultStyle,
  type BuilderBlockSerialized,
} from '../builder/BuilderBlock';

export type ToolBlock = BuilderTool & {
  getElement: () => BuilderBlockSerialized;
};

export const toolBlock = (): ToolBlock => {
  return {
    getElement() {
      return {
        id: shortUUID.generate(),
        children: [],
        style: defaultStyle,
        type: COElementType.BLOCK,
      };
    },
    title: 'Block',
  };
};
