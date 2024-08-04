import usePaginatedData from "./usePaginatedData";

import { ApiCLientRequestConfig } from "../services/api-client";

import type { OrderFetchResponse, AdminOrdersModel } from "../@types";

const usePaginatedOrder = (
  limit: number,
  delay: number,
  requestConfig?: ApiCLientRequestConfig,
  deps?: any[]
) =>
  usePaginatedData<OrderFetchResponse>(
    "orders/",
    limit,
    delay,
    requestConfig,
    deps ? deps : []
  );

const usePaginatedAdminOrder = (
  limit: number,
  delay: number,
  requestConfig?: ApiCLientRequestConfig,
  deps?: any[]
) =>
  usePaginatedData<AdminOrdersModel>(
    "admin/orders/",
    limit,
    delay,
    requestConfig,
    deps
  );

export { usePaginatedAdminOrder };

export default usePaginatedOrder;
