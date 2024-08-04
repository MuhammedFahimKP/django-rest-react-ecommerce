import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Navbar from "../../components/user/Navbar";
import Magnfier from "./Magnifier";
import apiClient, { ApiClientError } from "../../services/api-client";
import { useParams } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import NotFound from "../../components/NotFound";
import DelayComponent from "../../components/DelayComponent";
import { TbHeartPlus } from "react-icons/tb";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import toast from "react-hot-toast";
import ErrorAlert from "../../ui/alerts/ErrorAlert";
import NetworkErrorAlert from "../../ui/alerts/NetworkErrorAlert";
interface Variant {
  id: string;
  img: {
    id: string;
    img_id: string;
    img_1: string;
    img_2: string;
    img_3: string;
  };

  color: string;
  size: string;
  stock: number;
  price: string;
}

interface Product {
  id: string;
  created: string;
  updated: string;
  name: string;
  slug: string;
  img: string;
  discription: string;
  categoery: string;
  brand: string;
}

interface SingleProductResponse extends Product {
  colors: string[] | [];
  variants: Variant[] | [];
}

const SingleProduct = () => {
  const { slug } = useParams();

  const location = useLocation();

  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [varaints, setVariants] = useState<Variant[] | null>(null);
  const [colors, setColors] = useState<string[] | []>([]);
  const [sizes, setSizes] = useState<string[] | []>([]);

  const [colorChanged, setColorsChanged] = useState(false);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [activeImg, setActiveImage] = useState("");

  const getParams = () => {
    if (location.state?.color && currentColor === null) {
      return {
        color: location.state?.color,
      };
    } else if (currentColor !== null) {
      return {
        color: currentColor,
      };
    }

    return {};
  };

  const handleWishListItem = () => {
    apiClient
      .post("shop/wishlist/", { product: varaints?.[currentVariantIndex].id })
      .then((res) =>
        toast.custom((t) => (
          <SuccessAlert toast={t} successText="Item Added To Wishlist" />
        ))
      )
      .catch((err) => {
        if (err?.message === "Network Error") {
          toast.custom((t) => <NetworkErrorAlert toast={t} />);
        }

        if (err?.response?.status === 409) {
          toast.custom((t) => (
            <ErrorAlert toast={t} errorText={"Item Already in WishList"} />
          ));
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setColorsChanged(false);
    apiClient
      .get<SingleProductResponse>(`shop/single/${slug}/`, {
        params: getParams(),
        signal: controller.signal,
      })
      .then((res) => {
        console.log(res);
        res.data.variants.length !== 0 &&
          (() => {
            setVariants(res.data.variants);
            setColors(res.data.colors);
            setActiveImage(res.data.variants[0].img.img_1);
            sizes.length === 0 &&
              res.data.variants.map((item: Variant) => {
                setSizes((prev) => [...prev, item.size]);
              });
            setCurrentColor(res.data.variants[0].color);
          })();
        product === null &&
          setProduct({
            brand: res.data.brand,
            categoery: res.data.categoery,
            created: res.data.created,
            discription: res.data.discription,
            id: res.data.id,
            img: res.data.img,
            name: res.data.name,
            slug: res.data.slug,
            updated: res.data.updated,
          });

        console.log(varaints);
        console.log(sizes);
        console.log(currentVariantIndex);
        console.log(res.data.variants);
      })

      .catch((err) => {});

    return () => controller.abort();
  }, [colorChanged === true && colorChanged]);

  const [cart, setCart] = useState(false);

  const [error, setError] = useState<null | string>(null);

  return error === "NOT Found" || varaints?.length === 0 ? (
    <DelayComponent delay={1000}>
      <NotFound />
    </DelayComponent>
  ) : (
    <>
      <div className="lg:h-[72px] h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => setCart(!cart)} />
      </div>

      <div className="max-w-7xl mx-auto lg:p-8">
        <div className="flex flex-col   justify-between lg:flex-row gap-16 lg:items-center ">
          <div className="flex flex-col gap-6 ">
            {activeImg != "" && (
              <Magnfier
                classes="w-[400px] h-[500px]   object-fill bg-clip-border rounded-xl"
                src={activeImg}
              />
            )}
            <div className="flex flex-row justify-center gap-9  h-24 px-auto">
              <img
                src={
                  varaints && varaints.length != 0
                    ? varaints[currentVariantIndex]?.img?.img_1
                    : ""
                }
                alt=""
                className="w-20 h-24 rounded-md cursor-pointer"
                onClick={() =>
                  varaints &&
                  varaints.length !== 0 &&
                  setActiveImage(varaints[currentVariantIndex]?.img?.img_1)
                }
              />
              <img
                src={
                  varaints && varaints.length != 0
                    ? varaints[currentVariantIndex]?.img?.img_2
                    : ""
                }
                alt=""
                className="w-20 h-24 rounded-md cursor-pointer"
                onClick={() =>
                  varaints &&
                  varaints.length !== 0 &&
                  setActiveImage(varaints[currentVariantIndex]?.img?.img_2)
                }
              />
              <img
                src={
                  varaints && varaints.length != 0
                    ? varaints[currentVariantIndex]?.img?.img_3
                    : ""
                }
                alt=""
                className="w-20 h-24 rounded-md cursor-pointer"
                onClick={() =>
                  varaints &&
                  varaints.length !== 0 &&
                  setActiveImage(varaints[currentVariantIndex]?.img?.img_3)
                }
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4 p-8 ">
            <div>
              <span className=" text-purple-500-600 font-semibold">
                {product && product.brand}
              </span>
              <h1 className="text-3xl font-bold">{product && product.name}</h1>
            </div>
            <p className="text-gray-700">{product && product.discription}</p>

            <div className="flex flex-col  gap-2">
              {/* <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev - 1)}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-purple-700 text-white font-semibold py-3 px-16 rounded-xl h-full">
              Add to Cart
            </button> */}

              <div className="flex items-center  justify-center lg:justify-normal">
                {colors.map((clr: string) => (
                  <div
                    className={
                      `${currentColor === clr ? "border-2 border-black" : ""}` +
                      " " +
                      "size-9 rounded-md flex items-center justify-center"
                    }
                  >
                    <div
                      className="size-7 rounded-md "
                      onClick={() => {
                        setCurrentColor(clr);
                        setColorsChanged(true);
                        setSizes([]);
                      }}
                      style={{
                        backgroundColor: `${clr}`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center lg:justify-normal  gap-2">
                {sizes.map((size: string) => (
                  <button
                    value={size}
                    className={
                      "font-bebas  rounded-md  px-4 py-2  " +
                      `${
                        varaints &&
                        varaints.length != 0 &&
                        varaints[currentVariantIndex].size === size
                          ? "text-white bg-black"
                          : `bg-gray-200 text-black`
                      } `
                    }
                    onClick={() => {
                      varaints &&
                        varaints.map((item: Variant, index) => {
                          if (item.size === size) {
                            setCurrentVariantIndex(index);
                          }
                          return index;
                        });
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <h6 className="text-xl text-center font-semibold flex flex-row items-center  justify-center lg:justify-start ">
                <FaIndianRupeeSign />
                {varaints &&
                  varaints.length > 0 &&
                  varaints[currentVariantIndex]?.price}
              </h6>

              <div className="flex gap-2">
                <button
                  className="w-full text-white  font-bebas py-2 bg-black rounded-md gap-1 "
                  onClick={() => {
                    varaints &&
                      varaints.length > 0 &&
                      apiClient
                        .post("shop/cart/", {
                          product: varaints[currentVariantIndex]?.id,
                          quantity: 1,
                        })
                        .then((res) => {
                          toast.custom((t) => (
                            <SuccessAlert
                              toast={t}
                              successText="Item Added To Cart"
                            />
                          ));
                        })
                        .catch((err) => {
                          if (err?.message === "Network Error") {
                            toast.custom((t) => (
                              <NetworkErrorAlert toast={t} />
                            ));
                          }
                        });
                  }}
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleWishListItem}
                  className=" text-black hover:text-red-600 flex items-center justify-center w-32 font-bebas py-2 bg-gray-200 rounded-md "
                >
                  <TbHeartPlus className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
