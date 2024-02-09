import { TNewsResponse } from "@/types/homeTypes";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";

type TFullSearch = {
  description?: string;
  location?: string;
  industry?: string;
  organizationSize?: string;
};
export const fullSearch = async (
  search: string | null,
  params: TFullSearch,
) => {
  try {
    const queryParams = Object.entries(params)
      .filter(([value]) => typeof value === "string" && value.trim() !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const result = await RecordsOrgApi.get(
      `${RECORDS_URLS.HOME.FULL_SEARCH}?search=${search}&${queryParams}`,
    );
    return result?.data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const getAllNews = async (number: number) => {
  try {
    const { data } = await RecordsOrgApi.get<TNewsResponse>(
      `${RECORDS_URLS.HOME.NEWS}?page=${number}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
