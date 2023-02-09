<script setup lang="ts">
import { useCOElement } from '@/components/editor/common/coElement';
import type { BuilderBlock } from '@/builder/elements/BuilderBlock';

interface Props {
  currentComp: BuilderBlock;
}

const props = defineProps<Props>();
const { current, events } = useCOElement(props.currentComp);
</script>

<template>
  <div
    class="co-element co-element__block"
    v-bind="events"
    :id="current.id"
    :style="current.style"
  >
    <template
      v-for="(comp, i) in current.children"
      :key="`coBlock-child-${comp.id}-${i}`"
    >
      <component :is="comp.coElement" :currentComp="comp" />
    </template>
  </div>
</template>
