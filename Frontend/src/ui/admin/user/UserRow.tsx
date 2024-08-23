import { PencilIcon } from "@heroicons/react/24/outline";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";

import { AdminUserModel } from "../../../@types";

import { useNavigate } from "react-router-dom";
import { getDateAndTime } from "../../../utils/other-utils";

interface Props extends AdminUserModel {
  classes: string;
}

const UserRow = ({
  auth_type,
  avatar,
  classes,
  date_joined,
  email,
  first_name,
  id,
  is_active,
  is_logedin,
  last_login,
  last_name,
  role,
}: Props) => {
  const navigate = useNavigate();

  return (
    <tr key={id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          {/* <Avatar
        placeholder={undefined}
        src={img}
        alt={name}
        size="md"
        className="rounded-none"
      /> */}

          <img
            src={avatar}
            alt=""
            className="rounded-md object-cover size-12 mr-5"
          />

          <div className="flex flex-col">
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {first_name + " " + last_name}
            </Typography>
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {role}
            </Typography>
          </div>
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {email}
        </Typography>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {auth_type}
        </Typography>
      </td>

      <td className={classes}>
        <div className="w-max">
          {is_logedin ? (
            <div className="text-white bg-green-500 px-2 rounded-lg">
              Logged
            </div>
          ) : (
            <div className="text-white bg-red-500 px-2 rounded-lg">
              Logged Out{" "}
            </div>
          )}
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          {is_active ? (
            <div className="text-white bg-green-500 px-2 rounded-lg">
              active
            </div>
          ) : (
            <div className="text-white bg-red-500 px-2 rounded-lg">blocked</div>
          )}
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {date_joined && getDateAndTime(date_joined)}
        </Typography>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {last_login && getDateAndTime(last_login)}
        </Typography>
      </td>

      <td className={classes} onClick={() => navigate("view/" + id + "/")}>
        <Tooltip content="Edit Product">
          <IconButton placeholder={undefined} variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default UserRow;
