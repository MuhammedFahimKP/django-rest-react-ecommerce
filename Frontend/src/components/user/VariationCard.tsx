import type { ProductVariant } from "../../types";
import { useVariation } from "../../hooks";
import { useEffect } from "react";
import { color } from "framer-motion";

interface Props {
  variants: ProductVariant[];
  setLinkValue: (value: string) => void;
}

const VariationCard = ({ variants, setLinkValue }: Props) => {
  const { colors, minPrice } = useVariation(variants);

  useEffect(() => {
    setLinkValue(colors[0]);
  });

  return (
    <>
      <div className="z-50 w-full flex items-center justify-center px-4  gap-8 ">
        {colors.map((color) => (
          <span
            className="size-6 rounded-md"
            style={{ backgroundColor: `${color}` }}
          ></span>
        ))}
      </div>
      <div>
        <span>{minPrice}</span>
      </div>
    </>
  );
};

export default VariationCard;
