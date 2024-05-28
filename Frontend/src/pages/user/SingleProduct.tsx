import { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import Magnfier from "./Magnifier";
import apiClient from "../../services/api-client";
import { useParams } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface VariantResponse {
  id: string;
  img: {
    id: string;
    img_id: string;
    img_1: string;
    img_2: string;
    img_3: string;
  };
  product: {
    id: string;
    name: string;
    brand: string;
    categoery: string;
    discription: string;
    slug: string;
  };

  color: string;
  size: string;
  stock: number;
  price: string;
}

const SingleProduct = () => {
  const { slug } = useParams();

  const [varaints, setVariants] = useState<VariantResponse[] | []>([]);
  const [colors, setColors] = useState<string[] | []>([]);
  const [sizes, setSizes] = useState<string[] | []>([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [activeImg, setActiveImage] = useState("");
  const [cart, setCart] = useState(false);

  useEffect(() => {
    apiClient
      .get<VariantResponse[]>("shop/variations/", {
        params: {
          slug: slug,
          color: currentColor,
        },
      })
      .then((res) => {
        setVariants(res.data);
        setCurrentColor(res.data[0].color);

        const set = new Set<string>();
        const itemSize = new Array<string>();
        res.data.map((item: VariantResponse) => {
          set.add(item.color);
          if (item.color === currentColor) {
            console.log("hai");
            itemSize.push(item.size);
          }
        });

        setColors(Array.from(set));
        setSizes(itemSize);

        setActiveImage(varaints[currentVariantIndex].img.img_1);

        varaints.map((item: VariantResponse) => {});
      })
      .catch((err) => {});
  }, [currentColor]);

  const [amount, setAmount] = useState(1);
  return (
    <>
      <div className="lg:h-[72px] h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => setCart(!cart)} />
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col  justify-between lg:flex-row gap-16 lg:items-center ">
          <div className="flex flex-col gap-6 lg:w-2/4">
            {activeImg != "" && <Magnfier src={activeImg} />}
            <div className="flex flex-row justify-center gap-9  h-24 px-auto">
              <img
                src={
                  varaints.length != 0
                    ? varaints[currentVariantIndex].img?.img_1
                    : ""
                }
                alt=""
                className="w-20 h-24 rounded-md cursor-pointer"
                onClick={() =>
                  setActiveImage(varaints[currentVariantIndex].img?.img_1)
                }
              />
              <img
                src={
                  varaints.length != 0
                    ? varaints[currentVariantIndex].img?.img_2
                    : ""
                }
                alt=""
                className="w-20 h-24    rounded-md cursor-pointer"
                onClick={() =>
                  setActiveImage(varaints[currentVariantIndex].img?.img_2)
                }
              />
              <img
                src={
                  varaints.length != 0
                    ? varaints[currentVariantIndex].img?.img_3
                    : ""
                }
                alt=""
                className="w-20 h-24 rounded-md cursor-pointer"
                onClick={() =>
                  setActiveImage(varaints[currentVariantIndex].img?.img_3)
                }
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4 ">
            <div>
              <span className=" text-purple-500-600 font-semibold">
                {varaints.length > 0 &&
                  varaints[currentVariantIndex].product.brand}
              </span>
              <h1 className="text-3xl font-bold">
                {varaints.length > 0 &&
                  varaints[currentVariantIndex].product?.name}
              </h1>
            </div>
            <p className="text-gray-700">
              {varaints.length > 0 &&
                varaints[currentVariantIndex].product?.discription}
            </p>
            <h6 className="text-2xl font-semibold flex flex-row items-center ">
              <FaIndianRupeeSign />
              {varaints.length > 0 && varaints[currentVariantIndex].price}
            </h6>
            <div className="flex flex-col  gap-12">
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

              <div className="flex items-center ">
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
                      style={{
                        backgroundColor: `${clr}`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center  gap-2">
                {sizes.map((size: string) => (
                  <button
                    value={size}
                    className={
                      "font-bebas bg-black rounded-md  px-4 py-2 text-white " +
                      `${
                        varaints.length != 0 &&
                        varaints[currentVariantIndex].size === size
                          ? `opacity-75`
                          : ""
                      } `
                    }
                    onClick={() => {
                      for (const variant in varaints) {
                        if (varaints[parseInt(variant)].size === size) {
                          setCurrentVariantIndex(parseInt(variant));
                          console.log(varaints[variant].id);
                        }
                      }
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex">
                <button
                  className="w-full text-white text-2xl font-bebas py-4 bg-black rounded-md "
                  onClick={() => {
                    apiClient
                      .post("shop/cart/", {
                        product: varaints[currentVariantIndex].id,
                        quantity: 1,
                      })
                      .then((res) => {
                        alert(res.data);
                      })
                      .catch((err) => {
                        alert(err);
                      });
                  }}
                >
                  Add To Cart
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
