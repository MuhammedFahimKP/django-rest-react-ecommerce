import type { ApiCLientRequestConfig } from "../../services/api-client";

export interface PaginatedThunkCallWithFilterARGS {
  delay: number;
  limit: number;
  requestConfiq?: ApiCLientRequestConfig;
}
