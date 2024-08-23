import { useEffect, useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../slices/authenticationSlice";

import { RootState } from "../../store";
import Navbar from "../../components/user/Navbar";

import DashBoard from "../../components/admin/DashBoard";

import ScreenContainer from "../../ui/user/ScreenContainer";

import Footer from "../../components/user/Footer";

import { motion, useScroll } from "framer-motion";

import Slider from "../../components/user/Slider";

import CartSec from "../../components/user/CartSec";

import BottmNavbar from "../../components/user/BottmNavbar";

import SessionTimeOut from "../../components/SessionTimeOut";

import LatestArrivals from "../../components/user/LatestArrivals";
import Category from "../../components/user/Category";

import LoaderWithoutBg from "../../components/user/LoaderWithoutBg";

export const CircleIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.path
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{ pathLength: scrollYProgress }}
    />
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };

  const { user_not } = useSelector((state: RootState) => state.alertSlice);

  useEffect(() => {}, [user_not]);

  const [cartOpen, setCartOpen] = useState(false);

  const onOpenOrClose = () => setCartOpen(!cartOpen);

  alert(user_not);

  return (
    <Fragment>
      <div className="scroller">
        <ScreenContainer>
          <Navbar onOpen={onOpenOrClose} />
          <div className="scrollbar-thumb-black scrollbar-thin scrollbar-track-gray-100  ">
            <Slider />
          </div>
          {/* <Hero /> */}
          {/* <div className=" flex w-full justify-between items-center"></div>
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
          </div> */}
          <Category />
          <LatestArrivals />
          {cartOpen && <CartSec onClose={onOpenOrClose} />}
          <Footer />
          <BottmNavbar />
        </ScreenContainer>
        {user_not && <SessionTimeOut />}
      </div>
      <LoaderWithoutBg />
    </Fragment>
  );
};

export default Home;
