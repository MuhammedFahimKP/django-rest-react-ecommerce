import { AdminSingleOrderModel } from "../../@types";

interface Props {
  status: AdminSingleOrderModel["status"];
  payment: AdminSingleOrderModel["payment"];
  paymment_status: AdminSingleOrderModel["payment_status"];
  onClick: () => void;
}

const DeliveredBtn = ({ status, payment, paymment_status, onClick }: Props) => {
  if (["Delivered", "Cancelled"].includes(status) === false) {
    if (payment === "RAZOR PAY" && paymment_status === "Pending") {
      return null;
    }
  }

  return (
    <button
      onClick={onClick}
      className={
        "rounded-md py-2 px-4  text-sm leading-7 text-white bg-black max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 "
      }
    >
      Delivered
    </button>
  );
};

export default DeliveredBtn;
