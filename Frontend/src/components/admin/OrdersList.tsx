import ChevronUpDownIcon from "@heroicons/react/24/outline/ChevronUpDownIcon";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { AdminOrdersModel } from "../../@types";

import OrdersRow from "../../ui/admin/OrdersRow";
import { usePaginatedAdminOrder } from "../../hooks/useOrders";
import { getAllSearchParams } from "../../utils/other-utils";

const TABLE_HEAD = [
  "id",
  "Orderd at",
  "By",
  "Status",
  "total",
  "Payment mod",
  "Payment status",
  "Updated at",
];

interface Props {
  filteringParams: URLSearchParams;
}

const OrdersList = ({ filteringParams }: Props) => {
  const { data, pages, currentPage, next, prev } = usePaginatedAdminOrder(
    8,
    0,
    { params: getAllSearchParams(filteringParams) },
    [filteringParams]
  );
  return (
    <div className="cursor-pointer h-full">
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
              {/* {loading &&
                loadingArray.map((_, index) => (
                  <AdminProductRowSkeleton
                    classes={"p-4"}
                    key={"Admin" + "product" + "skeleton" + index}
                  />
                ))} */}
              {data.map(
                (
                  {
                    id,
                    created,
                    updated,
                    expected_delivery,
                    payment,
                    payment_status,
                    payment_transation_id,
                    status,
                    total_amount,
                    user,
                  }: AdminOrdersModel,
                  index: number
                ) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <OrdersRow
                      id={id}
                      key={id}
                      created={created}
                      user={user}
                      expected_delivery={expected_delivery}
                      payment={payment}
                      payment_status={payment_status}
                      payment_transation_id={payment_transation_id}
                      status={status}
                      total_amount={total_amount}
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

export default OrdersList;
