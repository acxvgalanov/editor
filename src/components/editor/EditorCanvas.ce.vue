<script setup lang="ts">
import shortUUID from 'short-uuid';
import { ref } from 'vue';
import { BuilderWrapper } from '../../builder/elements/BuilderWrapper';
import { useEditorStore } from '../../stores/editor';

const canvas = ref<HTMLDivElement | null>(null);
const editorStore = useEditorStore();
editorStore.resetSections([new BuilderWrapper(shortUUID.generate())]);
</script>

<template>
  <div class="editor-canvas" ref="canvas">
    <div class="editor-canvas__overlay"></div>
    <template
      v-for="(wrapper, i) in editorStore.sections"
      :key="`section-${i}-${wrapper.id}`"
    >
      <component :is="wrapper.coElement" />
    </template>
  </div>
</template>

<style lang="scss">
.co-element {
  outline: 1px dashed var(--dark-grey);
  outline-offset: -1px;

  &:not(:has(&:hover)):hover {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px blue;
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

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
