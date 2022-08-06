export type VoidFunction = () => void;

export type VoidFunctionWithParams<T> = (val: T) => void;

export type Content = {
  id: number;
  value: string;
  isVisible: boolean;
  isSolved: boolean;
  index: number;
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
