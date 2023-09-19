import { useMutation, useQuery } from "@apollo/client";

import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY, PAUSE_PLAYER } from "./queries.jsx";
import { getPlayerDriver } from "./utils.jsx";

export const PauseAllButton = () => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
  const [pausePlayer, { error: pauseError }] = useMutation(PAUSE_PLAYER);

  let paused = false;
  if (data) {
    for (let playerIdx in data.players) {
      if (data.players[playerIdx].state.paused) {
        paused = true;
        break;
      }
    }
  }

  function pauseAll() {
    for (let playerIdx in data.players) {
      pausePlayer({
        variables: {
          playerSetPausedId: data.players[playerIdx].id,
          paused: !paused,
        },
      });
    }
  }

  if (paused) {
    return (
      <button
        type="button"
        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={() => pauseAll()}
      >
        <PlayIcon className="h-6 w-6" aria-hidden="true" />
        Resume All
      </button>
    );
  }

  return (
    <button
      type="button"
      className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      onClick={() => pauseAll()}
    >
      <PauseIcon className="h-6 w-6" aria-hidden="true" />
      Pause All
    </button>
  );
};
