import { ROCK_PAPER_SCISSORS_DATA } from "./data";

const move_values = new Map<string, number>([
  ["A", 1],
  ["B", 2],
  ["C", 3],
  ["X", 1],
  ["Y", 2],
  ["Z", 3],
]);

const result_value = new Map<string, number>([
  ["LOSS", 0],
  ["DRAW", 3],
  ["WIN", 6],
]);

function rockPaperScissorsPartOne() {
  return calculateFirstTournament();
}

function rockPaperScissorsPartTwo() {
  return calculateSecondTournament();
}

function calculateFirstTournament() {
  return ROCK_PAPER_SCISSORS_DATA.reduce((sum, el) => sum += calculateFirstMatchResult(el), 0);

}

function calculateSecondTournament() {
  return ROCK_PAPER_SCISSORS_DATA.reduce((sum, el) => sum += calculateSecondMatchResult(el), 0);
}

function calculateFirstMatchResult(_data: Array<string>): number {
  return (move_values.get(_data[1]) as number) + calculateFirstOutcome(_data[0], _data[1]); 
}

function calculateSecondMatchResult(_data: Array<string>): number {
  return calculateSecondOutcome(_data[0], _data[1]);
}

function calculateFirstOutcome(opponent_move: string, your_move: string): number {
  let outcome = 0;
  switch(opponent_move) {
    case 'A':
      outcome = your_move === 'X' ? (result_value.get("DRAW") as number) : your_move === 'Y' ? (result_value.get("WIN") as number) : (result_value.get("LOSS") as number);
      break;
    case 'B':
      outcome = your_move === 'X' ? (result_value.get("LOSS") as number) : your_move === 'Y' ? (result_value.get("DRAW") as number) : (result_value.get("WIN") as number);
      break;
    case 'C':
      outcome = your_move === 'X' ? (result_value.get("WIN") as number) : your_move === 'Y' ? (result_value.get("LOSS") as number) : (result_value.get("DRAW") as number);
      break;
  }
  return outcome;
}

function calculateSecondOutcome(opponent_move: string, expected_result: string): number {
  let outcome = 0;
  switch(expected_result) {
    case 'X':
      outcome = (result_value.get('LOSS') as number) + (opponent_move === 'A' ? (move_values.get("Z") as number) : opponent_move === 'B' ? (move_values.get("X") as number) : (move_values.get("Y") as number));
      break;
    case 'Y':
      outcome = (result_value.get('DRAW') as number) + (opponent_move === 'A' ? (move_values.get("X") as number) : opponent_move === 'B' ? (move_values.get("Y") as number) : (move_values.get("Z") as number));
      break;
    case 'Z':
      outcome = (result_value.get('WIN') as number) + (opponent_move === 'A' ? (move_values.get("Y") as number) : opponent_move === 'B' ? (move_values.get("Z") as number) : (move_values.get("X") as number));
      break;
  }
  return outcome;
}

export function execute_rock_paper_scissors() {
  const part_one = rockPaperScissorsPartOne();
  const part_two = rockPaperScissorsPartTwo();
  console.log(`Tournament result with first set of rules is: ${part_one}`);
  console.log(`Tournament result with second set of rules is: ${part_two}`);

  return { part_one, part_two };
}