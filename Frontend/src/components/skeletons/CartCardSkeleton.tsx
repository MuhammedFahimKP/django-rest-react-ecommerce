const CartCardSkeleton = () => {
  return (
    <div className="my-1 h-44    border rounded-md pr-4 ">
      <div
        className="flex  h-full w-full animate-pulse delay-2000
      "
      >
        <div className="h-full w-[130px] flex-shrink-0 overflow-hidden rounded-l-md  bg-gray-400"></div>

        <div className="ml-4 flex  flex-col mt-5 overflow-hidden ">
          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm "></div>
          <div
            className="mt-2
         bg-gray-400 h-2 w-64 rounded-sm "
          ></div>
          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm " />

          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm " />
          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm " />

          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm " />
          <div className="mt-2 bg-gray-400 h-2 w-64 rounded-sm " />
        </div>
      </div>
    </div>
  );
};

export default CartCardSkeleton;
