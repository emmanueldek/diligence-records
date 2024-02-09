import { TRequestRecordPayload } from "@/types/requestTypes";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";

type TRequestInfo = {
  profileType: "organization" | "executive";
  organizationName: string;
  executiveName?: string;
  organizationDesc?: string;
  executiveDesc?: string;
  position?: string;
  executiveDoc?: string;
  organizationDoc?: string;
  imageDesc?: string;
  link?: string;
};

type TOrgSuggestion = {
  data: {
    profileType: string;
    recordSection: string;
    suggestionInput: string;
    suggestionDoc: string;
    link?: string;
    imageDesc?: string;
    organizationName?: string;
  };
  organizationId?: string;
  executiveId?: string;
};

export const getExectiveRequests = async (
  batch: number,
  searchValue: string,
) => {
  try {
    if (searchValue) {
      const result = await RecordsOrgApi.get(
        `${RECORDS_URLS.REQUEST.GET_EXECUTIVES}?search=${searchValue || ""}`,
      );
      return result;
    }
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.REQUEST.GET_EXECUTIVES}?batch=${batch}`,
    );
    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const getOrganizationRequests = async (
  batch: number,
  searchValue: string,
) => {
  try {
    if (searchValue) {
      const result = await RecordsOrgApi.get(
        `${RECORDS_URLS.REQUEST.GET_ORGANIZATIONS}?search=${searchValue || ""}`,
      );
      return result;
    }
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.REQUEST.GET_ORGANIZATIONS}?batch=${batch}`,
    );
    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const getRecordsRequests = async (
  batch: number,
  searchValue: string,
) => {
  try {
    if (searchValue) {
      const result = await RecordsOrgApi.get(
        `${RECORDS_URLS.REQUEST.GET_RECORDS}?search=${searchValue || ""}`,
      );
      return result;
    }
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.REQUEST.GET_RECORDS}?batch=${batch}`,
    );
    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const requestExecOrg = async (payload: TRequestInfo) => {
  try {
    const result = await RecordsOrgApi.post(
      RECORDS_URLS.REQUEST.CREATE_ORG_EXEC,
      payload,
    );
    const data = result?.data;

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const getRequestByID = async (id: string | undefined) => {
  try {
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.REQUEST.GET_SINGLE_REQUEST}?requestId=${id}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const getAudit = async (batch: number) => {
  try {
    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.REQUEST.GET_AUDIT}?batch=${batch}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const deleteActivityById = async (auditId: string) => {
  try {
    const result = await RecordsOrgApi.delete(
      `${RECORDS_URLS.REQUEST.DELETE_ACTIVITY}?auditId=${auditId}`,
    );
    const data = result?.data;

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const deleteRequestById = async (requestId: string) => {
  try {
    const result = await RecordsOrgApi.delete(
      `${RECORDS_URLS.REQUEST.DELETE_REQUEST}?requestId=${requestId}`,
    );
    const data = result?.data;

    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

type TAddRecordForOrg = {
  id: string;
  flag: string;
  payload: TRequestRecordPayload;
};

export const addRecordForOrg = async ({
  id,
  flag,
  payload,
}: TAddRecordForOrg) => {
  try {
    const result = await RecordsOrgApi.post(
      `${RECORDS_URLS.REQUEST.ADD_RECORD}?${flag}=${id}`,
      payload,
    );

    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const orgSuggestion = async (payload: TOrgSuggestion) => {
  try {
    const result = await RecordsOrgApi.post(
      `${RECORDS_URLS.REQUEST.SUGGESTION}?organizationId=${payload?.organizationId}`,
      payload?.data,
    );
    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const execSuggestion = async (payload: TOrgSuggestion) => {
  try {
    const result = await RecordsOrgApi.post(
      `${RECORDS_URLS.REQUEST.SUGGESTION}?executiveId=${payload?.executiveId}`,
      payload?.data,
    );
    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
