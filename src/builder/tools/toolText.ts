import type { BuilderTool } from '@/builder/types';

export type ToolText = BuilderTool & {};

export const toolText = (): ToolText => {
  return {
    elementType: 'text',
    title: 'Text',
  };
};
