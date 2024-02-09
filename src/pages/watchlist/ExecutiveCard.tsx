import { BsDot } from "react-icons/bs";
import { IWatchListCardProps } from "./types";
import CustomCheckBox from "@/components/custom-checkbox";
import Available from "@/components/svgs/Available";
import Unavailable from "@/components/svgs/Unavailable";
import { useState } from "react";

const ExecutiveCard = ({
  image,
  organisationName,
  location,
  executiveName,
  id,
}: IWatchListCardProps) => {
  console.log(id);
  const [addExec, setAddExec] = useState<string[]>([]);

  const toggleExecutive = (value: string) => {
    if (addExec.includes(value)) {
      setAddExec(addExec.filter((execId: string) => execId !== value));
    } else {
      setAddExec([...addExec, value]);
    }
  };
  return (
    <div className="border border-grey-50 shadow-md w-full p-4 sm:w-fit">
      <CustomCheckBox
        name="execWashList"
        handleInputChange={() => toggleExecutive(id || "")}
        checked={addExec.includes(id || "")}
      />
      <div className="flex gap-2 items-center my-3 py-4 border-b border-grey-200 ">
        <figure className="rounded-md w-[56px] h-[56px] min-w-[56px] min-h-[56px] overflow-hidden mr-2 select-none">
          <img src={image} alt="executive" />
        </figure>
        <div className="">
          <div className="flex flex-wrap">
            <h3 className="hover:underline font-bold w-[150px] h-[22px] text-xl truncate text-ellipsis overflow-hidden cursor-pointer mb-2">
              {executiveName}
            </h3>
          </div>
          <p className="inline-flex font-medium  flex-wrap items-center whitespace-nowrap">
            <span className="capitalize">{organisationName}</span>

            <BsDot className="text-xl text-grey-400 " />
            <span>{location}</span>
          </p>
        </div>
      </div>
      <ul className="text-grey-400">
        <li className="mb-1 flex items-center gap-1">
          <Available />
          <span>Financial Records </span>{" "}
        </li>
        <li className="mb-1 flex items-center gap-1">
          <Available />
          <span>Investments</span>
        </li>
        <li className="mb-1 flex items-center gap-1">
          <Unavailable />
          <span>Legal Records</span>
        </li>
        <li className="mb-1 flex items-center gap-1">
          <Available />
          <span>Tax Records</span>
        </li>
      </ul>
    </div>
  );
};

export default ExecutiveCard;
