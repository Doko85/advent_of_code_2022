import { MARKER_DATA } from "src/app/exercises/06 - marker/data";

export function execute_marker() {
  const { index: first_index, marker: first_marker } = startOfPacketMarkerOne();
  const { index: second_index, marker: second_marker } = startOfPacketMarkerTwo();
  console.log(`Start-of-Packet Marker is ${first_marker } and last character index was ${first_index}`);
  console.log(`Start-of-Message Marker is ${second_marker } and last character index was ${second_index}`);

  return { part_one: first_index, part_two: second_index };
}

function startOfPacketMarkerOne() {
  return findMarker(4);
}

function startOfPacketMarkerTwo() {
  return findMarker(14);
}

function findMarker(markerLength: number) {
  let index = 0;
  const group = new Array<string>();
  for (index; index < MARKER_DATA.length; index++) {
    group.push(MARKER_DATA.charAt(index));
    if (group.length > markerLength) {
      group.shift();
    }

    if (group.length === markerLength && new Set(group).size === markerLength) {
      index += 1;
      break;
    }
  }

  return { index, marker: group.join('') };
}