import { useQuery } from "@apollo/client";

import { DEFAULT_SCREENS } from "./defs.jsx";
import { EVERYTHING_QUERY } from "./queries.jsx";
import { getPlayerDriver } from "./utils.jsx";

export const ProgressBar = ({ currentScreenId }) => {
  const { loading, error, data, refetch } = useQuery(EVERYTHING_QUERY, {
    pollInterval: 500,
  });

  if (loading || error) {
    return;
  }

  const [player, driver] = getPlayerDriver(
    screen,
    data.players,
    data.liveTimingState.DriverList,
  );

  return (
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
      <div
        style={{ width: "30%" }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
      ></div>
    </div>
  );
};
