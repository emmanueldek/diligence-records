import axios from "axios";
import { RECORDS_URLS } from "./backendURLs";
import {
  getAuthToken,
  getWorkspaceToken,
  removeToken,
} from "@/helpers/authTokens";

const RecordsUploadOrgApi = axios.create({
  baseURL: RECORDS_URLS.BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

RecordsUploadOrgApi.interceptors.request.use(
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

RecordsUploadOrgApi.interceptors.response.use(
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

export default RecordsUploadOrgApi;
