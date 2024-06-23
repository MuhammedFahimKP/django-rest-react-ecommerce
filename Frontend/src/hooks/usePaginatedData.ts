import { useCallback, useEffect, useState } from "react";
import apiClient, {
  ApiCLientRequestConfig,
  ApiClientCanceledError,
  ApiClientError,
  ApiClientResponse,
} from "../services/api-client";

interface PaginatedResponseData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[] | [];
}

function usePaginatedData<T>(
  url: string,
  limit: number,
  delay: number,
  extraConfig?: ApiCLientRequestConfig
) {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T[] | []>([]);
  const [filterParams, setFilterParams] = useState<
    ApiCLientRequestConfig["params"] | {}
  >();

  const next = () =>
    setCurrentPage((prevPage) => (prevPage + 1 > pages ? 1 : prevPage + 1));

  const prev = () =>
    setCurrentPage((prevPage) => (prevPage === 1 ? pages : prevPage - 1));

  const updateFilters = (filter: ApiCLientRequestConfig["params"]) => {
    setPages(0), setCurrentPage(1), setFilterParams(filter);
  };

  const setFilters = useCallback(
    (filter: ApiCLientRequestConfig["params"]) =>
      setFilterParams((prevFilterParams: ApiCLientRequestConfig["params"]) => [
        ...prevFilterParams,
      ]),
    [extraConfig?.params]
  );

  useEffect(() => {
    setData([]);

    setLoading(true);

    const pageParams = {
      page: currentPage,
      limit: limit,
    };

    const controller = new AbortController();

    setTimeout(() => {
      apiClient
        .get<PaginatedResponseData<T>>(url, {
          signal: controller.signal,
          ...extraConfig,
          params: {
            ...pageParams,
            ...filterParams,
          },
        })
        .then((res: ApiClientResponse) => {
          setData(res.data.results);
          setPages(Math.ceil(res.data.count / limit));
        })
        .catch((err: ApiClientError) => {
          if (err instanceof ApiClientCanceledError) return;

          setError(err.message);
        })
        .finally(() => setLoading(false));
    }, delay);

    return () => controller.abort();
  }, [currentPage, filterParams]);

  return {
    data,
    pages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    updateFilters,
    prev,
    next,
  };
}

export default usePaginatedData;
