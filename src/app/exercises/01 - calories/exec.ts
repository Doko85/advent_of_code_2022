import { CALORIES_DATA } from "./data";
import { sumData } from "../../utils/sum_data";

function caloriesPartOne() {
  return maxLength(CALORIES_DATA);
}

function caloriesPartTwo() {
  const topThree = topThreeLength(CALORIES_DATA);
  return sumData(topThree);
}

function maxLength(_data: Array<Array<number>>): number {
  return _data.reduce((acc, el) => {
    const elSum = sumData(el);
    return elSum > acc ? elSum : acc;
  }, 0);
}

function topThreeLength(_data: Array<Array<number>>) {
  const topThree: Array<number> = new Array<number>();
  return _data
    .map((el) => sumData(el))
    .reduce((acc, el) => {
      acc.sort();

      if (acc.length > 2) {
        if (el > acc[0]) {
          acc[0] = el;
        }
      } else {
        acc.push(el);
      }

      return acc;
    }, topThree);
}

export function execute_calories() {
  const part_one = caloriesPartOne();
  const part_two = caloriesPartTwo();

  console.log(`Max number of checked calories is: ${part_one}`);
  console.log(`The sum of the three highest checked values is: ${part_two}`);

  return { part_one, part_two };
}