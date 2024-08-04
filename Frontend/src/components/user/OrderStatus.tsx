import {
  getDateAndDay,
  getDateTimeFromTimeStamp,
} from "../../utils/other-utils";

interface Props {
  expeted: [string, string] | null;
  expected_delivery: string | Date | null;
  status: "Placed" | "Delivered" | "Cancelled";
}

const OrderStatus = ({ expected_delivery, expeted, status }: Props) => {
  if (status === "Cancelled" && expected_delivery) {
    return (
      <p className="text-sm text-red-600">
        cancelled on{" "}
        {getDateAndDay(expected_delivery)[0] +
          " " +
          getDateAndDay(expected_delivery)[1]}
      </p>
    );
  }

  return expeted && status === "Placed" ? (
    <p className="text-sm text-sky-600">
      delivery expect on {expeted[0] + " " + expeted[1]}
    </p>
  ) : (
    expected_delivery && (
      <p className="text-sm text-sky-600">
        delivered on{" "}
        {getDateTimeFromTimeStamp(expected_delivery)?.split(",")[0] +
          " at " +
          getDateTimeFromTimeStamp(expected_delivery)?.split(",")[1]}
      </p>
    )
  );
};

export default OrderStatus;
