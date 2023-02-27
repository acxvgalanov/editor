<script setup lang="ts">
import type { BuilderText } from '@/models/builder/BuilderText';
import { useCOElement } from '@/composables/coElement';

interface Props {
  currentComp: BuilderText;
}

const props = defineProps<Props>();
const { current, events, isSelected } = useCOElement(props.currentComp);
</script>
<template>
  <span
    v-bind="events"
    :style="{
      userSelect: 'none',
      padding: '5px',
      display: 'inline-block',
    }"
    class="co-element"
    :class="{
      'co-element--selected': isSelected,
    }"
    @hover.stop
    :id="current.id"
  >
    {{ current.content }}
  </span>
</template>
