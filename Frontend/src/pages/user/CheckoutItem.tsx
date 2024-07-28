import type { CartItem as Props } from "../../@types";

import { getHexFromName } from "../../utils/color";

const CheckoutItem = ({
  id,
  color,
  brand,
  img,
  name,
  price,
  quantity,
  size,
  subtotal,
}: Props) => {
  return (
    <div
      className=" w-full flex flex-col     gap-10 items-center overflow-hidden   bg-white border-2 rounded-lg p-4 "
      id={"checkout-item-" + id}
    >
      <img
        src={img}
        className="w-full lg:h-96  h-80   object-scale-down    md:object-fill rounded-lg overflow-hidden "
        alt={name}
      />
      <div className="flex  flex-col">
        <div className="flex ">
          <p>{name}</p>
        </div>
        <div>
          <p>{brand}</p>
        </div>
        <div className="flex items-center gap-4 ">
          <p>{size}</p>
          <div
            className="size-4 rounded-md"
            style={{
              backgroundColor: getHexFromName(color),
            }}
          />
        </div>

        <div className="flex items-center gap-4  ">
          <p>
            {price} x {quantity}
          </p>

          <p>{subtotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
