<script setup lang="ts">
import { storeToRefs } from 'pinia';
import shortUUID from 'short-uuid';
import { ref, computed, type CSSProperties } from 'vue';
import { BuilderWrapper } from '../../models/builder/BuilderWrapper';
import { useEditorStore, useDragStore } from '../../stores/editor';

const canvas = ref<HTMLDivElement | null>(null);
const editorStore = useEditorStore();
editorStore.resetSections([new BuilderWrapper(shortUUID.generate())]);

const dragStore = useDragStore();
const { dropEvent, dropTarget, draggedEl, isBefore } = storeToRefs(dragStore);
const marker = ref<HTMLElement | null>(null);

const markerStyle = computed<CSSProperties>(() => {
  if (!dropEvent.value?.currentTarget || !marker.value || !draggedEl.value) {
    return {
      display: 'none',
    };
  }
  const e = dropEvent.value;
  let target = e?.currentTarget as HTMLElement;
  if (dropTarget.value?.canContain(draggedEl.value.type)) {
    const children = Array.from(target.children) as HTMLElement[];
    const childIndex = isBefore.value ? 0 : children.length - 1;
    target = children[childIndex] ?? target;
  }

  const left = isBefore.value
    ? target.offsetLeft
    : target.offsetLeft + target.offsetWidth - marker.value.offsetWidth;
  const style: CSSProperties = {
    top: `${target.offsetTop}px`,
    left: `${left}px`,
    height: `${target.offsetHeight}px`,
    display: 'block',
  };
  return style;
});
</script>

<template>
  <div class="editor-canvas" ref="canvas">
    <div class="editor-canvas__overlay">
      <div
        :style="markerStyle"
        class="editor-canvas__marker"
        ref="marker"
      ></div>
    </div>
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

  &:not(:has(&:hover)):hover:not(&--selected) {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px blue;
  }

  &--selected {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px orange;
  }
}

.editor-canvas {
  height: 100%;
  background-color: #48565f;
  position: relative;
  overflow: hidden;

  &__marker {
    --animation-speed: 0.2s;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    border: 1px solid magenta;
    transition: height var(--animation-speed), top var(--animation-speed),
      left var(--animation-speed);
  }

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
