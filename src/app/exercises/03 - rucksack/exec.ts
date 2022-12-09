import { RUCKSACK_DATA } from 'src/app/exercises/03 - rucksack/data';
import { halveWord } from 'src/app/utils/halve_word';

export function execute_rucksack() {
  const part_one: number = rucksackPartOne();
  const part_two: number = rucksackPartTwo();
  console.log(`The sum of priorities of first rucksack data is: ${part_one}`);
  console.log(`The sum of priorities of second rucksack data is: ${part_two}`);

  return { part_one, part_two };
}

function rucksackPartOne(): number {
  return calculateRucksacks();
}

function rucksackPartTwo(): number {
  return calculateBadges();
}

function calculateRucksacks(): number {
  return RUCKSACK_DATA.reduce((sum, word) => sum += calculatePriority(word), 0)
}

function calculateBadges(): number {
  return RUCKSACK_DATA.reduce((acc, word, index) => {
    if (index % 3 === 0) {
      acc.push([word]);
    } else {
      acc = acc.map((arr: Array<string>, i: number) => i === (acc.length - 1) ? [...arr, word] : arr);
    }

    return acc;
  }, new Array<Array<string>>()).reduce((sum, group) => sum += (getPriorityValue(findItemInGroup(group) ?? '')) , 0);
}

/*
 * Lowercase item types a through z have priorities 1 through 26.
 * Uppercase item types A through Z have priorities 27 through 52.
 */
function getPriorityValue(char: string): number {
  const ascii_value: number = char.charCodeAt(0);
  return ascii_value >= 65 && ascii_value <= 90
    ? ascii_value - 38
    : ascii_value - 96;
}

function calculatePriority(rucksack: string): number {
  const splitted_rucksack: Array<string> = halveWord(rucksack);
  const included_in_both_char: string | undefined = splitted_rucksack[0]
    .split('')
    .find((char: string) => splitted_rucksack[1].includes(char));
  return included_in_both_char ? getPriorityValue(included_in_both_char) : 0;
}

function findItemInGroup(group: Array<string>): string | undefined {
  const splitted_groups: Array<Array<string>> = group.map((word: string) => word.split(''));
  return splitted_groups[0].find((char: string) => splitted_groups[1].includes(char) && splitted_groups[2].includes(char));
}