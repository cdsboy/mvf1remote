import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";

import { IconButton } from "./IconButton.jsx";
import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY, SET_PLAYER_MUTED } from "./queries.jsx";
import { getPlayerDriverById } from "./utils.jsx";

export const MuteButton = () => {
  const { loading, error, data } = useQuery(EVERYTHING_QUERY);
  const [mutePlayer, { error: muteError }] = useMutation(SET_PLAYER_MUTED);
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

  function mute() {
    if (player) {
      mutePlayer({
        variables: {
          playerSetMutedId: player.id,
          muted: !player.state.muted,
        },
      });
    }
  }

  return (
    <li
      className="flex rounded-md shadow-sm bg-white hover:bg-gray-50"
      onClick={() => mute()}
    >
      <IconButton
        text={player.state.muted ? "Un-Mute" : "Mute"}
        bgColor="bg-indigo-400"
        hoverColor="bg-indigo-600"
        icon={
          player.state.muted ? (
            <SpeakerWaveIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <SpeakerXMarkIcon className="h-6 w-6" aria-hidden="true" />
          )
        }
      />
    </li>
  );
};
