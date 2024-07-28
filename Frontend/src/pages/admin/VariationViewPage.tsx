import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import { SizeVariation } from "../../@types";
import { getVariation } from "../../slices/admin/producVarationSlice";

import SizeCard from "../../ui/admin/SizeCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispact, RootState } from "../../store";
import AddSize from "../../ui/admin/AddSizeCard";

const VariationViewPage = () => {
  const { varid } = useParams();

  const dispatch = useDispatch<AppDispact>();
  const variation = useSelector(
    (state: RootState) => state.adminProductVariationSlice
  );
  const sizes = variation.size_varations;
  const id = varid ? varid : "";

  useEffect(() => {
    dispatch(getVariation(id));
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <form className="flex flex-col lg:flex-row lg:items-center gap-6  ">
        <div className=" overflow-hidden flex-1 ">
          <img
            src={variation.img_2}
            className="rounded-lg object-cover object-top w-full bg-clip aspect-square"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            <img
              alt="Product Thumbnail"
              className="rounded-lg object-cover bg-clip w-full aspect-auto"
              height="200"
              src={variation.img_1}
              width="200"
            />
            <img
              alt="Product Thumbnail"
              className="rounded-lg object-cover bg-clip w-full aspect-auto"
              height="200"
              src={variation.img_3}
              width="200"
            />
          </div>
        </div>

        <div className="lg:px-20 flex-1">
          <div className="border border-slate-200 px-4 py-8  rounded-lg">
            <div>
              <label
                htmlFor="name"
                className="lg:text-lg black text-xs pl-2 text-slate-500"
              >
                Color
              </label>
              <input
                disabled
                className="lg:text-lg font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                name="name"
                type="text"
                value={variation.color}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="name"
                className="lg:text-lg black text-xs pl-2 text-slate-500"
              >
                Size Variation
              </label>

              <div className="mt-10">
                <AddSize />
                {sizes.map((item: SizeVariation) => (
                  <SizeCard
                    id={item.id}
                    price={item.price}
                    size={item.size}
                    stock={item.stock}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="mt-20">
        <h1 className="text-2xl font-roboto">Size Variations</h1>
        <div className="mt-10">
          <AddSize />
          {sizes.map((item: SizeVariation) => (
            <SizeCard
              id={item.id}
              price={item.price}
              size={item.size}
              stock={item.stock}
              key={item.id}
            />
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default VariationViewPage;
