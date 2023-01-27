<template>
  <div class="layout">
    <header class="layout__header">header</header>
    <RouterView />
  </div>
</template>

<style lang="scss">
.layout {
  display: grid;
  height: 100dvh;
  grid-template-rows: 100px auto;
  gap: 1px;
  background-color: var(--dark-grey);

  &__header {
    background-color: var(--light-grey);
  }
}
</style>
