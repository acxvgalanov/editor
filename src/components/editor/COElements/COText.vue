<script setup lang="ts">
import type { BuilderText } from '../../../builder/elements/BuilderText';
import { useCOElement } from '../common/coElement';

interface Props {
  currentComp: BuilderText;
}

const props = defineProps<Props>();
const { current, events } = useCOElement(props.currentComp);
</script>
<template>
  <span
    v-bind="events"
    :style="{
      userSelect: 'none',
      padding: '5px',
      display: 'inline-block',
    }"
    class="co-element co-element__text co-element--inline"
    @hover.stop
    :id="current.id"
  >
    {{ current.id }}
  </span>
</template>
