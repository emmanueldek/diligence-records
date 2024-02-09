import { TGetAExecutiveResponse } from "@/types/executiveTypes";
import { TGetAOrganisationResponse } from "@/types/organizationTypes";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";

export const getAnOrganisation = async (id: string) => {
  try {
    const { data } = await RecordsOrgApi.get<TGetAOrganisationResponse>(
      `${RECORDS_URLS.HOME.SINGLE_ORGANIZATION}?organizationId=${id}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const getAnExecutive = async (id: string) => {
  try {
    const { data } = await RecordsOrgApi.get<TGetAExecutiveResponse>(
      `${RECORDS_URLS.HOME.SINGLE_EXECUTIVES}?executiveId=${id}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
