import COBlockVue from '@/components/editor/COElements/COBlock.vue';
import { h, type CSSProperties } from 'vue';
import { COElementType } from '../types';
import {
  BuilderElement,
  type BuilderElementSerialized,
} from './BuilderElement';

export interface BuilderBlockSerialized extends BuilderElementSerialized {
  children: BuilderElementSerialized[];
}

export const defaultStyle: CSSProperties = {
  minHeight: '100px',
  padding: '10px',
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

export class BuilderBlock extends BuilderElement {
  public containerFor = new Set([COElementType.BLOCK, COElementType.TEXT]);

  constructor(id: string, style?: CSSProperties) {
    super(COElementType.BLOCK, 'Block', id);
    Object.assign(this.style, style ?? defaultStyle);
  }

  get coElement() {
    return h(COBlockVue, { currentComp: this });
  }

  serialize(): BuilderBlockSerialized {
    return {
      id: this.id,
      style: this.style,
      type: this.type,
      children: this.children.map((child) => child.serialize()),
    };
  }
}
