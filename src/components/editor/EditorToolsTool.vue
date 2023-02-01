<template>
  <div class="editor-tools-tool" draggable="true" @dragstart="onDragStart">
    {{ tool.title }}
  </div>
</template>

<script setup lang="ts">
import type { BuilderTool } from '@/builder/types';
import { useDragStore } from '../../stores/editor';

export interface Props {
  tool: BuilderTool;
}

const dragStore = useDragStore();

const props = defineProps<Props>();

const onDragStart = () => {
  dragStore.setDraggedEl(props.tool.getElement());
};
</script>

<style lang="scss">
.editor-tools-tool {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--dark-grey);
  cursor: pointer;
  user-select: none;
}
</style>
