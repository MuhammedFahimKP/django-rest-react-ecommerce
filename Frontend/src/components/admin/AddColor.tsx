import { Link } from "react-router-dom";

import { MdOutlineAddCircle } from "react-icons/md";

const AddVaraitonPage = ({ id }: { id: string }) => {
  return (
    <div className="relative  bg-white shadow-lg boder-2 border-gray-600  h-96 w-72 grid  flex-col items-center justify-center overflow-hidden rounded-xl   text-center text-gray-700">
      <Link
        to={`/admin/product/variation/${id}/add/`}
        className={
          "absolute inset-0 m-0 overflow-hidden rounded-none  bg-white " +
          "flex items-center justify-center" +
          " bg-transparent " +
          " bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
        }
      >
        <MdOutlineAddCircle className="size-20 text-gray-500" />
      </Link>
      <div className="relative p-6 px-6 py-14 md:px-12">
        <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"></h5>
      </div>
    </div>
  );
};

export default AddVaraitonPage;
