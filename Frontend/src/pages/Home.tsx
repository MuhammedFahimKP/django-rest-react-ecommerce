import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authenticationSlice";

import Carousel from "../components/Carousel";
import LatestArrivals from "../components/LatestArrivals";

import { RootState } from "../store";
import Navbar from "../components/Navbar";
import ScreenContainer from "../ui/ScreenContainer";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import PaginationButtons from "../ui/PaginationButtons";
import Footer from "../components/Footer";

interface LatestArrival {
  name: string;
  img: string;
  brand: string;
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const [latestArrivals, setLatestArrivals] = useState<LatestArrival[] | []>(
    []
  );

  useEffect(() => {
    axios.get("/latestArrivel.json").then((res: AxiosResponse) => {
      setLatestArrivals(res.data);
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };
  console.log(latestArrivals);
  return (
    <ScreenContainer>
      <Navbar />
      <Carousel />

      <div className="flex flex-col  items-center ">
        <div className="grid grid-cols-2   m-4 lg:grid-cols-4 md:grid-cols-2  w-10/12  md:w-8/12  gap-4  p-4">
          {latestArrivals.map((product: LatestArrival, index) => (
            <LatestArrivals
              key={index}
              name={product.name}
              img={product.img}
              brand={product.brand}
            />
          ))}
        </div>
        <PaginationButtons />
      </div>
      <div className=" flex w-full justify-between items-center"></div>
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
      <Footer />
    </ScreenContainer>
  );
};

export default Home;
