import { useData } from "../../hooks";

import type { ShippingAddress } from "../../types";

// import { makeArrayFromRange } from "../../utils/other-utils";

import ShippingAddressCard from "./ShippingAddressCard";
import ShippingAddressCreateForm from "./ShippingAddressCreateForm";

const ShippingAdressContainer = () => {
  // const newArr = makeArrayFromRange(2);
  const { data } = useData<ShippingAddress>("users/shipping-address/");

  return (
    <div className="flex items-center justify-center gap-8 ">
      {data.map((_, index) => (
        <ShippingAddressCard key={index} />
      ))}
      <ShippingAddressCreateForm />
    </div>
  );
};

export default ShippingAdressContainer;
