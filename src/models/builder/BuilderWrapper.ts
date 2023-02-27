import { h, type CSSProperties } from 'vue';
import COWrapperVue from '@/components/editor/COElements/COWrapper.vue';
import { COElementType } from '@/models/types';
import {
  BuilderElement,
  type BuilderElementSerialized,
} from './BuilderElement';

const defaultStyle: CSSProperties = {
  overflow: 'auto',
  backgroundColor: '#fff',
  height: '100%',
  width: '100%',
  border: 'none',
};

export interface BuilderWrapperSerialized extends BuilderElementSerialized {
  type: COElementType.WRAPPER;
  children: BuilderElementSerialized[];
}

export class BuilderWrapper extends BuilderElement {
  public containerFor = new Set([COElementType.BLOCK]);

  constructor(id: string, style?: CSSProperties) {
    super(COElementType.WRAPPER, 'Block', id);
    Object.assign(this.style, style ?? defaultStyle);
  }

  get coElement() {
    if (!this.node) {
      this.node = h(COWrapperVue, { currentComp: this });
    }
    return this.node;
  }

  serialize(): BuilderWrapperSerialized {
    return {
      id: this.id,
      style: this.style,
      type: COElementType.WRAPPER,
      children: this.children.map((child) => child.serialize()),
    };
  }
}
