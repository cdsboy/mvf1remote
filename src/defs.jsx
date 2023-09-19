import { THIRDS } from "./screens.js";

export const OBC_TYPE = "OBC";
export const ADDITIONAL_TYPE = "ADDITIONAL";
export const STREAM_TYPES = [OBC_TYPE, ADDITIONAL_TYPE];
// Title is either the 3 character driver tla OR one of:
export const ADDITIONAL_STREAMS = {
  INTERNATIONAL: "International",
  "F1 lIVE": "F1 Live",
  DATA: "Data Feed",
  TRACKER: "Map",
};
//
// type is either OBC (on board camera) or ADDITIONAL
export const DEFAULT_SCREENS = [
  {
    screenId: 0,
    title: null,
    type: null,
    name: "Main",
    playerId: null,
    driver: null,
    size: {
      rows: 2,
      columns: 2,
    },
    position: THIRDS.TOP.LEFT,
    selected: false,
  },
  {
    screenId: 1,
    title: null,
    type: null,
    name: "Top Right",
    playerId: null,
    driver: null,
    size: {
      rows: 1,
      columns: 1,
    },
    position: THIRDS.TOP.RIGHT,
    selected: false,
  },
  {
    screenId: 2,
    title: null,
    type: null,
    name: "Center Right",
    playerId: null,
    driver: null,
    size: {
      rows: 1,
      columns: 1,
    },
    position: THIRDS.CENTER.RIGHT,
    selected: false,
  },
  {
    screenId: 3,
    title: null,
    type: null,
    name: "Bottom Left",
    playerId: null,
    driver: null,
    size: {
      rows: 1,
      columns: 1,
    },
    position: THIRDS.BOTTOM.LEFT,
    selected: false,
  },
  {
    screenId: 4,
    title: null,
    type: null,
    name: "Bottom Center",
    playerId: null,
    driver: null,
    size: {
      rows: 1,
      columns: 1,
    },
    position: THIRDS.BOTTOM.CENTER,
    selected: false,
  },
  {
    screenId: 5,
    title: null,
    type: null,
    name: "Bottom Right",
    playerId: null,
    driver: null,
    size: {
      rows: 1,
      columns: 1,
    },
    position: THIRDS.BOTTOM.RIGHT,
    selected: false,
  },
];
