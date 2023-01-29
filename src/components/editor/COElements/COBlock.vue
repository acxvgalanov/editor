<script setup lang="ts">
import { defineExpose } from 'vue';
import { useContainer } from '@/components/editor/common/dragNDrop';

interface Props {
  id: string;
}

const props = defineProps<Props>();
if (!props.id) {
  throw new Error('no id!');
}
const { comps, events, childDrop } = useContainer();
defineExpose({ comps });
</script>

<template>
  <div
    class="co-element co-element__block"
    :id="id"
    v-bind="events"
    :style="{
      minHeight: '100px',
      padding: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    }"
  >
    <template v-for="(comp, i) in comps" :key="`component${i}`">
      <component @inlineDrop="childDrop" :is="comp" />
    </template>
  </div>
</template>

<style>
.co-text {
  color: red;
}
</style>
