import { BsDot } from "react-icons/bs";
import { PiBuildingsBold } from "react-icons/pi";
import { GoKebabHorizontal, GoPeople } from "react-icons/go";
import { TAuditSchema } from "@/types";
import { formatDateDifference } from "@/utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivityById } from "@/services/request";
import Toast from "@/config/Toast";
import { useOutsideClick } from "@/hooks";
import { useState } from "react";

type TActivityCard = {
  activity: TAuditSchema;
};

const recordLocationList = {
  profile: "Profile",
  financialStatements: "Financial Statements",
  management: "Management",
  creditHistory: "Credit History",
  taxCompliance: "Tax Compliance",
  legalRegulatory: "Legal Regulatory",
  environmentalCompliance: "Environmental Compliance",
  contractualObligations: "Contractual Obligations",
  insuranceCoverage: "Insurance Coverage",
  supplyChainInformation: "Supply Chain Information",
  referencesReputation: "References Reputation",
  ownershipStructure: "Ownership Structure",
};

const ActivityCard = ({ activity }: TActivityCard) => {
  const [openOptions, setOpenOptions] = useState(false);

  const queryClient = useQueryClient();

  const optionRef = useOutsideClick(() => setOpenOptions(false));

  const { mutate: deleteActivity, isLoading: isDeletingActivity } = useMutation(
    deleteActivityById,
    {
      onError: (error: string) => {
        Toast.error(error);
      },
      onSuccess: (data) => {
        setOpenOptions(false);
        Toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["requests-audit"] });
      },
    },
  );

  return (
    <div
      className={`flex justify-start items-start p-4 ${
        activity?.action !== "deleted" && "bg-[#F8F8FF]"
      }`}
    >
      <figure className="w-[36px] h-[36px] rounded-full overflow-hdden">
        <img src={activity?.avatarOrLogo} className="w-full h-full" alt="" />
      </figure>

      <div className="ml-4 w-[70%]">
        <p className="font-light leading-[20px]">
          A new record has been{" "}
          {activity?.action == "updated"
            ? "updated in"
            : activity?.action == "added"
            ? "added to"
            : "deleted from"}
          &nbsp;
          <b className="font-bold">
            {
              recordLocationList[
                activity?.recordLocation as keyof typeof recordLocationList
              ]
            }
          </b>{" "}
          for&nbsp;
          <b className="font-bold">
            {activity?.profileType === "executive"
              ? activity?.executiveName
              : activity?.organizationName}
          </b>
        </p>

        <p
          className={`rounded-md text-sm py-2 px-4 font-medium w-fit my-2 text-blue-500 bg-blue-50 ${
            activity?.action === "deleted" && "text-red-500 bg-red-50"
          }`}
        >
          {
            recordLocationList[
              activity?.recordLocation as keyof typeof recordLocationList
            ]
          }
        </p>

        <p className="text-grey-400 font-light text-sm flex items-center">
          <span>{formatDateDifference(activity?.createdAt)}</span>
          <BsDot className="text-xl" />
          <span className="flex items-center font-bold text-grey-900">
            <span className="mr-1">
              {activity?.profileType === "executive" ? (
                <GoPeople className="stroke-1" />
              ) : (
                <PiBuildingsBold className="stroke-1" />
              )}
            </span>{" "}
            <span className="capitalize">{activity?.profileType}</span>
          </span>
        </p>
      </div>
      <div className="relative flex-1 ">
        <GoKebabHorizontal
          onClick={() => setOpenOptions(true)}
          className="rotate-90 cursor-pointer ml-auto text-grey-200 hover:text-grey-900 peer"
        />
        {openOptions && (
          <div
            ref={optionRef}
            className={`absolute bg-white z-10 top-5 right-5 h-fit w-fit  shadow-md transition-all p-1 text-sm`}
          >
            <p
              onClick={() => deleteActivity(activity?._id)}
              className={`py-2 px-3  cursor-pointer whitespace-nowrap text-red-500  hover:bg-grey-50/80 ${
                isDeletingActivity && "pointer-events-none"
              }`}
            >
              Delete Activity
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
