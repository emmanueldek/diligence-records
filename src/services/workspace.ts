import { setWorkspaceToken } from "@/helpers/authTokens";
import { TWorkspace, TWorkspaceResponse } from "@/types/workspaceTypes";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";

type TCreateWorkspace = {
  workspaceName: string;
  position: string;
  workspaceLogo: string;
  workspaceDesc: string;
  organizationSize: string;
  industry: string;
  officeAddress: string;
  country: string;
  state: string;
  website: string;
};
type INewMember = {
  email: string;
  role: string;
};
type TNewMemberList = {
  invitees: INewMember[];
};

interface IUploadImagePayload {
  flags?: string; // Optional property
  imageFile: FormData; // Assuming you're working with a File object
}

export const createWorkspace = async (payload: TCreateWorkspace) => {
  try {
    const result = await RecordsOrgApi.post(
      RECORDS_URLS.WORKSPACE.CREATE,
      payload,
    );
    const data = result.data;
    setWorkspaceToken(data.data.workspaceToken);

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const updateWorkspace = async (payload: TWorkspace) => {
  try {
    const { data } = await RecordsOrgApi.patch(
      RECORDS_URLS.WORKSPACE.PATCH_WORKSPACE,
      payload,
    );

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const inviteMember = async (payload: TNewMemberList) => {
  try {
    const result = await RecordsOrgApi.post(
      RECORDS_URLS.WORKSPACE.INVITE,
      payload,
    );
    const data = result.data;

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const getAllMembers = async (batch: number, searchValue: string) => {
  try {
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.WORKSPACE.GET_ALL_MEMBERS}${
        searchValue ? "?search=" + searchValue : "?batch=" + batch
      }`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const getProfile = async () => {
  try {
    const result = await RecordsOrgApi.get<TWorkspaceResponse>(
      `${RECORDS_URLS.WORKSPACE.GET_PROFILE}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const makeAdmin = async (userId: string) => {
  try {
    const result = await RecordsOrgApi.patch(
      `${RECORDS_URLS.WORKSPACE.MAKE_ADMIN}?userId=${userId}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const makeMember = async (userId: string) => {
  try {
    const result = await RecordsOrgApi.patch(
      `${RECORDS_URLS.WORKSPACE.MAKE_MEMBER}?userId=${userId}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const removeUser = async (useremail: string) => {
  try {
    const result = await RecordsOrgApi.deleteWithBody(
      `${RECORDS_URLS.WORKSPACE.REMOVE_USER}`,
      { email: useremail },
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const useUploadImage = async (payload: IUploadImagePayload) => {
  try {
    const { data } = await RecordsOrgApi.post(
      `${RECORDS_URLS.UPLOAD}${
        payload?.flags ? `?flag=${payload?.flags}` : ""
      } `,
      payload?.imageFile,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
