<template>
  <div class="lives">{{ livesToShow || '💔' }}</div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Lives',
  props: {
    livesCount: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  computed: {
    livesToShow() {
      let lives = '';
      for (let count = 0; count < this.livesCount; count++) {
        lives += '💚';
      }
      return lives;
    },
  },
});
</script>

<style scoped>
.lives::selection {
  color: var(--black);
  background: var(--green);
}
</style>
>
