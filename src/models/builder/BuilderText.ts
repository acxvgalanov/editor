import { h, type CSSProperties, type VNode } from 'vue';
import COTextVue from '@/components/editor/COElements/COText.vue';
import { COElementType } from '../types';
import {
  BuilderElement,
  type BuilderElementSerialized,
} from './BuilderElement';

export interface BuilderTextSerialized extends BuilderElementSerialized {
  content: string;
}

export const defaultStyle = {};

export class BuilderText extends BuilderElement {
  constructor(
    id: string,
    private elementContent: string,
    style?: CSSProperties
  ) {
    super(COElementType.TEXT, 'Text', id);
    Object.assign(this.style, style ?? defaultStyle);
  }

  protected containerFor = new Set([]);

  get content() {
    return this.elementContent;
  }

  set content(value: string) {
    this.elementContent = value;
  }

  get coElement() {
    if (!this.node) {
      this.node = h(COTextVue, { currentComp: this });
    }
    return this.node;
  }

  serialize(): BuilderTextSerialized {
    return {
      id: this.id,
      type: this.type,
      content: this.content,
      style: this.style,
    };
  }
}
