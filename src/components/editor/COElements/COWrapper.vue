<script setup lang="ts">
import type { BuilderWrapper } from '../../../builder/elements/BuilderWrapper';
import { useCOElement } from '../common/coElement';

interface Props {
  currentComp: BuilderWrapper;
}

const props = defineProps<Props>();

const { current, events } = useCOElement(props.currentComp);
</script>

<template>
  <div
    class="co-element co-element__wrapper"
    v-bind="events"
    :id="current.id"
    :style="current.style"
  >
    <template
      v-for="(comp, i) in current.children"
      :key="`coWrapper-child-${current.id}-${i}`"
    >
      <component :is="comp.coElement" :currentComp="comp" />
    </template>
  </div>
</template>
