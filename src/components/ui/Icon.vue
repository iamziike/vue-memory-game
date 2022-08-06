<template>
  <div class="icon">
    <svg
      v-if="type === 'exit'"
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
    >
      <path
        d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"
      />
    </svg>
    <svg
      v-if="type === 'menu'"
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
    >
      <path
        d="M2.625 14.958v-2.041h14.792v2.041Zm0-3.958V8.958h14.792V11Zm0-3.917V5.042h14.792v2.041Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      default: 'exit',
      type: String as PropType<'exit' | 'history' | 'menu' | 'refresh'>,
    },
  },
});
</script>

<style scoped>
.icon {
  transition: transform 0.5s;
}

.icon:hover {
  transform: scale(1.5);
}

.icon svg {
  fill: var(--white);
}
</style>
