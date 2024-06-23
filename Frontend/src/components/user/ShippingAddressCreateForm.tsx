import { useState } from "react";
import { useFormik } from "formik";
import { Schema } from "yup";
import type { ShippingAddress } from "../../types";

import Input from "../../ui/user/Input";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
} from "@material-tailwind/react";

type ShippingAddressFields = keyof ShippingAddress;

const shippingAddressFields: ShippingAddressFields[] = [
  "pin_code",
  "city",
  "state",
  "place",
  "landmark",
  "phone_no",
  "alter_phone_no",
];

const ShippingAddressCreateForm = () => {
  //   const {} = useFormik({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button placeholder={undefined} onClick={handleOpen}>
        Sign In
      </Button>
      <Dialog
        size="xs"
        open={open}
        placeholder={undefined}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              Sign In
            </Typography>
            <div className="bg-red-500">
              {shippingAddressFields.map((address) => (
                <Input
                  label={address}
                  key={address}
                  name={address}
                  onChange={() => console.log(address)}
                  type="text"
                  placeholder={address}
                  value={""}
                  onBlur={() => console.log(address)}
                />
              ))}
            </div>
          </CardBody>
          <CardFooter className="pt-0" placeholder={undefined}>
            <Button
              variant="gradient"
              onClick={handleOpen}
              fullWidth
              placeholder={undefined}
            >
              Sign In
            </Button>
            <Typography
              variant="small"
              placeholder={undefined}
              className="mt-4 flex justify-center"
            >
              Don&apos;t have an account?
              <Typography
                placeholder={undefined}
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ShippingAddressCreateForm;
