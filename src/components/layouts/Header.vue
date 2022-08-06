<template>
  <header>
    <div>
      <Icon @click="handleMenuVisibility" type="menu" />
      <ul class="difficulty">
        <Button
          v-for="difficulty in difficulties"
          :key="difficulty"
          @click="handleDifficultyChange(difficulty)"
        >
          {{ difficulty }}
        </Button>
      </ul>
    </div>
    <Lives :livesCount="playerLives" />
    <template v-if="isMenuVisible">
      <Modal
        :exitHandler="handleMenuVisibility"
        title="Menu"
        :items="menuItems"
        itemsType="singleHandler"
      />
    </template>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import Lives from '../ui/Lives.vue';
import Modal from '../ui/Modal.vue';
import Icon from '../ui/Icon.vue';
import Button from '../ui/Button.vue';
import type { Difficulty } from '@/types';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    handleMenuVisibility() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    handleDifficultyChange(value: Difficulty) {
      this.setDifficulty({ value });
      this.createNewGame();
    },
    handleMenuActions(value: 'Restart' | 'Reveal') {
      this.handleMenuVisibility();

      if (value === 'Restart') {
        this.createNewGame();
        return;
      }

      this.setContentsVisibilty({
        value: { contents: this.contents, isVisible: true },
      });

      this.setContentsSolve({
        value: this.contents,
      });
    },
    ...mapActions([
      'createNewGame',
      'setDifficulty',
      'setContentsVisibilty',
      'setContentsSolve',
    ]),
  },
  components: {
    Lives,
    Icon,
    Modal,
    Button,
  },
  computed: {
    ...mapState(['playerLives', 'contents']),
    difficulties() {
      return ['Easy', 'Medium', 'Hard'];
    },
    menuItems() {
      return {
        text: ['Restart', 'Reveal'],
        handler: (value: 'Restart' | 'Reveal') => this.handleMenuActions(value),
      };
    },
  },
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: var(--black);
  color: var(--white);
  box-shadow: 1px 1px 2px var(--black);
}

header > *:first-child,
.difficulty {
  display: flex;
  gap: var(--sm);
  align-content: center;
}

header > *:first-child {
  gap: var(--md);
}

.difficulty > * {
  display: flex;
  align-items: center;
  background: var(--white);
  padding: 0 var(--xsm);
  font-size: 14px;
  border-radius: var(--xsm);
  color: var(--black);
}
</style>
