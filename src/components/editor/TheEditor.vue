<template>
  <div class="editor" ref="editor">
    <editor-canvas ref="editorElement" />
    <EditorTools :tools="tools" />
  </div>
</template>

<script setup lang="ts">
import { defineCustomElement } from 'vue';
import EditorTools from '@/components/editor/EditorTools.vue';
import { toolText } from '@/builder/tools/toolText';
import { toolBlock } from '@/builder/tools/toolBlock';
import EditorCanvasCe from '@/components/editor/EditorCanvas.ce.vue';

if (!customElements.get('editor-canvas')) {
  const CanvasElement = defineCustomElement(EditorCanvasCe);
  customElements.define('editor-canvas', CanvasElement);
}

const tools = [toolText(), toolBlock()];
</script>

<style lang="scss">
.editor {
  display: grid;
  grid-template-columns: auto 300px;
  height: 100%;
}
</style>
