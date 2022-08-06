import _ from 'lodash';

export const shuffleArray = <T>(content: T[], count = 1) => {
  for (count; count < 30; count++) {
    content = _.shuffle(content);
  }

  return content;
};

export const doubleArray = <T>(content: T[]) => {
  return [...content, ...content];
};

export const getRandomArrayElements = <T>(content: T[], limit: number) => {
  const indexesChosen: number[] = [];
  const chosenContent: T[] = [];

  while (chosenContent.length !== limit) {
    const randomIndex = Math.floor(Math.random() * content.length);

    if (indexesChosen.includes(randomIndex)) continue;

    chosenContent[chosenContent.length] = content[randomIndex];
    indexesChosen.push(randomIndex);
  }

  return chosenContent;
};
