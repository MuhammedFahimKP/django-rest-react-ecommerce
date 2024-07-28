import { useNavigate } from "react-router-dom";
import type { LatestArrival as Props } from "../../@types";

import { TbHeartPlus } from "react-icons/tb";
import { TiEye } from "react-icons/ti";
import apiClient, { ApiClientErrorType } from "../../services/api-client";

import toast from "react-hot-toast";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import ErrorAlert from "../../ui/alerts/ErrorAlert";
export default function LatestCard({ id, name, img, brand, slug }: Props) {
  const navigate = useNavigate();

  const addToWhishList = async () => {
    try {
      const res = await apiClient.post("shop/wishlist/", {
        product: id,
      });

      if (res.status == 200) {
        toast.custom((t) => (
          <SuccessAlert toast={t} successText="Product Added WishList" />
        ));
      }
    } catch (err) {
      if (err instanceof ApiClientErrorType) {
        if (err.response?.status == 409) {
          toast.custom((t) => (
            <ErrorAlert toast={t} errorText="Product Already in WishList" />
          ));

          return;
        }
      }

      toast.custom((t) => <ErrorAlert toast={t} errorText="Network Down" />);
    }
  };

  return (
    <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 overflow-hidden w-40 md:w-72 rounded-xl group ">
      <div
        style={{
          backgroundImage: `url(${img})`,
        }}
        className="h-44 relative md:h-80 w-40   md:w-72    bg-cover bg-no-repeat group"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0  h-full w-full : ">
          <div className=" invisible h-full w-full  group-hover:visible transition-all duration-1000">
            <div className="backdrop-brightness-50 h-full w-full  flex items-center justify-center ">
              <div className="flex flex-col gap-4 ">
                <button
                  className="bg-white  p-1 md:p-2  text-black rounded-lg hover:text--500  "
                  onClick={() => addToWhishList()}
                >
                  <TbHeartPlus className="size-7  font-bold" />
                </button>
                <button
                  className="bg-white  p-1 md:p-2  text-black rounded-lg hover:text-gray-500  "
                  onClick={() => {
                    navigate(`/single/${slug}/`);
                  }}
                >
                  <TiEye className="size-7  font-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 w-40 md:w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
        <p className="text-sm  md:text-lg font-bold text-black">{name}</p>

        <div className="flex items-center">
          <div className="ml-auto">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
