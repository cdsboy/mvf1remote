import { ADDITIONAL_TYPE, OBC_TYPE } from "./defs.jsx";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screens.js";

export function getPlayerDriver(screen, players, drivers = []) {
  if (!players) {
    players = [];
  }

  let player;
  let driver;
  for (let playerIdx in players) {
    let playerBounds = players[playerIdx].bounds;
    if (
      playerBounds.x == screen.position.X &&
      playerBounds.y == screen.position.Y
    ) {
      player = players[playerIdx];
      break;
    }
  }

  if (player && player.type == OBC_TYPE) {
    for (let driverIdx in drivers) {
      if (drivers[driverIdx].Tla == player.streamData.title) {
        driver = drivers[driverIdx];
        break;
      }
    }
  }

  return [player, driver];
}

export function getPlayerDriverById(playerId, players, drivers = []) {
  if (!playerId) {
    return [null, null];
  }

  let player, driver;
  for (let playerIdx in players) {
    if (players[playerIdx].id == playerId) {
      player = players[playerIdx];
      break;
    }
  }

  if (player && player.type == OBC_TYPE) {
    for (let driverIdx in drivers) {
      if (drivers[driverIdx].Tla == player.streamData.title) {
        driver = drivers[driverIdx];
        break;
      }
    }
  }

  return [player, driver];
}

export function createBounds(screen) {
  return {
    height: (SCREEN_HEIGHT / 3) * screen.size.rows,
    width: (SCREEN_WIDTH / 3) * screen.size.columns,
    x: screen.position.X,
    y: screen.position.Y,
  };
}

export function ClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
