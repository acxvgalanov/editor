<script setup lang="ts">
import { onMounted } from 'vue';
import { useInline } from '../common/dragNDrop';

interface Props {
  id: string;
}

const props = defineProps<Props>();
if (!props.id) {
  throw new Error('no id!');
}
const emit = defineEmits(['inlineDrop']);
const { events } = useInline(props.id, emit);
</script>
<template>
  <span
    :style="{
      userSelect: 'none',
      padding: '5px',
      display: 'inline-block',
    }"
    class="co-element co-element__text co-element--inline"
    @hover.stop
    :id="id"
    v-bind="events"
  >
    {{ id }}
  </span>
</template>
