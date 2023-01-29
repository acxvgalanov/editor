<script setup lang="ts">
import { ref } from 'vue';
import { useContainer } from './common/dragNDrop';

const { comps, events, childDrop } = useContainer();
const canvas = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div class="editor-canvas" ref="canvas">
    <div class="editor-canvas__sheet" v-bind="events">
      <template v-for="(comp, i) in comps" :key="`component${i}`">
        <component @inlineDrop="childDrop" :is="comp" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.co-element {
  outline: 1px dashed var(--dark-grey);
  outline-offset: -1px;

  &--dragover {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px red;

    &.co-element--inline {
      outline: 1px dashed var(--dark-grey);
      box-shadow: inset 4px 0px 0px -2px red;
    }
  }

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

  &__sheet {
    overflow: auto;
    background-color: #fff;
    height: 100%;
    width: 100%;
    border: none;
  }
}
</style>
