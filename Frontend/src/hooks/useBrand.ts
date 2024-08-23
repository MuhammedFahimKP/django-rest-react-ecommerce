import type { AdminBrand } from "../@types";
import { ApiCLientRequestConfig } from "../services/api-client";
import usePaginatedData from "./usePaginatedData";

const usePaginatedAdminBrand = (
  limit: number,
  delay: number,
  requestConfig?: ApiCLientRequestConfig,
  deps?: any[]
) =>
  usePaginatedData<AdminBrand>(
    "admin/brand/",
    limit,
    delay,
    requestConfig,
    deps
  );

export { usePaginatedAdminBrand };
