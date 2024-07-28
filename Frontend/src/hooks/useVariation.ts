import { useEffect, useState } from "react";
import type { ProductVariant } from "../@types";

export default function useVariation(variants: ProductVariant[]) {
  const [colors, setColors] = useState<string[] | []>([]);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    const colorSet = new Set<string>([]);
    const priceValues = new Array<number>();
    for (const variant of variants) {
      colorSet.add(variant.color);
      priceValues.push(parseFloat(variant.price));
    }

    setColors(Array.from(colorSet));
    setMinPrice(Math.min(...priceValues));
  });

  return { colors, minPrice };
}
