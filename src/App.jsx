import { useMemo, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import Header from "./Header.jsx";
import Screen from "./Screen.jsx";
import Screens from "./Screens.jsx";
import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY, SET_PLAYER_BOUNDS } from "./queries.jsx";
import { createBounds } from "./utils.jsx";

export const App = () => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const [fullscreenPlayerId, setFullscreenPlayerId] = useState(null);
  const [currentScreenIdx, setCurrentScreenIdx] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [setPlayerBounds, { error: boundsError }] =
    useMutation(SET_PLAYER_BOUNDS);

  function enterScreen(idx) {
    setCurrentScreenIdx(idx);
  }

  let dataPlayers = new Array();
  if (data) {
    for (let streamIdx in data.players) {
      dataPlayers.push({
        id: data.players[streamIdx].id,
        bounds: data.players[streamIdx].bounds,
      });
    }
  }
  const streams = useMemo(
    (players) => {
      const updatedStreams = new Array(DEFAULT_SCREENS.length);
      if (data) {
        for (
          let screenIdx = 0;
          screenIdx < DEFAULT_SCREENS.length;
          screenIdx++
        ) {
          if (fullscreenIdx == screenIdx) {
            // Don't update the fullscreen screen if we have one, so it does not lose reference
            updatedStreams[fullscreenIdx] = fullscreenPlayerId;
            continue;
          }

          let screen = DEFAULT_SCREENS[screenIdx];
          for (let playerIdx in dataPlayers) {
            let playerBounds = dataPlayers[playerIdx].bounds;
            if (
              playerBounds.x == screen.position.X &&
              playerBounds.y == screen.position.Y
            ) {
              updatedStreams[screenIdx] = dataPlayers[playerIdx].id;
              break;
            }
          }
        }
      }

      return updatedStreams;
    },
    [dataPlayers, fullscreenIdx, fullscreenPlayerId],
  );

  if (initialLoad && data) {
    // On initial load, if there is only one player, claim it and move it to 1st screen
    if (data.players.length == 1) {
      let player = data.players[0];
      let bounds = createBounds(DEFAULT_SCREENS[0]);
      if (
        player.bounds.x != bounds.x ||
        player.bounds.y != bounds.y ||
        player.bounds.height != bounds.height ||
        player.bounds.width != bounds.width
      ) {
        setPlayerBounds({
          variables: {
            playerSetBoundsId: player.id,
            bounds: bounds,
          },
        });
      }
    }
    setInitialLoad(false);
    return;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  function updateFullscreen(screenIdx, playerId) {
    setFullscreenIdx(screenIdx);
    setFullscreenPlayerId(playerId);
  }

  return (
    <ScreensContext.Provider value={streams}>
      <CurrentScreenIdxContext.Provider value={currentScreenIdx}>
        <Header enterScreen={enterScreen} />
        <div className="min-h-full">
          <div className="py-10">
            <main>
              {!currentScreenIdx && <Screens enterScreen={enterScreen} />}
              {currentScreenIdx && (
                <Screen updateFullscreen={updateFullscreen} />
              )}
            </main>
          </div>
        </div>
      </CurrentScreenIdxContext.Provider>
    </ScreensContext.Provider>
  );
};
