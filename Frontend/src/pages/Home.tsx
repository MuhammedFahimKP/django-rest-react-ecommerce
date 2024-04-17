import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authenticationSlice";

import ShopCard from "../ui/ShopCard";

import { RootState } from "../store";
import Navbar from "../components/Navbar";
import { GrUserAdmin } from "react-icons/gr";
import Dailog from "../ui/Dailog";

import ScreenContainer from "../ui/ScreenContainer";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import PaginationButtons from "../ui/PaginationButtons";
import Footer from "../components/Footer";

import { motion, useScroll } from "framer-motion";

import Hero from "../components/Hero";
import Slider from "../components/Slider";

import Toaster from "../utils/components/Toster";

import CartSec from "../ui/CartSec";

import { dismissCartAlert } from "../store/alertSlice";
import ShopBy from "../components/ShopBy";
import LatestArrivals from "../components/LatestArrivals";

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };

  return (
    <>
      <ScreenContainer>
        <Navbar />

        <div className="px-2 md:px-[3%] lg:px-[3%]  mt-4">
          <Slider />
        </div>
        <Hero />
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
        <Toaster alert={alert}>
          <Dailog
            dismiss={() => dispatch(dismissCartAlert())}
            icon={
              <GrUserAdmin className="mx-auto mb-4 text-gray-400 w-12 h-12" />
            }
            enterLink={{
              text: "signin",
              path: "/signin",
            }}
            exitLink={{
              text: "Not now",
              path: "",
            }}
          >
            Login Required
          </Dailog>
        </Toaster>
        <LatestArrivals />
        <CartSec />

        <Footer />
      </ScreenContainer>
    </>
  );
};

export default Home;
