export const SCREEN_WIDTH = 3840;
export const SCREEN_HEIGHT = 2160;
export const X_OFFSET = -1 * SCREEN_WIDTH;
export const Y_OFFSET = 0;

export const THIRDS = {
  TOP: {
    LEFT: {
      X: 0 + X_OFFSET,
      Y: 0 + Y_OFFSET,
    },
    CENTER: {
      X: SCREEN_WIDTH / 3 + X_OFFSET,
      Y: 0 + Y_OFFSET,
    },
    RIGHT: {
      X: (SCREEN_WIDTH / 3) * 2 + X_OFFSET,
      Y: 0 + Y_OFFSET,
    },
  },
  CENTER: {
    LEFT: {
      X: 0 + X_OFFSET,
      Y: SCREEN_HEIGHT / 3 + Y_OFFSET,
    },
    CENTER: {
      X: SCREEN_WIDTH / 3 + X_OFFSET,
      Y: SCREEN_HEIGHT / 3 + Y_OFFSET,
    },
    RIGHT: {
      X: (SCREEN_WIDTH / 3) * 2 + X_OFFSET,
      Y: SCREEN_HEIGHT / 3 + Y_OFFSET,
    },
  },
  BOTTOM: {
    LEFT: {
      X: 0 + X_OFFSET,
      Y: (SCREEN_HEIGHT / 3) * 2 + Y_OFFSET,
    },
    CENTER: {
      X: SCREEN_WIDTH / 3 + X_OFFSET,
      Y: (SCREEN_HEIGHT / 3) * 2 + Y_OFFSET,
    },
    RIGHT: {
      X: (SCREEN_WIDTH / 3) * 2 + X_OFFSET,
      Y: (SCREEN_HEIGHT / 3) * 2 + Y_OFFSET,
    },
  },
};
