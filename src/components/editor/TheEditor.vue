<template>
  <div class="editor" ref="editor">
    <EditorTools :tools="tools" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineCustomElement } from 'vue';
import EditorTools from '@/components/editor/EditorTools.vue';
import { toolText } from '@/builder/tools/toolText';
import { toolBlock } from '@/builder/tools/toolBlock';
import EditorCanvasCe from './EditorCanvas.ce.vue';
const tools = [toolText(), toolBlock()];
const editor = ref<HTMLDivElement | null>();

onMounted(() => {
  if (!editor.value) {
    throw new Error('Editor container not found');
  }
  const CanvasElement = defineCustomElement(EditorCanvasCe);
  customElements.define('editor-canvas', CanvasElement);
  editor.value.prepend(new CanvasElement());
});
</script>

<style lang="scss">
.editor {
  display: grid;
  grid-template-columns: auto 300px;
  height: 100%;
}
</style>
