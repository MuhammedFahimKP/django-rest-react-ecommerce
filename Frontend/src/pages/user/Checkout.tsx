import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { checkouted, uncheckouted } from "../../slices/cartSlice";
import { RootState } from "../../store";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import Navbar from "../../components/user/Navbar";

import ShippingAdressContainer from "../../components/user/ShippingAdressContainer";
import IsUserAuthenticated from "../../components/IsUserAuthenticated";

const Checkout = () => {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cartSlice);

  console.log(cart);

  React.useEffect(() => {
    dispatch(checkouted());

    function uncheckout() {
      dispatch(uncheckouted());
    }

    return () => uncheckout();
  }, []);

  return (
    <React.Fragment>
      <div className="lg:h-20  h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => false} />
      </div>
      <div className="w-full place-content-center px-44 py-20 bg-white">
        <Accordion placeholder={undefined} open={alwaysOpen}>
          <AccordionHeader placeholder={undefined} onClick={handleAlwaysOpen}>
            <div className="flex items-center justify-between">
              <h1 className="font-ubuntu ">Shipping Address </h1>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <ShippingAdressContainer />
          </AccordionBody>
        </Accordion>
        <Accordion placeholder={undefined} open={open === 1}>
          <AccordionHeader
            placeholder={undefined}
            onClick={() => handleOpen(1)}
          >
            How to use Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion placeholder={undefined} open={open === 2}>
          <AccordionHeader
            placeholder={undefined}
            onClick={() => handleOpen(2)}
          >
            What can I do with Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export default IsUserAuthenticated(Checkout);
