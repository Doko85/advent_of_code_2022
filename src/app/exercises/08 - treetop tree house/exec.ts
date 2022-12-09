import { TREETOP_TREE_HOUSE_DATA, TREETOP_TREE_HOUSE_DATA_SAMPLE } from 'src/app/exercises/08 - treetop tree house/data';

interface AdjacentData {
  top: Array<number>;
  right: Array<number>;
  bottom: Array<number>;
  left: Array<number>;
}

export function execute_treetop_tree_house() {
  const part_one: number = treetopTreeHouseOne();
  console.log(`The number of visible trees from the outside of the grid is: ${part_one}`);
  const part_two: number = treetopTreeHouseTwo();
  console.log(`The perfect score multiplier is: ${part_two}`);

  return { part_one, part_two };
}

function treetopTreeHouseOne(): number {
  return checkHeights();
}

function treetopTreeHouseTwo(): number {
  return findPerfectSpot();
}

function checkHeights(): number {
  // Initializing trees count with the external values' count
  let trees = TREETOP_TREE_HOUSE_DATA.reduce((initCount: number, row: Array<number>, index: number, reference: Array<Array<number>>) => {
    if (index === 0 || index === reference.length - 1) {
      initCount += row.length;
    } else {
      initCount + 2;
    }
    return initCount;
  }, 0);

  TREETOP_TREE_HOUSE_DATA.forEach((row: Array<number>, row_index: number, reference: Array<Array<number>>) => {
    if (row_index !== 0 && row_index !== reference.length - 1) {
      row.forEach((value: number, el_index: number) => {
        const adjacent_data = getAxisValues(row_index, el_index);
        const isVisible = isVisibleFn(adjacent_data, value);
        trees += isVisible ? 1 : 0;
      });
    }
  });

  return trees;
}

function findPerfectSpot(): number {
  let perfect_spot = 0;
  TREETOP_TREE_HOUSE_DATA.forEach((row: Array<number>, row_index: number, reference: Array<Array<number>>) => {
    if (row_index !== 0 && row_index !== reference.length - 1) {
      row.forEach((value: number, el_index: number) => {
        if (el_index !== 0 && el_index !== row.length - 1) {
          const adjacent_data = getAxisValues(row_index, el_index);
          const score = calculateTreeHouseScore(value, adjacent_data);
          
          if (score > perfect_spot) {
            perfect_spot = score;
          }
        }
      });
    }
  });

  return perfect_spot;
}

function getAxisValues(row_index: number, el_index: number): AdjacentData {
  return TREETOP_TREE_HOUSE_DATA.reduce(
    (data: AdjacentData, row: Array<number>, index: number) => {
      if (index !== row_index) {
        if (index < row_index) {
          data.top.push(row.at(el_index)!);
        } else {
          data.bottom.push(row.at(el_index)!);
        }
      } else {
        data.left.push(...row.slice(0, el_index));
        data.right.push(...row.slice(el_index + 1));
      }

      return data;
    },
    { top: [], right: [], bottom: [], left: [] }
  );
}

function isVisibleFn(adjacent_data: AdjacentData, value: number): boolean {
  return Object.entries(adjacent_data).some(([, values]: [key: string, values: Array<number>]) => values.every((val) => val < value));
}

function calculateTreeHouseScore(value: number, adjacent_data: AdjacentData): number {
  return Object.keys(adjacent_data).reduce((score: number, key: string): number => {
    let visible_trees: number = 0;
    switch(key) {
      case 'top':
      case 'left':
        visible_trees = findLowerTrees(value, adjacent_data[key].reverse());
        break;
      case 'right':
      case 'bottom':
        visible_trees = findLowerTrees(value, adjacent_data[key]);
        break;
    }

    score *= (visible_trees || 1);

    return score;
  }, 1);
}

function findLowerTrees(tree_height: number, adjacent_trees: Array<number>): number {
  let count = 0;
  for (let i = 0; i < adjacent_trees.length; i++) {
    if (adjacent_trees[i] < tree_height) {
      count++;
    } else {
      count++;
      break;
    }
  }

  return count;
}