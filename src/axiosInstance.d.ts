// axiosInstance.d.ts

import { AxiosRequestConfig, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosInstance {
    deleteWithBody(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse>;
  }
}
