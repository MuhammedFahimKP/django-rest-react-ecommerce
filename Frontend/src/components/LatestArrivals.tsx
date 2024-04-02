interface Props {
  name: string;
  brand: string;
  img: string;
}

const LatestArrivals = ({ name, brand, img }: Props) => {
  return (
    <div className=" w-full flex rounded-lg flex-col relative items-center overflow-hidden shadow-2xl border-1 border-gray-300 justify-center">
      <img className="object-cover rounded-lg" src={img} alt="" />
      <div className="w-full h-2/8  absolute flex flex-col gap-1     bg-white bottom-0 rounded-b-lg font-extrabold font-sans">
        <div className="flex items-center justify-start ">
          <p
            className={
              "bg-red-600  font-thin text-white  text-sm  rounded-r-xl px-2 "
            }
          >
            New
          </p>
        </div>
        <div className="mx-2 ">
          <p className="text-sm truncate ...  overflow-hidden text-center  black-white  ">
            {name}
          </p>
        </div>
        <div className="flex items-center justify-center m-2 mb-4">
          <p
            className={
              "text-blue-500 text-xs  font-thin bg-sky-400/40 rounded-sm px-2 "
            }
          >
            {brand}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestArrivals;
