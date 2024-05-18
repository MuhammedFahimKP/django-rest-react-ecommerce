import { ChangeEvent, useState } from "react";
import { genrateImageUrl } from "../../utils/image";

interface Props {
  name: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ name, onChange }: Props) => {
  const [image, setImage] = useState<null | string>();

  const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      onChange(e);
      setImage(genrateImageUrl(e.target.files[0]));
    }
  };

  return (
    <>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400

      "
          name={name}
          onChange={changeEvent}
        />
      </label>

      {image && (
        <img
          className="h-96 w-full rounded-lg object-contain object-center mt-2"
          src={image}
          alt="nature image"
        />
      )}
    </>
  );
};

export default ImageUploader;
