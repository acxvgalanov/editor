import type { BuilderTool } from '@/builder/types';

export type ToolBlock = BuilderTool & {};

export const toolBlock = (): ToolBlock => {
  return {
    elementType: 'block',
    title: 'Block',
  };
};
