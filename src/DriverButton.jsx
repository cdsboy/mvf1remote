export const DriverButton = ({ driver }) => {
  return (
    <>
      <div
        className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-black text-black"
        style={{ backgroundColor: "#" + driver.TeamColour }}
      >
        {driver.Tla}
      </div>
      <div className="flex w-16 flex-shrink-0 items-center justify-center text-sm font-black border-b border-t border-gray-200 max-[1100px]:rounded-r-md">
        <img src={driver.HeadshotUrl} />
      </div>
      <div className="flex max-[1100px]:grow-0 min-[1100px]:grow min-[1100px]:flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200">
        <div className="flex-1 truncate pr-2 py-2 text-sm max-[1100px]:hidden">
          <p className="font-medium text-gray-900">{driver.FullName}</p>
          <p className="text-gray-500">
            {driver.RacingNumber} - {driver.TeamName}
          </p>
        </div>
      </div>
    </>
  );
};
