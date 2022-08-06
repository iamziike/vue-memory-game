<template>
  <div class="button">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
});
</script>

<style>
.button {
  transition: transform 0.5s;
  box-shadow: 1px 1px 2px var(--black), 2px 2px 1px var(--white);
}

.button:hover {
  transform: scale(1.1);
}

.button:active {
  transform: scale(1.2);
}
</style>
