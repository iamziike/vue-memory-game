import { createStore } from 'vuex';

import { doubleArray, getRandomArrayElements, shuffleArray } from '@/helpers';
import CustomLocalStorage from '@/helpers/CustomLocalStorage';
import type { Content, Difficulty } from './../types/index';
import {
  CONTENTS_DB_KEY,
  DIFFICULTY_DB_KEY,
  IS_FIRST_TIME_DB_KEY,
} from '@/helpers/constants';

type Payload<T> = {
  value: T;
};

const getContents = (count: number): Content[] => {
  const dbContents = <Content[]>CustomLocalStorage.get(CONTENTS_DB_KEY);

  if (dbContents) return dbContents;

  const emojis = [
    '👾',
    '🤖',
    '🐏',
    '🐩',
    '🚈',
    '🛫',
    '🕓',
    '🎡',
    '🗼',
    '📦',
    '🎤',
    '📬',
    '🚕',
    '👩',
    '🕸',
    '✔️',
    '👫',
    '😾',
    '✏️',
    '👱',
    '🎶',
    '✖️',
    '🍾',
    '🚀',
    '🏋',
    '👕',
    '🐚',
    '👓',
  ];

  let contents = getRandomArrayElements(emojis, count);
  contents = doubleArray(contents);
  contents = shuffleArray(contents, 20);

  return contents.map((content, index) => ({
    id: Math.random() * 100,
    value: content,
    isVisible: true,
    isSolved: false,
    index,
  }));
};

const getPlayerData = (difficulty?: Difficulty) => {
  if (!difficulty)
    difficulty =
      <Difficulty>CustomLocalStorage.get(DIFFICULTY_DB_KEY) || 'Easy';

  let playerData = {
    lives: 3,
    uniqueItems: 6,
  };
  if (difficulty === 'Medium') playerData = { lives: 5, uniqueItems: 8 };
  if (difficulty === 'Hard') playerData = { lives: 7, uniqueItems: 10 };

  return { playerData, difficulty };
};

const store = createStore({
  state() {
    const { playerData, difficulty } = getPlayerData();

    let isFirstTime = <boolean>CustomLocalStorage.get(IS_FIRST_TIME_DB_KEY);
    isFirstTime = isFirstTime === null ? true : false;

    return {
      isFirstTime,
      isNewGame: true,
      isGameWon: false,
      isGameLost: false,
      playerLives: isFirstTime ? 0 : playerData.lives,
      difficulty,
      contents: isFirstTime ? [] : getContents(playerData.uniqueItems),
      contentsFocusedOn: [] as Content[],
      solved: 0,
    };
  },
  mutations: {
    mutateDifficulty(state, value: Difficulty) {
      state.difficulty = value;
      CustomLocalStorage.set(DIFFICULTY_DB_KEY, value);
    },
    mutateIsFirstTime(state, value: boolean) {
      state.isFirstTime = value;
      CustomLocalStorage.set(IS_FIRST_TIME_DB_KEY, value);
    },
    mutatePlayerLives(state, value: number) {
      state.playerLives = value;
    },
    mutateContentsSolved(state, value: number) {
      state.solved += value;
    },
  },
  actions: {
    setIsNewGame(context, { value }: Payload<boolean>) {
      const { state } = context;
      state.isNewGame = value;
    },
    setDifficulty(context, { value }: Payload<Difficulty>) {
      context.commit('mutateDifficulty', value);
    },
    createNewGame(context, payload?: Payload<Difficulty>) {
      const { state, dispatch } = context;
      if (state.isFirstTime) context.commit('mutateIsFirstTime', false);
      if (state.isGameLost === true) state.isGameLost = false;
      if (state.isGameWon === true) state.isGameWon = false;
      if (state.solved) state.solved = 0;

      if (payload) dispatch('setDifficulty', { value: payload.value });

      // begin to create new game
      const { playerData } = getPlayerData(state.difficulty);

      state.playerLives = playerData.lives;
      state.contents = getContents(playerData.uniqueItems);

      dispatch('setIsNewGame', { value: true });
    },
    setContentsVisibilty(
      context,
      { value }: Payload<{ contents: Content[]; isVisible: boolean }>
    ) {
      const { state } = context;

      const { contents, isVisible } = value;

      return contents.forEach((content) => {
        const contentIndex = content.index;
        if (state.contents[contentIndex])
          state.contents[contentIndex].isVisible = isVisible;
      });
    },
    setContentVisibilty(
      context,
      payload: Payload<{ content: Content; isVisible: boolean }>
    ) {
      const { state } = context;
      const { content, isVisible } = payload.value;

      if (
        content.isSolved ||
        state.isNewGame ||
        state.contentsFocusedOn.length === 2
      )
        return;

      state.contentsFocusedOn.push(content);

      context.dispatch('setContentsVisibilty', {
        value: {
          contents: [content],
          isVisible: isVisible,
        },
      });

      if (state.contentsFocusedOn.length !== 2) return;

      // check if you saved the same object
      if (state.contentsFocusedOn[0].id === state.contentsFocusedOn[1].id) {
        context.dispatch('setContentsVisibilty', {
          value: {
            contents: [content],
            isVisible: false,
          },
        });
        state.contentsFocusedOn = [];
        return;
      }

      // check if values are equal
      if (
        state.contentsFocusedOn[0].value === state.contentsFocusedOn[1].value
      ) {
        setTimeout(() => {
          context.dispatch('setContentsSolve', {
            value: state.contentsFocusedOn,
          });

          context.commit(
            'mutateContentsSolved',
            state.contentsFocusedOn.length
          );
          state.contentsFocusedOn = [];
        }, 500);
        return;
      }

      if (
        state.contentsFocusedOn[0].value !== state.contentsFocusedOn[1].value
      ) {
        setTimeout(() => {
          context.dispatch('setContentsVisibilty', {
            value: {
              contents: state.contentsFocusedOn,
              isVisible: false,
            },
          });
          context.commit('mutatePlayerLives', state.playerLives - 1);
          state.contentsFocusedOn = [];
        }, 500);
      }
    },
    setContentsSolve(context, { value: contents }: Payload<Content[]>) {
      const { state } = context;

      contents.forEach((content) => {
        state.contents[content.index].isSolved = true;
      });
    },
  },
});

store.subscribe((mutationPayload, state) => {
  const { type, payload } = mutationPayload;

  if (type === 'mutatePlayerLives' && !payload) {
    state.isGameLost = true;
  }

  if (
    type === 'mutateContentsSolved' &&
    state.solved === state.contents.length
  ) {
    state.isGameWon = true;
  }
});

export default store;
