<template>
  <div
    @click="handleClick"
    :class="`cell ${content.isVisible ? '' : 'cell--no-visibility'} ${
      content.isSolved ? 'cell--solved' : ''
    }`"
  >
    {{ content.isVisible ? content.value : '❔' }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Cell',
  props: ['content', 'onClick'],
  methods: {
    handleClick() {
      if (this.content.isSolved) return;
      this.onClick({ ...this.content });
    },
  },
});
</script>

<style scoped>
.cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 3px var(--black);
  border-radius: 10px;
  font-size: 70px;
  transition: transform 0.5s;
  background: var(--white);
  overflow: hidden;
}

.cell::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.5s, background-color 0.5s;
}

.cell--no-visibility::before {
  content: '❔';
  background-color: inherit;
}

.cell--solved {
  opacity: 0.5;
}

.cell--solved::before {
  background-color: var(--black);
  opacity: 0.2;
}

.cell:hover {
  transform: scale(1.06);
}

.cell:active {
  transform: scale(1.1);
}
</style>
