<script lang="ts">
import shortid from 'short-uuid';
import { h, type VNode } from 'vue';
import { COElementType, resolveCOElement } from '../../builder/utils';
export default {
  data(): { comps: VNode[] } {
    return {
      comps: [],
    };
  },
  methods: {
    dragOver(e: DragEvent) {
      e.preventDefault();
    },
    async drop(e: DragEvent) {
      const type = e.dataTransfer?.getData('type') as COElementType;
      this.comps.push(await resolveCOElement(type));
    },
  },
  render() {
    return h(
      'div',
      {
        class: 'editor-canvas',
      },
      [
        h(
          'div',
          {
            class: 'editor-canvas__sheet',
            onDragover: this.dragOver,
            onDrop: this.drop,
          },
          [this.comps]
        ),
      ]
    );
  },
};
</script>

<style lang="scss">
.co-element {
  outline: 1px dashed var(--dark-grey);
  outline-offset: -1px;

  &:hover {
    outline: 2px solid blue;
    outline-offset: -2px;
  }

  &--selected {
    outline: 2px solid orange;
  }
}

.editor-canvas {
  height: 100%;
  background-color: #48565f;
  position: relative;
  overflow: hidden;

  &__sheet {
    overflow: auto;
    background-color: #fff;
    height: 100%;
    width: 100%;
    border: none;
  }
}
</style>
