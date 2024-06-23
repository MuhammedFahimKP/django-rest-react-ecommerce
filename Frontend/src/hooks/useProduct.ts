import useData from "./useData";
import { getState } from "../store";
import type { AdminProduct, ProductResponseData } from "../types";

import usePaginatedData from "./usePaginatedData";

export default function useProduct(deps: any[]) {
  const params = getState().adminProductSearchSlice;

  return useData<AdminProduct>(
    "admin/product/",
    {
      params: params,
    },
    [...deps]
  );
}

const usePaginatedAdminProduct = (limit: number, delay: number) =>
  usePaginatedData<AdminProduct>("admin/product/", limit, delay);

const useStoreProduct = (limit: number, delay: number) =>
  usePaginatedData<ProductResponseData>("shop/product/", limit, delay);

export { useStoreProduct, usePaginatedAdminProduct };
