<template>
  <div
    class="editor-tools-tool"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    {{ tool.title }}
  </div>
</template>

<script setup lang="ts">
import type { BuilderTool } from '@/models/types';
import { useDragStore } from '@/stores/editor';

export interface Props {
  tool: BuilderTool;
}

const dragStore = useDragStore();

const props = defineProps<Props>();

const onDragStart = () => {
  dragStore.setDraggedEl(props.tool.getElement());
};

const onDragEnd = () => {
  dragStore.setDraggedEl(null);
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
