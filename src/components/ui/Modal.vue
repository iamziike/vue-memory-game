<template>
  <div class="overlay" @click="exitHandler"></div>
  <div class="modal">
    <div class="modal-header">
      <h1>{{ title }}</h1>
      <Icon
        v-if="exitHandler"
        @click="exitHandler"
        class="exit-icon"
        type="exit"
      />
    </div>
    <ul v-if="itemsType === 'multiHandler'" class="modal-content">
      <li v-for="item in items" :key="item.text" @click="item.handler">
        {{ item.text }}
      </li>
    </ul>
    <ul v-if="itemsType === 'singleHandler'" class="modal-content">
      <li v-for="text in items.text" :key="text" @click="items.handler(text)">
        {{ text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import Icon from './Icon.vue';
import type { VoidFunction, VoidFunctionWithParams } from '@/types';

export default defineComponent({
  name: 'Modal',
  props: {
    itemsType: String as PropType<'multiHandler' | 'singleHandler'>,
    title: {
      type: String,
    },
    items: {
      type: Object as PropType<
        | { text: string; handler: VoidFunction }
        | {
            text: string[];
            handler: VoidFunctionWithParams<string> | VoidFunction;
          }
      >,
    },
    exitHandler: {
      required: false,
    },
  },
  components: { Icon },
});
</script>

<style scoped>
.overlay,
.modal {
  z-index: 100;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black);
  opacity: 0.7;
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  min-height: 50%;
  width: 70%;
  background-color: var(--white);
  top: 15%;
  left: 15%;
  border-radius: 20px;
  box-shadow: 0 2px 3px 0.5px var(--black);
  overflow: hidden;
}

.modal-header {
  position: relative;
  padding: var(--xsm);
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  flex: 0;
}

.exit-icon {
  position: absolute;
  right: 2%;
  top: 30%;
  transform: scale(1.5);
}

.exit-icon:active {
  transform: scale(1.8);
}

.modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--sm);
  font-size: 2rem;
  background: var(--grey);
  padding: var(--sm);
}

.modal-content > * {
  text-align: center;
  transition: transform 0.5s;
}

.modal-content > *:hover {
  transform: scale(1.2);
}
</style>
