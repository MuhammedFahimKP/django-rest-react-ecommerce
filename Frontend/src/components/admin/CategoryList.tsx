import { useContext } from "react";

import { usePaginatedData } from "../../hooks";

import ChevronUpDownIcon from "@heroicons/react/24/outline/ChevronUpDownIcon";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { DataAddedContext } from "../../context";

import type { AdminCategory } from "../../@types";

import { getAllSearchParams } from "../../utils/other-utils";
import CategoryRow from "../../ui/admin/category/CategoryRow";

const TABLE_HEAD = ["", "Name", "Created at", "Updated at", "Actions"];

interface Props {
  filteringParams: URLSearchParams;
}

const CategoryList = ({ filteringParams }: Props) => {
  const dataAddedContext = useContext(DataAddedContext);

  const { data, pages, currentPage, next, prev, setData } =
    usePaginatedData<AdminCategory>(
      "admin/categoery/",
      8,
      0,
      { params: getAllSearchParams(filteringParams) },
      [filteringParams, dataAddedContext?.dataAdded]
    );

  const handleDelete = (id: string) => {
    setData((prevData: AdminCategory[]) => {
      const newData = prevData.filter((item: AdminCategory) => item.id !== id);
      return newData;
    });
  };

  return (
    <div className="cursor-pointer min-h-screen">
      <Card placeholder={undefined} className="h-full w-full rounded-none ">
        <CardBody placeholder={undefined} className="overflow-scroll px-0 ">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
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
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(
                (
                  { id, created, updated, img, name, is_active }: AdminCategory,
                  index: number
                ) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <CategoryRow
                      setData={setData}
                      id={id}
                      img={img}
                      handleDelete={(id) => handleDelete(id)}
                      key={id}
                      name={name}
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
          className="flex items-center justify-between  p-4"
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

export default CategoryList;
