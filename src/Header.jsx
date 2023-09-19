import { useContext } from "react";

import { useQuery } from "@apollo/client";

import { CurrentScreenIdxContext, ScreensContext } from "./contexts.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY } from "./queries.jsx";
import { ClassNames } from "./utils.jsx";
import { getPlayerDriverById } from "./utils.jsx";

const Header = ({ enterScreen }) => {
  const { loading, error, data } = useQuery(EVERYTHING_QUERY);
  const currentScreenIdx = useContext(CurrentScreenIdxContext);
  const screens = useContext(ScreensContext);

  let player, driver;
  if (currentScreenIdx) {
    [player, driver] = getPlayerDriverById(
      screens[currentScreenIdx],
      data.players,
      data.liveTimingState.DriverList,
    );
  }

  return (
    <header className="bg-white border-b shadow">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <h1 className="text-2xl text-black">
            MVF1 Remote{" "}
            {currentScreenIdx !== null
              ? "- " + DEFAULT_SCREENS[currentScreenIdx].name
              : ""}
            {player && !driver && " - " + player.streamData.title}
            {driver && " - " + driver.FullName}
          </h1>
        </div>
        <div
          className={ClassNames(
            currentScreenIdx === null ? "hidden" : "",
            "flex flex-1 justify-end",
          )}
        >
          <a href="#" className="font-bold" onClick={() => enterScreen(null)}>
            <span aria-hidden="true">&larr;</span> Go Back
          </a>
        </div>
      </nav>
    </header>
  );
};
export default Header;
