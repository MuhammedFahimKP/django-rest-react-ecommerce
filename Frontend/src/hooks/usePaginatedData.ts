import { useEffect, useState } from "react";
import { PaginatedResponseData } from "../@types";

import apiClient, {
  ApiCLientRequestConfig,
  ApiClientCanceledError,
  ApiClientError,
  ApiClientResponse,
} from "../services/api-client";

function usePaginatedData<T>(
  url: string,
  limit: number,
  delay: number,
  extraConfig?: ApiCLientRequestConfig,
  deps?: any[]
) {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T[] | []>([]);
  const [pageChange, setPageChange] = useState(false);

  const next = () => {
    if (loading === false) {
      setCurrentPage((prevPage) => {
        setPageChange(true);
        const page = prevPage + 1 > pages ? 1 : prevPage + 1;
        return page;
      });
    }
  };

  const prev = () => {
    if (loading === false) {
      setCurrentPage((prevPage) => {
        setPageChange(true);

        const page = [0, 1].includes(prevPage) ? pages : prevPage - 1;

        return page;
      });
    }
  };

  const setPageAndCurrentPage = () => {
    setData([]);
    setLoading(true);
    if (pageChange !== true) {
      setPages(0);
      setCurrentPage(1);
    }
  };

  useEffect(
    () => {
      setPageAndCurrentPage();

      const requestConfig = {
        ...extraConfig,
        params: { ...extraConfig?.params, page: currentPage, limit: limit },
      };

      const controller = new AbortController();

      setTimeout(() => {
        apiClient
          .get<PaginatedResponseData<T>>(url, {
            signal: controller.signal,
            ...requestConfig,
          })
          .then((res: ApiClientResponse) => {
            setData(res.data.results);

            setPages(Math.ceil(res.data.count / limit));
          })
          .catch((err: ApiClientError) => {
            if (err instanceof ApiClientCanceledError) return;

            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
            if (pageChange === true) {
              setPageChange(false);
            }
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps, currentPage] : [currentPage]
  );

  return {
    data,
    pages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    setData,
    prev,
    next,
  };
}

export default usePaginatedData;
