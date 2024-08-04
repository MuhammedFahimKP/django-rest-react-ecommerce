import { ShippingAddress as Props } from "../../@types";
import { GoPencil } from "react-icons/go";

const ShippingAddressShow = ({
  alter_phone_no,
  city,
  landmark,
  phone_no,
  pin_code,
  state,
  place,
}: Props) => {
  return (
    <div className="flex relative items-start rounded-lg border-2 border-gray-200 shadow-lg p-4">
      <button className="bg-white absolute right-4 underline text-black text-sm  flex items-center gap-2">
        <GoPencil className=" text-gray-400" /> Edit
      </button>

      <div className="ml-3">
        <p className="font-medium">{place}</p>
        <p className="text-sm text-gray-700">{landmark}</p>
        <p className="text-sm text-gray-700">
          {city}, {state} , {pin_code}
        </p>
        <p className="text-sm text-gray-700">
          {phone_no} , {alter_phone_no}
        </p>
      </div>
    </div>
  );
};

export default ShippingAddressShow;
