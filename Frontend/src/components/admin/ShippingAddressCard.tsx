import { ShippingAddress as Props } from "../../@types";

const ShippingAddressCard = ({
  alter_phone_no,
  city,
  landmark,
  phone_no,
  pin_code,
  place,
  state,
}: Props) => {
  return (
    <div className="flex items-start  border-t-[1px]  border-gray-200  p-6">
      <div className="ml-3">
        <h1 className="text-2xl mb-2"> Shipping Address </h1>
        <p className="font-medium">{place}</p>
        <p className="text-md text-gray-700">{landmark}</p>
        <p className="text-md text-gray-700">
          {city}, {state} , {pin_code}
        </p>
        <p className="text-md text-gray-700">
          {phone_no} , {alter_phone_no}
        </p>
      </div>
    </div>
  );
};

export default ShippingAddressCard;
