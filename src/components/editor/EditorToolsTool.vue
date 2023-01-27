<template>
  <div class="editor-tools-tool" draggable="true" @dragstart="onDragStart">
    {{ tool.title }}
  </div>
</template>

<script setup lang="ts">
import type { BuilderTool } from '@/builder/types';

export interface Props {
  tool: BuilderTool;
}

const props = defineProps<Props>();

const onDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData('type', props.tool.elementType);
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
