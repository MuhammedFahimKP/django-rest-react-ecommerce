import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/authenticationSlice";

import { RootState } from "../../store";
import Navbar from "../../components/user/Navbar";
import { GrUserAdmin } from "react-icons/gr";
import Dailog from "../../ui/user/Dailog";

import ScreenContainer from "../../ui/user/ScreenContainer";

import Footer from "../../components/user/Footer";

import { motion, useScroll } from "framer-motion";

import Slider from "../../components/user/Slider";

import Toaster from "../../utils/components/Toster";

import CartSec from "../../components/user/CartSec";

import BottmNavbar from "../../components/user/BottmNavbar";

import { dismissCartAlert } from "../../store/alertSlice";

import LatestArrivals from "../../components/user/LatestArrivals";
import Category from "../../components/user/Category";

import { useState } from "react";
import { useData } from "../../hooks";

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

  const alert = useSelector(
    (state: RootState) => state.alertSlice.cartAlert.showAlert
  );

  const user = useSelector(
    (state: RootState) => state.persistedReducer.auth.user
  );

  const { data: Latest } = useData("shop/product-latest/");

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };

  const [cartOpen, setCartOpen] = useState(false);

  const onOpenOrClose = () => setCartOpen(!cartOpen);

  return (
    <>
      <ScreenContainer>
        <Navbar onOpen={onOpenOrClose} />

        <div className="">
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
    </>
  );
};

export default Home;
