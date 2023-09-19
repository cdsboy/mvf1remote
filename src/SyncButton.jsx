import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY, SYNC_PLAYER } from "./queries.jsx";
import { getPlayerDriverById } from "./utils.jsx";

export const SyncButton = ({ children }) => {
  const { loading, error, data } = useQuery(EVERYTHING_QUERY);
  const [syncPlayer, { error: pauseError }] = useMutation(SYNC_PLAYER);
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

  if (!player) {
    return;
  }

  function sync() {
    if (player) {
      syncPlayer({
        variables: {
          playerSyncId: player.id,
        },
      });
    }
  }

  return (
    <li
      className="flex rounded-md shadow-sm bg-white hover:bg-gray-50"
      onClick={() => sync()}
    >
      {children}
    </li>
  );
};
