<script setup lang="ts">
interface Props {
  id: string;
}
const props = defineProps<Props>();
if (!props.id) {
  throw new Error('no id!');
}
</script>
<template>
  <div class="co-element co-element__text" :id="id">I am text!</div>
</template>

<style>
.co-text {
  color: red;
}
</style>
