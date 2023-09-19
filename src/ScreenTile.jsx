import { useContext } from "react";

import { useQuery } from "@apollo/client";

import {
  GlobeAltIcon,
  GlobeAmericasIcon,
  MapIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { ScreensContext } from "./contexts.jsx";
import { ADDITIONAL_STREAMS, ADDITIONAL_TYPE, OBC_TYPE } from "./defs.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY } from "./queries.jsx";
import { THIRDS } from "./screens.js";
import { ClassNames, getPlayerDriverById } from "./utils.jsx";

export const ScreenTile = ({ screenIdx, enterScreen }) => {
  const { loading, error, data } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });
  const screens = useContext(ScreensContext);
  const screen = DEFAULT_SCREENS[screenIdx];

  let player;
  let driver;
  if (data) {
    [player, driver] = getPlayerDriverById(
      screens[screenIdx],
      data.players,
      data.liveTimingState.DriverList,
    );
  }

  if (player) {
    return (
      <div
        key={"screen-" + screenIdx}
        className={ClassNames(
          screen.position == THIRDS.TOP.LEFT ? "rounded-tl-lg" : "",
          screen.position == THIRDS.TOP.RIGHT ? "rounded-tr-lg" : "",
          screen.position == THIRDS.BOTTOM.LEFT ? "rounded-bl-lg" : "",
          screen.position == THIRDS.BOTTOM.RIGHT ? "rounded-br-lg" : "",
          screen.size.rows === 2 ? "row-span-2" : "",
          screen.size.columns === 2 ? "col-span-2" : "",
          "min-h-[160px]",
          "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
        )}
        onClick={() => enterScreen(screenIdx)}
      >
        <div className="flex content-center">
          {player.type == ADDITIONAL_TYPE && (
            <span
              className={ClassNames(
                player.streamData.title == "INTERNATIONAL"
                  ? "bg-green-300"
                  : "",
                player.streamData.title == "F1 LIVE" ? "bg-[#e10600]" : "",
                player.streamData.title == "TRACKER" ? "bg-blue-300" : "",
                "text-slate-100",
                "inline-flex rounded-lg p-3 ring-4 ring-white",
              )}
            >
              {player.streamData.title == "INTERNATIONAL" && (
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              )}
              {player.streamData.title == "F1 LIVE" && (
                <GlobeAmericasIcon className="h-6 w-6" aria-hidden="true" />
              )}
              {player.streamData.title == "TRACKER" && (
                <MapIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </span>
          )}
          {player.type == OBC_TYPE && (
            <span
              className={ClassNames(
                "text-slate-100",
                "inline-flex rounded-lg p-3 ring-4 ring-white",
              )}
              style={{
                backgroundColor: "#" + driver.TeamColour,
              }}
            >
              <TruckIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {player.type == ADDITIONAL_TYPE &&
              ADDITIONAL_STREAMS[player.streamData.title]}
            {driver && driver.RacingNumber + " - " + driver.FullName}
          </h3>
          <p className="mt-2 text-sm text-gray-500"></p>
        </div>
        <span
          className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
    );
  } else {
    return (
      <div
        key={"screen-" + screenIdx}
        className={ClassNames(
          screen.position == THIRDS.TOP.LEFT ? "rounded-tl-lg" : "",
          screen.position == THIRDS.TOP.RIGHT ? "rounded-tr-lg" : "",
          screen.position == THIRDS.BOTTOM.LEFT ? "rounded-bl-lg" : "",
          screen.position == THIRDS.BOTTOM.RIGHT ? "rounded-br-lg" : "",
          screen.size.rows === 2 ? "row-span-2" : "",
          screen.size.columns === 2 ? "col-span-2" : "",
          "min-h-[160px]",
          "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
        )}
        onClick={() => enterScreen(screenIdx)}
      >
        <div className="flex content-center">
          <span
            className={ClassNames(
              "text-slate-200",
              "inline-flex rounded-lg p-3 ring-4 ring-white",
            )}
          >
            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-base font-semibold leading-6 text-gray-900"></h3>
          <p className="mt-2 text-sm text-gray-500"></p>
        </div>
        <span
          className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
    );
  }
};
