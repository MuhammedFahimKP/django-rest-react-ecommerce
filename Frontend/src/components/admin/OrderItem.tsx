import { OrderItem as Item } from "../../@types";

interface Props {
  item: Item;
}

const OrderItem = ({ item }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
      <div className="img-box max-lg:w-full">
        <img
          src={item.product.img.img_1}
          alt="Premium Watch image"
          className="aspect-square  rounded-2xl bg-cover   w-full lg:max-w-[140px]"
        />
      </div>
      <div className="flex flex-row items-center w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="flex items-center">
            <div className="">
              <h2 className=" text-md leading-8 text-black mb-3">
                {item.product.product.name}
              </h2>
              <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                {item.product.product.brand}
              </p>
              <div className="flex items-center ">
                <p className="text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                  Size:{" "}
                  <span className="text-gray-500">{item.product.color}</span>
                </p>

                <p className="text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200 ">
                  Color:{" "}
                  <span className="text-gray-500">{item.product.color}</span>
                </p>
                <p className=" text-base leading-7 text-black ">
                  Qty: <span className="text-gray-500">{item.quantity}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2">
            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 "></div>
            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
              <div className="flex gap-3 lg:block">
                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                  Price
                </p>
                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                  MRP {item.product.price} x {item.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
