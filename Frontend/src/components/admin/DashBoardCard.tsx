import { ReactElement } from "react";

import type { IconType } from "react-icons/lib";

interface Props {
  icon: ReactElement<IconType>;
  count: string | number;
  title: string;
}

const DashBoardCard = ({ icon, title, count }: Props) => {
  return (
    <div className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-10 justify-between">
      <div>
        <p className="text-gray-500 text-lg font-semibol ">{title}</p>
        <p className="text-lg font-semibold text-gray-800">
          {count}
          {/* <span className="text-green-500 text-lg">+55%</span> */}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-md">
        {icon}
      </div>
    </div>
  );
};

export default DashBoardCard;
