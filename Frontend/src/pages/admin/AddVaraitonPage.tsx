import { useFormik } from "formik";
import * as Yup from "yup";
import { genrateImageUrl } from "../../utils/image";
import ErrorText from "../../ui/user/ErrorText";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import apiClient from "../../services/api-client";

import { Select, Option, Tooltip } from "@material-tailwind/react";

import ImageChange from "../../components/admin/ImageChange";

import { useData } from "../../hooks";
import type { AdminColor, AdminProduct } from "../../types";
import { ImBin } from "react-icons/im";
import { FaSave } from "react-icons/fa";
import NotFound from "../../components/NotFound";
import DelayComponent from "../../components/DelayComponent";

const AddVaraitonPage = () => {
  const { pid } = useParams();

  const [product, setProduct] = useState<AdminProduct>({
    id: "",
    img: "",
    name: "",
    slug: "",
    brand: "",
    created: "",
    updated: "",
    categoery: "",
    is_active: false,
  });

  useEffect(() => {
    apiClient
      .get<AdminProduct>(`admin/product/${pid}/`)
      .then((res) => {
        setProduct({ ...product, ...res.data });
      })
      .catch((err) => err);
  }, []);

  const [images, setImages] = useState([
    "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
    "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
    "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
  ]);
  interface Values {
    img_1: Blob | string;
    img_2: Blob | string;
    img_3: Blob | string;
    color: string;
    product: string;
  }

  const initialValues: Values = {
    color: "",
    img_1: "",
    img_2: "",
    img_3: "",
    product: pid ? pid : "",
  };

  const { data: color } = useData<AdminColor>("admin/color/");

  const formike = useFormik({
    initialValues,
    onSubmit: (values: Values) => console.log(values),
  });

  function handleImg(e: ChangeEvent<HTMLInputElement>, key: 0 | 1 | 2) {
    if (e.target?.files) {
      const img = e.target.files[0];
      setImages((p) => p.splice(key, 0, genrateImageUrl(img)));
    }
  }

  return product.id == "" ? (
    <DelayComponent delay={1000}>
      <NotFound />
    </DelayComponent>
  ) : (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <form className="flex flex-col  gap-6  ">
        <div className="w-72">
          <Select placeholder={undefined} label="Choose a Color">
            <Option value="add">add</Option>
            {color.map((clr: AdminColor) => (
              <Option value={clr.id}>{clr.name}</Option>
            ))}
          </Select>
        </div>

        <div className=" overflow-hidden grid grid-cols-3 gap-2 ">
          {images.map((src: string, index: number) => (
            <ImageUploaderWithImage
              src={src}
              className="rounded-lg object-cover bg-clip w-full aspect-video"
              name="src"
              handleChange={(e: any) => console.log(e)}
            />
          ))}
        </div>
        <div>
          <button className="px-6  bg-black text-white py-2 font-bebas  rounded-md">
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddVaraitonPage;

interface ImageUploaderProps {
  name: string;
  src: string;
  handleChange: (e: ChangeEvent) => void;
  className: string;
}

function ImageUploaderWithImage({
  name,
  src,
  handleChange,
  className,
}: ImageUploaderProps) {
  return (
    <div className="flex items-center mt-2 ">
      <Tooltip content="add Image" placement="bottom">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center     font-ptsans font-bold  rounded-md cursor-pointer "
        >
          <img src={src} alt="" className={className} />
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e: any) => handleChange(e)}
            name={name}
            accept="image/*"
          />
        </label>
      </Tooltip>
    </div>
  );
}
