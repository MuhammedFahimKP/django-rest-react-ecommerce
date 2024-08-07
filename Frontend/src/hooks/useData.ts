import { useEffect, useState } from "react";
import apiClient, {
  ApiClientCanceledError,
  type ApiClientError,
  type ApiClientResponse,
} from "../services/api-client";
import { AxiosRequestConfig } from "axios";

const useData = <T>(
  endpoint: string,
  delay = 0,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      setTimeout(() => {
        apiClient
          .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
          .then((res: ApiClientResponse) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof ApiClientCanceledError) return;
            alert(err);
            if ((err as ApiClientError)?.status) {
              setError(err.status);
            }
            setLoading(false);
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading, setData };
};

export default useData;
