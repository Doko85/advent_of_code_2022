import { execute_calories, CALORIES_DATA } from '../exercises/01 - calories';
import { execute_rock_paper_scissors, ROCK_PAPER_SCISSORS_DATA } from '../exercises/02 - rock paper scissors';
import { execute_rucksack, RUCKSACK_DATA } from '../exercises/03 - rucksack';
import { CLEANUP_DATA, execute_cleanup } from '../exercises/04 - cleanup';
import { CRANES_DATA, execute_cranes } from '../exercises/05 - cranes';
import { execute_marker, MARKER_DATA } from '../exercises/06 - marker';
import { execute_treetop_tree_house, TREETOP_TREE_HOUSE_DATA } from '../exercises/08 - treetop tree house';
import { Exercise } from '../models/exercise.interface';

export const EXERCISES: { [key: string]: Exercise } = {
  1: { data: CALORIES_DATA, solution: () => execute_calories() },
  2: { data: ROCK_PAPER_SCISSORS_DATA, solution: () => execute_rock_paper_scissors() },
  3: { data: RUCKSACK_DATA, solution: () => execute_rucksack() },
  4: { data: CLEANUP_DATA, solution: () => execute_cleanup() },
  5: { data: CRANES_DATA, solution: () => execute_cranes() },
  6: { data: MARKER_DATA, solution: () => execute_marker() },
  7: { data: undefined, solution: () => ({ part_one: '', part_two: '' }) },
  8: { data: TREETOP_TREE_HOUSE_DATA, solution: () => execute_treetop_tree_house() },
  9: { data: undefined, solution: () => ({ part_one: '', part_two: '' }) },
};
