import { ClassNames } from "./utils.jsx";

export const IconButton = ({ text, icon, bgColor }) => {
  return (
    <>
      <div
        className={ClassNames(
          bgColor,
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md",
        )}
      >
        {icon}
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200">
        <div className="flex justify-center grow px-4 py-2 text-xl items-center">
          <p className="font-bold text-gray-900">{text}</p>
        </div>
      </div>
    </>
  );
};
