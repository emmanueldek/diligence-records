import CustomCheckBox from "@/components/custom-checkbox";
import Toast from "@/config/Toast";
import { capitalizeWords } from "@/libs/CapitalizeWords";
import { removeWaitlist } from "@/services/watchlistServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

interface TOrganisation {
  _id: string;
  userId: string;
  workspaceId: string;
  profileType: string;
  organizationName: string;
  organizationId: string;
  createdAt: string;
  organizationLogo: string;
  location: string;
  industry: string;
}
interface TProps {
  data?: TOrganisation;
  toggleWatchList: (value: string) => void;
  watchListId: string[];
}

const OrganisationWatchList: React.FC<TProps> = ({
  data,
  watchListId,
  toggleWatchList,
}) => {
  const [open, setOpen] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(removeWaitlist, {
    onError: (error) => {
      console.log(error);
      Toast.error("failed");
    },
    onSuccess: (data) => {
      Toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["getAllWatchList"] });
    },
  });

  const handleOpen = (id: string) => {
    setOpen(open === id ? "" : id);
  };

  const handleDelete = (value: string | undefined) => {
    mutate(value || "");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <CustomCheckBox
            name="organisation"
            handleInputChange={() => toggleWatchList(data?._id || "")}
            checked={watchListId?.includes(data?._id as string)}
          />
          <div className="flex space-x-4 items-center">
            <div className="rounded-md w-[60px] h-[60px] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={data?.organizationLogo}
                alt="Executive logo"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Link
                  className="hover:underline underline-offset-1"
                  to={`/home/organisation/${data?.organizationId}`}
                >
                  {data?.organizationName}
                </Link>
                <BsDot className="text-grey-200 text-xl" />
                <p>Organisation</p>
              </div>
              <div className="flex items-center text-sm text-grey-200 font-light">
                <p>{data?.industry}</p>

                <BsDot className="text-grey-200 text-xl" />
                <p>{capitalizeWords(data?.location as string)}</p>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => handleOpen(data?.organizationId || "")}>
          <BsThreeDotsVertical />

          {open === data?.organizationId && (
            <div className=" w-[120px] absolute right-14  bg-white shadow rounded text-sm  text-grey-900 flex flex-col">
              <Link
                to={`${`/home/organisation/${data?.organizationId}`}`}
                className="cursor-pointer border-grey-100 border-b-[1px] py-2 px-2"
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

export default OrganisationWatchList;
