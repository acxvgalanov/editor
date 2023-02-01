import type { BuilderElementSerialized } from './elements/BuilderElement';

export enum COElementType {
  TEXT = 'text',
  BLOCK = 'block',
  WRAPPER = 'wrapper',
}

export type BuilderTool = {
  getElement: () => BuilderElementSerialized;
  title: string;
};
