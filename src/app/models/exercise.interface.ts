export interface Exercise {
  data: unknown;
  solution: () => ExerciseItem;
}

export interface ExerciseItem {
  part_one: number | string;
  part_two: number | string;
}