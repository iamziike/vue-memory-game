<template>
  <div class="board">
    <Cell
      class="cell"
      v-for="(content, index) in contents"
      :key="index"
      :content="content"
      :onClick="handleCellClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import Cell from './Cell.vue';
import type { Content } from '@/types';

export default defineComponent({
  components: { Cell },
  name: 'Board',
  data() {
    return {
      timeoutIDs: [] as number[],
    };
  },
  methods: {
    handleCellClick(content: Content) {
      this.setContentVisibilty({ value: { content, isVisible: true } });
    },
    ...mapActions([
      'setContentsVisibilty',
      'setIsNewGame',
      'setContentVisibilty',
    ]),
  },
  computed: {
    ...mapState(['contents', 'isNewGame']),
  },
  watch: {
    isNewGame: {
      handler() {
        if (!this.isNewGame) return;

        this.timeoutIDs.forEach((id) => {
          clearTimeout(id);
        });
        this.timeoutIDs = [];

        const id = setTimeout(() => {
          this.setIsNewGame({ value: false });
          this.setContentsVisibilty({
            value: {
              contents: this.contents,
              isVisible: false,
            },
          });
        }, 2000);

        this.timeoutIDs.push(id);
      },
      immediate: true,
    },
  },
});
</script>

<style scoped>
.board {
  display: grid;
  text-align: center;
  gap: var(--xsm);
  grid-template-columns: repeat(4, 1fr);
  height: 100%;
}
</style>
