import type BuilderElement from './elements/BuilderElement';
import ElementBlock from './elements/ElementBlock';
import ElementText from './elements/ElementText';
import type { ElementType } from './types';

function createElement(type: 'block'): ElementBlock;
function createElement(type: 'text'): ElementText;
function createElement(type: ElementType): BuilderElement;
function createElement(type: ElementType) {
  switch (type) {
    case 'block':
      return new ElementBlock();
    case 'text':
      return new ElementText();
    default:
      throw new Error('Unknown element type');
  }
}

export { createElement };
