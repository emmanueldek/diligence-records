import RecordsOrgApi from "@/utils/axios";
import { handleRecordsApiError } from "@/utils/httpApiErrors";
import { RECORDS_URLS } from "@/utils/backendURLs";
import {
  TRegistration,
  TLogin,
  TForgotPwd,
  TUpdateProfile,
} from "@/utils/validationSchemas";
import {
  TLoginResponseSchema,
  TUserResponseSchema,
  TForgotPwdResponseSchema,
} from "@/types";
import { setAuthToken, setWorkspaceToken } from "@/helpers/authTokens";

export const registerUser = async (payload: TRegistration) => {
  try {
    const result = await RecordsOrgApi.post(
      RECORDS_URLS.AUTH.REGISTRATION,
      payload,
    );

    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const loginUser = async (payload: TLogin) => {
  try {
    const result = await RecordsOrgApi.post(RECORDS_URLS.AUTH.LOGIN, payload);
    const data: TLoginResponseSchema = result.data.data;
    setAuthToken(data.authToken);

    if (data.workspaceToken) {
      setWorkspaceToken(data.workspaceToken);
    }
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const currentUser = async () => {
  try {
    const result = await RecordsOrgApi.get(RECORDS_URLS.AUTH.ME);
    const data: TUserResponseSchema = result.data.data;
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const forgotPwd = async (payload: TForgotPwd) => {
  try {
    const result = await RecordsOrgApi.post(
      RECORDS_URLS.AUTH.FORGOT_PASSWORD,
      payload,
    );
    const data: TForgotPwdResponseSchema = result.data;

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const pwdReset = async (payload: {
  data: { password: string };
  token: string;
}) => {
  try {
    const result = await RecordsOrgApi.post(
      `${RECORDS_URLS.AUTH.PASSWORD_RESET}?token=${payload?.token}`,
      payload.data,
    );

    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const updateProfile = async (payload: TUpdateProfile) => {
  try {
    const result = await RecordsOrgApi.patch(
      RECORDS_URLS.AUTH.PROFILE_UPDATE,
      payload,
    );

    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
