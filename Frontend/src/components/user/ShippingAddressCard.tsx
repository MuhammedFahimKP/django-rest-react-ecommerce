import { ShippingAddress } from "../../@types";

interface Props extends ShippingAddress {
  onSelecting: (id: string) => void;
  selected: string;
}

const ShippingAddressCard = ({
  id,
  alter_phone_no,
  selected,
  city,
  landmark,
  phone_no,
  pin_code,
  place,
  state,
  onSelecting,
}: Props) => {
  return (
    <div
      className="flex items-start rounded-lg border-2 border-gray-200 shadow-lg p-4"
      onClick={() => onSelecting(id)}
    >
      <div className="mt-1 flex-shrink-0">
        {id === selected && (
          <div className="size-4 rounded-full bg-light-green-400" />
        )}
      </div>
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

export default ShippingAddressCard;
