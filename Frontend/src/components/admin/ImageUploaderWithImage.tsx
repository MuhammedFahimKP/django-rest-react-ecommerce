import { ChangeEvent } from "react";
import { Tooltip } from "@material-tailwind/react";

interface Props {
  name: string;
  src: string;
  handleChange: (e: ChangeEvent) => void;
  className: string;
  error?: string;
}

function ImageUploaderWithImage({
  name,
  src,
  handleChange,
  className,
  error,
}: Props) {
  return (
    <>
      <div className="flex flex-col justify-center mt-2 ">
        <Tooltip content="add Image" placement="bottom">
          <label
            htmlFor={"dropzone-file" + name}
            className="flex flex-col items-center justify-center     font-ptsans font-bold  rounded-md cursor-pointer "
          >
            <img src={src} alt="" className={className} />
            <input
              id={"dropzone-file" + name}
              type="file"
              className="hidden"
              onChange={(e: any) => handleChange(e)}
              name={name}
              accept="image/*"
            />
          </label>
        </Tooltip>
        {error && <p className="text-sm text-red-500 ml-2 mt-2">{error}</p>}
      </div>
    </>
  );
}

export default ImageUploaderWithImage;
