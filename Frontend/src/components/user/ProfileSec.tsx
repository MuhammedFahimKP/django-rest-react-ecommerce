import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const ProfileSec = () => {
  const { user } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const navigate = useNavigate();

  return (
    <div className="flex w-64 flex-col items-center rounded-sm bg-white shadow-lg  pb-10 border border-gray-200  p-6 mt-10">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Bonnie image"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {user?.first_name}
      </h5>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {user?.last_name}
      </h5>
      <div className="flex w-full flex-col gap-2   mt-4 md:mt-6">
        <div
          className="w-full bg-black cursor-pointer text-white text-center  rounded-lg"
          onClick={() => navigate("/account/orders/")}
        >
          Orders
        </div>
        <div
          className="w-full bg-black cursor-pointer text-white text-center rounded-lg "
          onClick={() => navigate("/account/profile/")}
        >
          Account
        </div>
        <div
          className="w-full bg-black cursor-pointer text-white text-center rounded-lg "
          onClick={() => navigate("/account/address/")}
        >
          Address
        </div>
      </div>
    </div>
  );
};

export default ProfileSec;
