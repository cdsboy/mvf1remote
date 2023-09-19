import {
  GlobeAltIcon,
  GlobeAmericasIcon,
  MapIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { PauseAllButton } from "./PauseAllButton.jsx";
import { ScreenTile } from "./ScreenTile.jsx";
import { DEFAULT_SCREENS } from "./defs.jsx";

const Screens = ({ enterScreen }) => {
  let tiles = [];
  for (let screenIdx in DEFAULT_SCREENS) {
    tiles.push(
      <ScreenTile
        key={"screen-" + screenIdx}
        screenIdx={screenIdx}
        enterScreen={enterScreen}
      />,
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
            {tiles}
          </div>
        }
        <div className="container mx-auto py-6 content-center flex justify-center">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <PauseAllButton />
          </span>
        </div>
      </div>
    </>
  );
};

export default Screens;
