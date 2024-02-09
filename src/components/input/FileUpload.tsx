import Toast from "@/config/Toast";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { handleRecordsApiError } from "@/utils/httpApiErrors";
import RecordsUploadOrgApi from "@/utils/uploadAxios";
import { AxiosProgressEvent } from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

type TInputFile = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  flag: string;
};

const FileUpload = ({ setImage, image, flag }: TInputFile) => {
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      Toast.error("Please select only one image");
    } else {
      const imageFile: FormData = new FormData();
      imageFile.append("file", e.target.files[0]);
      setUploading(true);

      let progress = 0;

      try {
        const { data } = await RecordsUploadOrgApi.post(
          `${RECORDS_URLS.UPLOAD}?flag=${flag}`,
          imageFile,
          {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total !== undefined) {
                progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setPercent(progress);
              } else {
                setUploading(false);
              }
            },
          },
        );

        setImage(data?.data.url);
      } catch (error) {
        throw Toast.error(handleRecordsApiError(error));
      }
    }
  };

  const clearInput = () => {
    setImage("");
    setUploading(false);
  };

  return (
    <div>
      {uploading ? (
        <div className="flex space-x-2 items-center">
          <div className="bg-grey-100 h-[5px] rounded-lg w-[100%] overflow-hidden">
            <div
              className="bg-green-500 h-[100%]"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <p className="text-xs text-grey-200">{percent}%</p>

          {image !== "" ? (
            <MdDelete
              className="text-grey-300 text-xl cursor-pointer"
              onClick={clearInput}
            />
          ) : null}
        </div>
      ) : (
        <>
          {image === "" && !uploading ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[95px] border border-grey-100 rounded-lg cursor-pointer bg-transparent"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="24"
                    viewBox="0 0 26 24"
                    fill="none"
                  >
                    <path
                      d="M11.4 12.8H14.6V6.40002H19.4L13 0L6.59997 6.40002H11.4V12.8ZM16.2 9.20003V11.6672L23.5264 14.4L13 18.3249L2.47356 14.4L9.79998 11.6672V9.20003L0.199951 12.8V19.2001L13 24.0001L25.8 19.2001V12.8L16.2 9.20003Z"
                      fill="#78797F"
                    />
                  </svg>
                  <p className="text-xs text-grey-500">
                    Click to upload or drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={onSelectFile}
                />
              </label>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default FileUpload;
