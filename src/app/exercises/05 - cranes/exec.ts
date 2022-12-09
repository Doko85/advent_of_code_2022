import { CRANES_DATA } from 'src/app/exercises/05 - cranes/data';

export function execute_cranes() {
  const part_one: string = cranesPartOne();
  console.log(`The accumulated value for last cranes using CrateMover 9000 is: ${part_one}`);
  const part_two: string = cranesPartTwo();
  console.log(`The accumulated value for last cranes using CrateMover 9001 is: ${part_two}`);

  return { part_one, part_two };
}

function cranesPartOne() {
  return cranesGeneral(true);

}

function cranesPartTwo() {
  return cranesGeneral();
}

function cranesGeneral(reverse: boolean = false) {
  const moves = mapMoves();
  return moveCranes(moves, reverse).reduce((result, cranes) => {
    const last_crane: string | undefined = cranes.at(-1);
    if (last_crane) {
      result = result.concat(last_crane);
    }

    return result;
  }, '');
}

function moveCranes(moves: Array<Array<string>>, reverse: boolean) {
  const { data } = structuredClone(CRANES_DATA);
  moves.forEach((entry: Array<string>) => {
    const mapped_entry: Array<number> = entry.map((value) => +value);
    const [count, from, to] = mapped_entry;
    const calculated_from = from - 1;
    const calculated_to = to - 1;
    const {extracted_crates, start_index} = extractCrates(data[calculated_from], count, reverse);
    data[calculated_to].push(...extracted_crates);
    data[calculated_from] = data[calculated_from].slice(0, start_index);
  });

  return data;
}

function extractCrates(data: Array<string>, count: number, reverse: boolean) {
  const start_index = data.findIndex((_crane, index) => index === data.length - count);
  let extracted_crates = data.filter((_crane, index) => index >= start_index);
  
  if (reverse) {
    extracted_crates = extracted_crates.reverse();
  }

  return { extracted_crates, start_index };
}

function mapMoves(): Array<Array<string>> {
  return CRANES_DATA.moves.map((entry) => entry.split(' ').filter((subStr) => !['move', 'from', 'to'].includes(subStr)));
}
