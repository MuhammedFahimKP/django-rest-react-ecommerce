import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductForm } from "../../types";
import apiClient from "../../services/api-client";
import { FaSave } from "react-icons/fa";
import { ImBin } from "react-icons/im";

import "swiper/css";

function Varations() {
  return (
    <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
      <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
      </div>
      <div className="relative p-6 px-6 py-14 md:px-12">
        <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
          How we design and code open-source projects?
        </h2>
        <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
          Tania Andrew
        </h5>
        <img
          alt="Tania Andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
        />
      </div>
    </div>
  );
}

const ProductViewPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    brand: "",
    categoery: "",
    is_active: false,
    img: "",
  });

  const formike = useFormik({
    initialValues: product,
    onSubmit: (value) => console.log(value),
    enableReinitialize: true,
  });

  useEffect(() => {
    apiClient
      .get(`admin/product/${id}/`)
      .then((res) => {
        setProduct(res.data);
        formike.setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(formike.values);

  const numbers = [1, 2, 3];

  return (
    <>
      <section className="container mx-auto px-4 md:px-6 py-8">
        <form className="flex flex-col lg:flex-row lg:items-center gap-6  ">
          <div className=" overflow-hidden flex-1 ">
            <img
              src={formike.values.img}
              className="rounded-lg object-fill w-full aspect-square"
            />
          </div>

          <div className="lg:px-20 flex-1">
            <div className="border border-slate-200 px-4 py-8  rounded-lg">
              <div>
                <label
                  htmlFor="name"
                  className="lg:text-lg black text-xs pl-2 text-slate-500"
                >
                  Name
                </label>
                <input
                  className="lg:text-lg font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={formike.values.name}
                  name="name"
                  onChange={formike.handleChange}
                  type="text"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="dicription"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Discription
                </label>

                <textarea
                  rows={4}
                  name="dicription"
                  className="block w-full  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value="This is a brief description of the product. It highlights its features and unique selling points."
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="dicription"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Brand
                </label>
                <select className="font-bold mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option className=" appearance-none font-bold mt-1 block w-full py-8 px-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"></option>
                </select>
              </div>

              <div className="mt-3">
                <label
                  htmlFor="dicription"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Categoery
                </label>
                <select className="font-bold mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <option className=" appearance-none font-bold mt-1 block w-full py-8 px-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"></option>
                </select>
              </div>

              <div className="flex items-center mt-4">
                <label
                  htmlFor="disabled-checkbox"
                  className="ms-2 text-sm text-slate-500   mr-4"
                >
                  Activate
                </label>
                <input
                  id="red-checkbox"
                  type="checkbox"
                  value={"false"}
                  className=" text-red-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>

              <div className="flex  items-center gap-2 mt-5">
                <button className="bg-white border flex items-center  justify-center gap-3 border-red-700  rounded-md px-4 py-1 font-bold flex-1 ">
                  <ImBin className="size-4 " />
                  Discard
                </button>
                <button className="bg-black text-white border flex items-center gap-3  justify-center  rounded-md px-4 py-1  flex-1 ">
                  <FaSave className="size-4 " /> Save
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="grid place-content-center py-4 mt-14">
          {numbers.length > 2  ? (<Swiper
            breakpoints={{
              340: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              700: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            className="max-w-full "
          >
            {numbers.map((item: number) => (
              <SwiperSlide key={item}>
                <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                  <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
                  </div>
                  <div className="relative p-6 px-6 py-14 md:px-12">
                    <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                      How we design and code open-source projects?
                    </h2>
                    <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                      Tania Andrew
                    </h5>
                    <img
                      alt="Tania Andrew"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>) : <div>
            {numbers.map((item:number) => )}
          </div> }
        </div>
      </section>
    </>
  );
};

export default ProductViewPage;
