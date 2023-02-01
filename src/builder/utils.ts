import shortUUID from 'short-uuid';
import {
  BuilderBlock,
  type BuilderBlockSerialized,
} from './elements/BuilderBlock';
import type {
  BuilderElement,
  BuilderElementSerialized,
} from './elements/BuilderElement';
import {
  BuilderText,
  type BuilderTextSerialized,
} from './elements/BuilderText';
import {
  BuilderWrapper,
  type BuilderWrapperSerialized,
} from './elements/BuilderWrapper';
import { COElementType } from './types';

export const createBuilderElement = (type: COElementType): BuilderElement => {
  switch (type) {
    case COElementType.TEXT: {
      const id = shortUUID.generate();
      return new BuilderText(id, id);
    }
    case COElementType.BLOCK: {
      return new BuilderBlock(shortUUID.generate());
    }
    case COElementType.WRAPPER: {
      return new BuilderWrapper(shortUUID.generate());
    }
    default:
      throw new Error('Unknown element type');
  }
};

function deSerializeBuilderElement(
  serialized: BuilderWrapperSerialized
): BuilderWrapper;
function deSerializeBuilderElement(
  serialized: BuilderBlockSerialized
): BuilderBlock;
function deSerializeBuilderElement(
  serialized: BuilderTextSerialized
): BuilderText;
function deSerializeBuilderElement(
  serialized: BuilderElementSerialized
): BuilderElement;
function deSerializeBuilderElement(
  serialized: BuilderElementSerialized
): BuilderElement {
  switch (serialized.type) {
    case COElementType.WRAPPER: {
      const wrapper = new BuilderWrapper(serialized.id, serialized.style);
      (serialized as BuilderWrapperSerialized).children.forEach((child) => {
        wrapper.addChild(deSerializeBuilderElement(child));
      });
      return wrapper;
    }
    case COElementType.BLOCK: {
      const block = new BuilderBlock(serialized.id, serialized.style);
      (serialized as BuilderBlockSerialized).children.forEach((child) => {
        block.addChild(deSerializeBuilderElement(child));
      });
      return block;
    }
    case COElementType.TEXT: {
      const text = new BuilderText(
        serialized.id,
        (serialized as BuilderTextSerialized).content,
        serialized.style
      );
      return text;
    }
    default:
      throw new Error('Unknown element type');
  }
}

export { deSerializeBuilderElement };
