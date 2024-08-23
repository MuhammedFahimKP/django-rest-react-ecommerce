import { useState } from "react";

import { usePaginatedData } from "../../hooks";

import { AdminUserModel } from "../../@types";

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import UserRow from "../../ui/admin/user/UserRow";

import { getAllSearchParams } from "../../utils/other-utils";

const TABLE_HEAD = [
  "name",
  "email",
  "authentication type",
  "status",
  "active",
  "date joined ",
  "last login",
  " ",
];

interface Props {
  filterParams: URLSearchParams;
}
const UsersList = ({ filterParams }: Props) => {
  const [limit] = useState(4);

  const { data, currentPage, next, prev, pages } =
    usePaginatedData<AdminUserModel>(
      "admin/user/",
      8,
      0,
      {
        params: getAllSearchParams(filterParams),
      },
      [filterParams]
    );

  return (
    <div className="cursor-pointer ">
      <Card
        placeholder={undefined}
        className=" overflow-hidden  w-full bg-red-300  rounded-lg "
      >
        <CardBody
          placeholder={undefined}
          className="overflow-scroll px-0 py-0  bg-green-400"
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  {
                    id,
                    auth_type,
                    date_joined,
                    avatar,
                    email,
                    first_name,
                    last_name,
                    is_logedin,
                    last_login,
                    role,
                    is_active,
                    created,
                    updated,
                  }: AdminUserModel,
                  index: number
                ) => {
                  const isLast = index === limit - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <UserRow
                      id={id}
                      key={id}
                      date_joined={date_joined}
                      avatar={avatar}
                      email={email}
                      first_name={first_name}
                      is_logedin={is_logedin}
                      last_login={last_login}
                      last_name={last_name}
                      role={role}
                      auth_type={auth_type}
                      is_active={is_active}
                      created={created}
                      updated={updated}
                      classes={classes}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={undefined}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        >
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            Page {pages > 0 ? currentPage : 0} of {pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              placeholder={undefined}
              variant="outlined"
              size="sm"
              onClick={() => currentPage > 1 && prev()}
            >
              Previous
            </Button>
            <Button
              placeholder={undefined}
              variant="outlined"
              size="sm"
              onClick={next}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersList;
