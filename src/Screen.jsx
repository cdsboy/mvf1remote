import { useContext } from "react";

import { useQuery } from "@apollo/client";

import {
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
  MapIcon,
} from "@heroicons/react/20/solid";

import { DriverButton } from "./DriverButton.jsx";
import { FullscreenButton } from "./FullscreenButton.jsx";
import { IconButton } from "./IconButton.jsx";
import { MediaControls } from "./MediaControls.jsx";
import { MuteButton } from "./MuteButton.jsx";
import { ScreenButton } from "./ScreenButton.jsx";
import { SyncButton } from "./SyncButton.jsx";
import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY } from "./queries.jsx";
import { getPlayerDriverById } from "./utils.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Screen = ({ updateFullscreen }) => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
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

  if (loading) {
    return;
  }

  let drivers = Object.values(data.liveTimingState.DriverList);
  drivers.sort(function (a, b) {
    if (a.TeamName > b.TeamName) {
      return 1;
    }
    return -1;
  });

  return (
    <div className="mx-auto content-center lg:max-w-[1080px] p-x-10">
      {player && (
        <>
          <MediaControls />
          <ul role="list" className="pb-5 justify-center flex flex-row gap-x-2">
            <MuteButton key="mute"></MuteButton>
            <SyncButton key="sync">
              <IconButton
                text="Sync"
                bgColor="bg-amber-300"
                icon={<ArrowPathIcon className="h-6 w-6" aria-hidden="true" />}
              />
            </SyncButton>

            <FullscreenButton
              key="fullscreen"
              updateFullscreen={updateFullscreen}
            >
              <IconButton
                text="Fullscreen"
                bgColor="bg-emerald-400"
                icon={
                  <ArrowsPointingOutIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                }
              />
            </FullscreenButton>
          </ul>
        </>
      )}
      <ul role="list" className="justify-center flex flex-row gap-x-2">
        <ScreenButton key="international" streamTitle="INTERNATIONAL">
          <IconButton
            text="International"
            bgColor="bg-green-300"
            icon={<GlobeAltIcon className="h-6 w-6" aria-hidden="true" />}
          />
        </ScreenButton>
        <ScreenButton key="f1live" streamTitle="F1 LIVE">
          <IconButton
            text="F1 Live"
            bgColor="bg-[#e10600]"
            icon={<GlobeAmericasIcon className="h-6 w-6" aria-hidden="true" />}
          />
        </ScreenButton>
        <ScreenButton key="map" streamTitle="TRACKER">
          <IconButton
            text="Map"
            bgColor="bg-blue-300"
            icon={<MapIcon className="h-6 w-6" aria-hidden="true" />}
          />
        </ScreenButton>
      </ul>

      <ul
        role="list"
        className="pt-5 justify-center grid grid-cols-4 gap-2 lg:items-strech max-[1100px]:max-w-[540px] mx-auto"
      >
        {drivers.map((driver) => (
          <ScreenButton
            key={driver.Reference}
            streamTitle={driver.Tla}
            classOverride="max-[1100px]:w-32"
          >
            <DriverButton driver={driver} />
          </ScreenButton>
        ))}
      </ul>
    </div>
  );
};

export default Screen;
