import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client";

import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";

import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY, PAUSE_PLAYER, PLAYER_SEEK_TO } from "./queries.jsx";
import { getPlayerDriverById } from "./utils.jsx";

export const MediaControls = () => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
  const [pausePlayer, { error: pauseError }] = useMutation(PAUSE_PLAYER);
  const [playerSeekTo, { error: seekError }] = useMutation(PLAYER_SEEK_TO);
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

  function pause() {
    if (player) {
      pausePlayer({
        variables: {
          playerSetPausedId: player.id,
          paused: !player.state.paused,
        },
      });
      refetch();
    }
  }

  function seek(seekTo) {
    if (player) {
      playerSeekTo({
        variables: {
          playerSeekToId: player.id,
          relative: seekTo,
        },
      });
    }
  }

  if (!player || player.state.live) {
    return;
  }

  return (
    <span className="rounded-md justify-center flex flex-row mx-auto pb-5">
      <span className="shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => {
            seek(-60);
          }}
        >
          <BackwardIcon className="h-6 w-6" aria-hidden="true" />
          1m
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => {
            seek(-10);
          }}
        >
          <BackwardIcon className="h-6 w-6" aria-hidden="true" />
          10s
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => pause()}
        >
          {player.state.paused ? (
            <PlayIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <PauseIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => {
            seek(10);
          }}
        >
          <ForwardIcon className="h-6 w-6" aria-hidden="true" />
          10s
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => {
            seek(60);
          }}
        >
          <ForwardIcon className="h-6 w-6" aria-hidden="true" />
          1m
        </button>
      </span>
    </span>
  );
};
