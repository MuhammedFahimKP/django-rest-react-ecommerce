import { useNavigate } from "react-router-dom";
import { IconButton, Typography, Tooltip } from "@material-tailwind/react";
import type { AdminProduct } from "../../@types";
import { PencilIcon } from "@heroicons/react/24/outline";

interface Props extends AdminProduct {
  classes: string;
}

const ProductRow = ({
  id,
  name,
  img,
  categoery,
  brand,
  is_active,
  created,
  updated,
  classes,
}: Props) => {
  const navigate = useNavigate();
  return (
    <tr key={id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          {/* <Avatar
            placeholder={undefined}
            src={img}
            alt={name}
            size="md"
            className="rounded-none"
          /> */}

          <img
            src={img}
            alt=""
            className="rounded-md object-fill h-16 w-14 mr-5"
          />

          <div className="flex flex-col">
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {name}
            </Typography>
            <Typography
              placeholder={undefined}
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {brand}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {categoery}
          </Typography>
          <Typography
            placeholder={undefined}
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {""}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="w-max">
          {is_active ? (
            <div className="text-white bg-green-500 px-2 rounded-lg">
              published
            </div>
          ) : (
            <div className="text-white bg-red-500 px-2 rounded-lg">
              unpublished
            </div>
          )}
        </div>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {created}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder={undefined}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {updated}
        </Typography>
      </td>
      <td
        className={classes}
        onClick={(e: any) => navigate("view/" + id + "/")}
      >
        <Tooltip content="Edit Product">
          <IconButton placeholder={undefined} variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default ProductRow;
