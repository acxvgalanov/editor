<script setup lang="ts">
import { ref } from 'vue';
export interface Props {
  tabs: {
    title: string;
    id: string;
  }[];
}

const props = defineProps<Props>();

const activeTabId = ref<string>(props.tabs[0].id);

const selectTab = (id: string) => {
  activeTabId.value = id;
};
</script>

<template>
  <div class="tab-view">
    <div class="tab-view__header">
      <div
        @click="selectTab(tab.id)"
        class="tab-view__header-button"
        v-for="tab in tabs"
        :key="`tab-header-${tab.id}`"
        :class="{ 'tab-view__header-button--active': tab.id === activeTabId }"
      >
        {{ tab.title }}
      </div>
    </div>
    <div
      class="tab-view__tab-container"
      v-show="tab.id === activeTabId"
      v-for="tab in tabs"
      :key="`tab-content-${tab.id}`"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>

<style lang="scss">
.tab-view {
  display: flex;
  flex-direction: column;

  &__tab-container {
    flex-grow: 1;
  }

  &__header {
    background-color: var(--light-grey);
    height: 40px;
    border-bottom: 1px solid var(--dark-grey);
    display: flex;
    overflow-x: hidden;
    width: 100%;
  }

  &__header-button {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 5px;
    padding-bottom: 7px;
    white-space: nowrap;

    &--active {
      border-bottom: 2px solid orange;
      padding-bottom: 5px;
    }
  }
}
</style>
