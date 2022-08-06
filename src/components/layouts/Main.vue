<template>
  <div>
    <Board />
    <template v-if="isFirstTime">
      <Modal
        title="Set Difficulty"
        :items="difficultyItems"
        itemsType="singleHandler"
      />
    </template>
    <template v-if="isGameWon || isGameLost">
      <Modal
        :title="isGameWon ? 'Game Won' : 'Game Lost'"
        :items="gameWonItems"
        itemsType="singleHandler"
      />
    </template>
  </div>
</template>

<script lang="ts">
import type { Difficulty } from '@/types';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import Board from '../ui/Board/Board.vue';
import Modal from '../ui/Modal.vue';

export default defineComponent({
  name: 'Main',
  components: { Board, Modal },
  data() {
    return { nar: 'red' };
  },
  methods: {
    ...mapActions(['createNewGame', 'setDifficulty']),
  },
  computed: {
    ...mapState(['isFirstTime', 'playerLives', 'isGameWon', 'isGameLost']),
    difficultyItems() {
      return {
        text: ['Easy', 'Medium', 'Hard'],
        handler: (difficulty: Difficulty) => {
          this.setDifficulty({ value: difficulty });
          this.createNewGame();
        },
      };
    },
    gameWonItems() {
      return {
        text: ['Restart'],
        handler: () => this.createNewGame(),
      };
    },
  },
});
</script>

<style scoped></style>
