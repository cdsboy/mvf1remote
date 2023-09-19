import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { CREATE_PLAYER, DELETE_PLAYER, EVERYTHING_QUERY } from "./queries.jsx";
import { ClassNames, createBounds, getPlayerDriverById } from "./utils.jsx";

export const ScreenButton = ({ streamTitle, classOverride, children }) => {
  const { loading, error, data } = useQuery(EVERYTHING_QUERY);
  const [
    createPlayer,
    {
      data: playerdata,
      loading: playerLoading,
      error: playerError,
      reset: playerReset,
    },
  ] = useMutation(CREATE_PLAYER);
  const [deletePlayer, { error: deletedError }] = useMutation(DELETE_PLAYER);
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

  function changeScreen() {
    // If there is a stream currently playing on the screen, delete it
    if (player) {
      deletePlayer({
        variables: {
          playerDeleteId: player.id,
        },
      });
    }

    createPlayer({
      variables: {
        input: {
          maintainAspectRatio: true,
          contentId: data.players[0].streamData.contentId,
          streamTitle: streamTitle,
          bounds: createBounds(screen),
        },
      },
    });
  }

  return (
    <li
      className={ClassNames(
        classOverride ? classOverride : "",
        "flex rounded-md shadow-sm bg-white hover:bg-gray-50",
      )}
      onClick={() => changeScreen()}
    >
      {children}
    </li>
  );
};
