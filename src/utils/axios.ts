import axios, { AxiosInstance } from "axios";
import { RECORDS_URLS } from "./backendURLs";
import {
  getAuthToken,
  getWorkspaceToken,
  removeToken,
} from "@/helpers/authTokens";

const RecordsOrgApi = axios.create({
  baseURL: RECORDS_URLS.BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

RecordsOrgApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const workspaceToken = getWorkspaceToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (workspaceToken) {
      config.headers["workspace"] = ` ${workspaceToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

RecordsOrgApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response) {
      if ([403, 401].includes(error.response.status)) {
        window.location.replace("/auth/login");
        removeToken("authToken");
      }
    }
    return Promise.reject(error);
  },
);

// Custom delete method with body
RecordsOrgApi.deleteWithBody = async function (
  url: string,
  data: any,
  config?: any,
) {
  return this.request({
    ...config,
    url,
    method: "delete",
    data, // Include data as the request body
  });
};

export default RecordsOrgApi as AxiosInstance & {
  deleteWithBody: (url: string, data: any, config?: any) => Promise<any>;
};
