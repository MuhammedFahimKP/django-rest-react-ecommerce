import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authenticationSlice";

import Carousel from "../components/Carousel";

// import useSWR from "swr";
// import { fetcher } from "../services/token-client";
// import { UserModelResponse } from "../types";

// import Hero from "../components/Hero";
import { RootState } from "../store";
import Navbar from "../components/Navbar";
import ScreenContainer from "../ui/ScreenContainer";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(currentUser);
  // const userId = currentUser?.id;
  // const user = useSWR<UserModelResponse>(`users/${userId}/`, fetcher, {
  //   refreshInterval: 1000,
  // });
  // console.log(currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };

  return (
    <ScreenContainer>
      <Navbar />
      <Carousel />
      {/* <Slider /> */}
      {/* <Hero /> */}
      <div className="w-full h-screen">
        <div className="w-full p-6">
          <button
            onClick={handleLogout}
            className="rounded p-2 w-32 bg-red-700 text-white"
          >
            Deconnexion
          </button>
        </div>
        {user ? (
          <div className="w-full h-full text-center items-center">
            <p className="self-center my-auto">Welcome, {user.email}</p>
          </div>
        ) : (
          <p className="text-center items-center">Loading ...</p>
        )}
      </div>
    </ScreenContainer>
  );
};

export default Home;
