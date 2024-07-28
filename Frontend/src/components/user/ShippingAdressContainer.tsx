import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useData } from "../../hooks";

import { AppDispact } from "../../store";

import type { ShippingAddress } from "../../@types";

import { addressSelected } from "../../slices/checkoutSlice";

import { makeArrayFromRange } from "../../utils/other-utils";

import { LuPlus } from "react-icons/lu";

import ShippingAddressCreateForm from "./ShippingAddressCreateForm";
import ShippingAddressCard from "./ShippingAddressCard";
import ShippingAddressCardSkeletons from "../skeletons/ShippingAddressCardSkeletons";

import Accordian from "../../ui/user/Accordian";

// import { makeArrayFromRange } from "../../utils/other-utils";

interface Props {
  opener: boolean;
}

const ShippingAdressContainer = ({ opener }: Props) => {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  const sekeletonArray = makeArrayFromRange(4);

  const {
    data,
    setData: setShippingAddress,
    isLoading,
  } = useData<ShippingAddress>("users/shipping-address/", 2000);

  useEffect(() => {
    data.length > 0 && setSelectedShippingAddress(data[0].id);
  }, [data]);

  const dispatch = useDispatch<AppDispact>();

  return (
    <Accordian title="Shipping Address" opener={opener}>
      {data.map((item: ShippingAddress) => (
        <ShippingAddressCard
          id={item.id}
          city={item.city}
          landmark={item.landmark}
          alter_phone_no={item.alter_phone_no}
          phone_no={item.phone_no}
          pin_code={item.pin_code}
          place={item.place}
          state={item.state}
          key={item.id}
          selected={selectedShippingAddress}
          onSelecting={(id: string) => setSelectedShippingAddress(id)}
        />
      ))}

      {!isLoading && (
        <div className="">
          <button
            onClick={() => {
              setShowForm(!showForm);
            }}
            className=" bg-white flex items-center px-4
              gap-2 text-sm  rounded-md py-1  text-md text-black  "
          >
            <LuPlus className="text-gray-400" />
            <p className="cursor-pointer text underline"> Add new Addreess</p>
          </button>
        </div>
      )}

      {isLoading &&
        sekeletonArray.map((_, index) => (
          <ShippingAddressCardSkeletons
            key={`shipping-address-card-sekelton-${index + 1}`}
          />
        ))}

      {data.length > 0 && (
        <div className="pl-2">
          <button
            className="px-4 py-1 border-2 text-sm  text-white bg-black rounded-lg"
            onClick={() => dispatch(addressSelected(selectedShippingAddress))}
          >
            use this address
          </button>
        </div>
      )}

      {showForm && (
        <ShippingAddressCreateForm
          handleOpen={() => setShowForm(!showForm)}
          open={showForm}
          setShippingAddress={setShippingAddress}
        />
      )}
    </Accordian>
  );
};

export default ShippingAdressContainer;
