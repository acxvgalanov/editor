<template>
  <div class="editor-tools">
    <div class="editor-tools__grid">
      <template v-for="(tool, i) in tools" :key="`editor-tools-tool${i}`">
        <EditorToolsTool :tool="tool" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BuilderTool } from '@/builder/types';
import EditorToolsTool from './EditorToolsTool.vue';

export interface Props {
  tools: BuilderTool[];
}
defineProps<Props>();
</script>
<style lang="scss">
.editor-tools {
  background-color: var(--light-grey);
  padding: 10px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, auto));
    gap: 10px;
  }
}
</style>
