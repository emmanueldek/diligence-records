import CustomCheckBox from "@/components/custom-checkbox";
import { useState } from "react";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeWaitlist } from "@/services/watchlistServices";
import Toast from "@/config/Toast";
import { capitalizeWords } from "@/libs/CapitalizeWords";

interface TExecutive {
  _id: string;
  userId: string;
  workspaceId: string;
  profileType: string;
  organizationName: string;
  executiveName: string;
  executiveAvatar: string;
  location: string;
  executiveId: string;
  createdAt: string;
}

interface TProps {
  data?: TExecutive;
  toggleWatchList: (value: string) => void;
  watchListId: string[];
}

// Frank is supposed to return the Job title
const ExecutiveList: React.FC<TProps> = ({
  data,
  toggleWatchList,
  watchListId,
}) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(removeWaitlist, {
    onError: (error: string) => {
      Toast.error(error);
    },
    onSuccess: (data) => {
      Toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["getAllWatchList"] });
    },
  });

  const handleDelete = (value: string | undefined) => {
    mutate(value || "");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <CustomCheckBox
            name="executive"
            handleInputChange={() =>
              toggleWatchList(data?.executiveId as string)
            }
            checked={watchListId?.includes(data?.executiveId as string)}
          />
          <div className="flex space-x-4 items-center">
            <div className="rounded-md w-[60px] h-[60px] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={data?.executiveAvatar}
                alt="Executive logo"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Link
                  className="hover:underline underline-offset-1"
                  to={`/home/executive/${data?.executiveId}`}
                >
                  {data?.executiveName}
                </Link>
                <BsDot className="text-grey-200 text-xl" />
                <p>Executive</p>
              </div>
              <div className="flex items-center text-sm text-grey-200 font-light">
                <p>{data?.organizationName}</p>
                <BsDot className="text-grey-200 text-xl" />
                <p>{capitalizeWords(data?.location as string)}</p>
              </div>
            </div>
          </div>
        </div>
        <div onClick={() => setOpen(!open)}>
          <BsThreeDotsVertical />

          {open && (
            <div className=" w-[120px] absolute right-14  bg-white shadow rounded text-sm  text-grey-900 flex flex-col">
              <Link
                to={`/home/executive/${data?.executiveId}`}
                className="cursor-pointer border-grey-100 border-b-[1px] py-2 px-2"
                onClick={() => setOpen(!open)}
              >
                View
              </Link>

              <div
                className="cursor-pointer  py-2 px-2"
                onClick={() => handleDelete(data?._id)}
              >
                Remove
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExecutiveList;
