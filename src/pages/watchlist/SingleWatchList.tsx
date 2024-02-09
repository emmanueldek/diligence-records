import ThreeDotMenu from "@/components/svgs/ThreeDotMenu";
import { BsDot } from "react-icons/bs";
import { useRef, useState } from "react";
import CustomCheckBox from "@/components/custom-checkbox";
import { IWatchListCardProps } from "./types";

const SingleWatchList = ({
  image,
  name,
  type,
  organisationName,
  location,
  title,
  industry,
  id,
}: IWatchListCardProps) => {
  const [watchList, setWatchList] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const addToArrayOfWatchList = (value: string) => {
    setWatchList([...watchList, value]);
  };

  return (
    <div className="flex items-center justify-between mb-10 relative">
      <div className="flex gap-4 items-center">
        <CustomCheckBox
          name="watch-list"
          handleInputChange={() => addToArrayOfWatchList(id)}
          checked={watchList.includes(id)}
        />
        <div className="flex gap-2 items-center ">
          <figure className="rounded-md w-[56px] h-[56px] min-w-[56px] min-h-[56px] overflow-hidden mr-2 select-none">
            <img src={image} alt="executive" />
          </figure>
          <div className="">
            <div className="flex flex-wrap">
              <h3 className="hover:underline font-bold text-xl truncate cursor-pointer mb-2">
                {type === "organization" ? organisationName : name}
              </h3>

              <span className="whitespace-nowrap capitalize hidden sm:flex sm:items-center">
                {" "}
                <BsDot className="text-xl" />
                {type}
              </span>
            </div>
            <p className="inline-flex font-medium flex-wrap items-center whitespace-nowrap text-sm sm:text-base">
              <span className="capitalize">
                {type === "organization" ? industry : title}
              </span>
              {type !== "organization" && (
                <>
                  {" "}
                  <BsDot className="text-xl text-grey-400 " />
                  <span>{organisationName}</span>
                </>
              )}
              <BsDot className="text-xl text-grey-400 " />
              <span>{location}</span>
            </p>
          </div>
        </div>
      </div>

      <div ref={menuRef}>
        <ThreeDotMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        {isMenuOpen && (
          <div className="absolute z-10 top-[80%] right-0 rounded-md shadow-md px-1 py-2 bg-white">
            <p
              onClick={() => setIsMenuOpen(false)}
              className="text-sm py-2 px-3 border-b border-grey-50 cursor-pointer select-none hover:bg-grey-50"
            >
              Open
            </p>
            <p
              onClick={() => setIsMenuOpen(false)}
              className="text-sm py-2 px-3 cursor-pointer select-none hover:bg-grey-50"
            >
              Remove from watchlist
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleWatchList;
