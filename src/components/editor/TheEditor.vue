<template>
  <div class="editor" ref="editor">
    <TabView v-bind="tabsLeft">
      <template #toolbar>
        <EditorTools :tools="tools" />
      </template>
    </TabView>
    <editor-canvas ref="editorElement" />
    <TabView v-bind="tabsRight">
      <template #styles>styles!</template>
      <template #options>
        <EditorOptions />
      </template>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { defineCustomElement } from 'vue';
import EditorTools from '@/components/editor/tools/EditorTools.vue';
import { toolText } from '@/models/tools/toolText';
import { toolBlock } from '@/models/tools/toolBlock';
import EditorCanvasCe from '@/components/editor/EditorCanvas.ce.vue';
import TabView, {
  type Props as TabViewProps,
} from '@/components/common/TabView.vue';
import EditorOptions from './options/EditorOptions.vue';

if (!customElements.get('editor-canvas')) {
  const CanvasElement = defineCustomElement(EditorCanvasCe);
  customElements.define('editor-canvas', CanvasElement);
}
const tools = [toolText(), toolBlock()];
const tabsLeft: TabViewProps = {
  tabs: [
    {
      id: 'toolbar',
      title: 'Toolbar',
    },
  ],
};
const tabsRight: TabViewProps = {
  tabs: [
    {
      id: 'styles',
      title: 'Styles',
    },
    {
      id: 'options',
      title: 'Options',
    },
  ],
};
</script>

<style lang="scss">
.editor {
  display: grid;
  grid-template-columns: 250px auto 250px;
  height: 100%;
}
</style>
