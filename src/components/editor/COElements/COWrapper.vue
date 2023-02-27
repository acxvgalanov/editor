<script setup lang="ts">
import type { BuilderWrapper } from '@/models/builder/BuilderWrapper';
import { useCOElement } from '@/composables/coElement';

interface Props {
  currentComp: BuilderWrapper;
}

const props = defineProps<Props>();

const { current, events } = useCOElement(props.currentComp);
</script>

<template>
  <div
    class="co-wrapper"
    v-bind="events"
    :id="current.id"
    :style="current.style"
  >
    <template
      v-for="(comp, i) in current.children"
      :key="`coWrapper-child-${comp.id}-${i}`"
    >
      <component :is="comp.coElement" :currentComp="comp" />
    </template>
  </div>
</template>
