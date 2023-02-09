import type { CSSProperties, VNode } from 'vue';
import type { COElementType } from '../types';

export interface BuilderElementSerialized {
  id: string;
  type: COElementType;
  style: CSSProperties;
}

export abstract class BuilderElement {
  protected elementStyle: CSSProperties = {};

  public abstract readonly containerFor: Set<COElementType>;

  protected elementChildren: BuilderElement[] = [];

  protected node?: VNode;

  constructor(
    protected elementType: COElementType,
    protected elementTitle: string,
    protected elementId: string
  ) {}

  get id() {
    return this.elementId;
  }

  get type(): typeof this.elementType {
    return this.elementType;
  }

  get title() {
    return this.elementTitle;
  }

  get style() {
    return this.elementStyle;
  }

  get children() {
    return this.elementChildren;
  }

  canContain(type: COElementType) {
    return this.containerFor.has(type);
  }

  addChild(child: BuilderElement, index?: number) {
    if (!this.canContain(child.type)) {
      throw new Error(
        `The element of type ${this.type} can't contain ${child.type}`
      );
    }
    if (index === undefined) {
      this.elementChildren.push(child);
      return;
    }
    this.elementChildren.splice(index, 0, child);
    console.log(index);
    console.log(this.elementChildren);
  }

  abstract get coElement(): VNode;

  abstract serialize(): BuilderElementSerialized;
}
