import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Typography } from "@material-tailwind/react";

import type { AdminOrdersModel } from "../../@types";

interface Props extends AdminOrdersModel {
  classes: string;
}

const OrdersRow = ({
  id,
  classes,
  created,
  user,
  status,
  expected_delivery,
  payment,
  payment_status,
  total_amount,
}: Props) => {
  const [_created, setCreated] = useState<null | string>(null);
  const [_expected_delivery, setExpected_delivery] = useState<null | string>(
    null
  );

  useEffect(() => {
    const getDateTimeFromTimeStamp = (date: string | Date | null) => {
      const newDate = date ? new Date(date) : null;

      return newDate
        ? newDate.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // 24-hour format
          })
        : null;
    };

    created && setCreated(getDateTimeFromTimeStamp(created));
    expected_delivery &&
      setExpected_delivery(getDateTimeFromTimeStamp(expected_delivery));
  }, [created, expected_delivery]);

  const navigate = useNavigate();

  return (
    <tr key={id} onClick={() => navigate(`${id}/`)}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          {/* <Avatar
          placeholder={undefined}
          src={img}
          alt={name}
          size="md"
          className="rounded-none"
        /> */}

          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {id}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {_created &&
            _created?.split(",")[0] + " at " + _created?.split(",")[1]}
        </Typography>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {user}
        </Typography>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {status}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {total_amount}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {payment}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {payment_status}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {_expected_delivery &&
            _expected_delivery?.split(",")[0] +
              " at " +
              _expected_delivery?.split(",")[1]}
        </Typography>
      </td>
    </tr>
  );
};

export default OrdersRow;
