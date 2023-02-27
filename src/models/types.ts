import type { BuilderElementSerialized } from './builder/BuilderElement';

export enum COElementType {
  TEXT = 'text',
  BLOCK = 'block',
  WRAPPER = 'wrapper',
}

export type BuilderTool = {
  getElement: () => BuilderElementSerialized;
  title: string;
};
