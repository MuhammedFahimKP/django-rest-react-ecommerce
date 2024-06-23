import {
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

import { PencilIcon } from "@heroicons/react/24/outline";

interface Props {
  classes: string;
}

const AdminProductRowSkeleton = ({ classes }: Props) => {
  return (
    <tr className="animate-pulse">
      <td className={classes + " pr-0"}>
        <div className="flex items-center gap-3">
          <div className="rounded-md overflow-hidden delay-2000 relative mr-5  h-16 w-14 bg-gray-300 before:absolute before:bg-shimmer-gradient before:h-20 before:w-14  before:skew-x-[-25deg]  before:animate-shimmer   "></div>
          <div className="flex flex-col items-center justify-normal gap-1">
            <div className="w-28 h-4 bg-gray-300"></div>
            <div className="w-28 h-2 bg-gray-300"></div>
          </div>
        </div>
      </td>

      <td className={classes}>
        <div className="flex flex-col">
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <div className="w-34 h-4 bg-gray-300"></div>
          </Typography>
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {""}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="w-34 h-4 bg-gray-300"></div>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <div className="w-34 h-4 bg-gray-300"></div>
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <div className="w-34 h-4 bg-gray-300"></div>
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-5 h-5 bg-gray-300"></div>
      </td>
    </tr>
  );
};

export default AdminProductRowSkeleton;
