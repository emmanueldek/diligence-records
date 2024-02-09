import { TAddToWatchList, TGetWatchList } from "@/types/watchlistTypes";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";

type TProps = {
  id: string;
  payload: TAddToWatchList;
};

type TRemoveWatchList = {
  waitlistIds: string[];
};

export const createWatchList = async ({ id, payload }: TProps) => {
  try {
    const { data } = await RecordsOrgApi.post(
      `${RECORDS_URLS.WATCH_LIST.CREATE}?id=${id}`,
      payload,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

interface TConfirmProps {
  id: string;
  flags: string;
}

export const confirmWatchList = async ({ id, flags }: TConfirmProps) => {
  try {
    const { data } = await RecordsOrgApi.get(
      `${RECORDS_URLS.WATCH_LIST.CONFIRM}?${flags}=${id}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const getAllWatchList = async () => {
  try {
    const { data } = await RecordsOrgApi.get<TGetWatchList>(
      `${RECORDS_URLS.WATCH_LIST.GET_ALL}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};

export const removeWaitlist = async (requestId: string) => {
  try {
    const { data } = await RecordsOrgApi.delete(
      `${RECORDS_URLS.WATCH_LIST.REMOVE}?waitlistId=${requestId}`,
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
export const removeWaitlistMultiple = async (payload: TRemoveWatchList) => {
  try {
    const { data } = await RecordsOrgApi.delete(
      `${RECORDS_URLS.WATCH_LIST.REMOVE_MULTIPLE}/delete-multiple`,
      { data: payload },
    );
    return data;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
