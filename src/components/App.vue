<template>
  <div class="app">
    <Header />
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './layouts/Header.vue';
import Main from './layouts/Main.vue';

export default defineComponent({
  components: {
    Header,
    Main,
  },
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app > * {
  flex-grow: 0;
  padding: var(--xsm);
}

.app > *:nth-child(2) {
  flex-grow: 1;
}

.lives {
  color: var(--white);
}
</style>
