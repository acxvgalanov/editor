<script setup lang="ts">
import { useCOElement } from '@/composables/coElement';
import type { BuilderBlock } from '@/models/builder/BuilderBlock';

interface Props {
  currentComp: BuilderBlock;
}

const props = defineProps<Props>();
const { current, events, isSelected } = useCOElement(props.currentComp);
</script>

<template>
  <div
    class="co-element"
    v-bind="events"
    :id="current.id"
    :style="current.style"
    :class="{
      'co-element--selected': isSelected,
    }"
  >
    <template
      v-for="(comp, i) in current.children"
      :key="`coBlock-child-${comp.id}-${i}`"
    >
      <component :is="comp.coElement" :currentComp="comp" />
    </template>
  </div>
</template>
