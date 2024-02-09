// import RecordsUploadOrgApi from "@/utils/uploadAxios";
import RecordsOrgApi from "@/utils/axios";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";
import { TFilePayload } from "@/types";

export const uploadFile = async (payload: TFilePayload) => {
  try {
    const { imageFile, flags } = payload;
    const result = await RecordsOrgApi.post(
      `${RECORDS_URLS.UPLOAD}${payload.flags && `?flag=${flags}`}`,
      { imageFile: imageFile },
    );

    return result;
  } catch (error) {
    throw handleRecordsApiError(error);
  }
};
