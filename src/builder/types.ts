export type ElementType = 'text' | 'block';

export type BuilderTool = {
  elementType: ElementType;
  title: string;
};

export type ElementOptions = {
  selectable: boolean;
};

export type ElementMetadata = {
  id: string;
  type: ElementType;
};

export type COElement = {
  id: string;
  type: ElementType;
  title: string;
  tagName: keyof HTMLElementTagNameMap;
  content: COElement[] | string;
  style: Partial<CSSStyleDeclaration>;
};
