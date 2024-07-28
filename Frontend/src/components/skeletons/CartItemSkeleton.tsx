const CartItemSkeleton = () => {
  return (
    <div className="relative border-2 animate-pulse  border-gray-200 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <div className="w-full h-80  md:w-44  md:h-44  overflow-clip  bg-gray-400 rounded-lg " />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5  w-full">
          <div className=" bg-gray-400  h-3" />{" "}
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
          <div className="mt-3 bg-gray-400 w-full h-2"></div>
        </div>
        <div className="mt-4 flex justify-between text-sm sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="md:absolute md:bottom-5 md:right-5  flex items-center space-x-4">
            <div className="mt-1 bg-gray-400 w-full h-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
