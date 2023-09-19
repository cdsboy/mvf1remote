import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import {
  EVERYTHING_QUERY,
  SET_PLAYER_ALWAYS_ON_TOP,
  SET_PLAYER_BOUNDS,
  SET_PLAYER_FULLSCREEN,
} from "./queries.jsx";
import { createBounds, getPlayerDriverById } from "./utils.jsx";

export const FullscreenButton = ({ updateFullscreen, children }) => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
  const [fullscreenPlayer, { error: fullscreenError }] = useMutation(
    SET_PLAYER_FULLSCREEN,
  );
  const [setPlayerBounds, { error: boundsError }] =
    useMutation(SET_PLAYER_BOUNDS);
  const [setPlayerAlwaysOnTop, { error: alwaysOnTopError }] = useMutation(
    SET_PLAYER_ALWAYS_ON_TOP,
  );
  const currentScreenIdx = useContext(CurrentScreenIdxContext);
  const screens = useContext(ScreensContext);
  const screen = DEFAULT_SCREENS[currentScreenIdx];

  let player, driver;
  if (currentScreenIdx) {
    [player, driver] = getPlayerDriverById(
      screens[currentScreenIdx],
      data.players,
      data.liveTimingState.DriverList,
    );
  }

  function fullscreen() {
    for (let playerIdx in data.players) {
      if (data.players[playerIdx].fullscreen) {
        player = data.players[playerIdx];
        setPlayerBounds({
          variables: {
            playerSetBoundsId: player.id,
            bounds: createBounds(screen),
          },
        });
        break;
      }
    }

    if (player) {
      fullscreenPlayer({
        variables: {
          playerSetFullscreenId: player.id,
          fullscreen: !player.fullscreen,
        },
      });

      setPlayerAlwaysOnTop({
        variables: {
          playerSetAlwaysOnTopId: player.id,
          alwaysOnTop: !player.fullscreen,
        },
      });

      if (!player.fullscreen) {
        updateFullscreen(currentScreenIdx, player.id);
      } else {
        updateFullscreen(null, null);
      }
    }
  }

  return (
    <li
      className="flex rounded-md shadow-sm bg-white hover:bg-gray-50"
      onClick={() => fullscreen()}
    >
      {children}
    </li>
  );
};
