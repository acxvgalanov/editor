import { COElementType, type BuilderTool } from '@/builder/types';
import shortUUID from 'short-uuid';
import {
  defaultStyle,
  type BuilderBlockSerialized,
} from '../elements/BuilderBlock';

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
