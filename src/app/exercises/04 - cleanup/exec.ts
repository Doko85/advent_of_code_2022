import { CLEANUP_DATA } from "src/app/exercises/04 - cleanup/data";
import { numbersInRange } from "src/app/utils/numbers_in_range";

export function execute_cleanup() {
  const part_one = cleanupPartOne();
  const part_two = cleanupPartTwo();
  console.log(`The number of fully included shifts is: ${part_one}`);
  console.log(`The number of overlapping shifts is: ${part_two}`);

  return { part_one, part_two };
}

function cleanupPartOne() {
  return fullyIncludedShifts();
}

function cleanupPartTwo() {
  return overlappingShifts();
}

function fullyIncludedShifts() {
  return CLEANUP_DATA.reduce((includedShifts: number, shifts: Array<string>): number => {
    const [shiftOne, shiftTwo] = shifts;
    const [shiftOneRange, shiftTwoRange] = getShiftRanges(shiftOne, shiftTwo);
    const isFullyIncludedOne = isFullyIncluded(shiftOneRange, shiftTwoRange);
    const isFullyIncludedTwo = isFullyIncluded(shiftTwoRange, shiftOneRange);
    
    if (isFullyIncludedOne || isFullyIncludedTwo) {
      includedShifts++;
    }

    return includedShifts;
  }, 0);
}

function overlappingShifts() {
  return CLEANUP_DATA.reduce((overlappingShifts: number, shifts: Array<string>): number => {
    const [shiftOne, shiftTwo] = shifts;
    const [shiftOneRange, shiftTwoRange] = getShiftRanges(shiftOne, shiftTwo);
    const isOverlappingOne = isOverlapping(shiftOneRange, shiftTwoRange);
    const isOverlappingTwo = isOverlapping(shiftTwoRange, shiftOneRange);

    if (isOverlappingOne || isOverlappingTwo) {
      overlappingShifts++;
    }

    return overlappingShifts;
  }, 0);
}

function getShiftRanges(shiftOne: string, shiftTwo: string): Array<Array<number>> {
  const shiftOneRange = getShiftRange(shiftOne);
  const shiftTwoRange = getShiftRange(shiftTwo);
  return [shiftOneRange, shiftTwoRange];
}

function getShiftRange(shift: string): Array<number> {
  const [start, end] = splitShifts(shift);
  return numbersInRange(Number.parseInt(start), Number.parseInt(end));
}


function splitShifts(shift: string): Array<string> {
  return shift.split('-');
}

function isFullyIncluded(rangeOne: Array<number>, rangeTwo: Array<number>): boolean {
  return rangeOne.every((num: number) => rangeTwo.includes(num));
}

function isOverlapping(rangeOne: Array<number>, rangeTwo: Array<number>): boolean {
  return rangeOne.some((num: number) => rangeTwo.includes(num));
}