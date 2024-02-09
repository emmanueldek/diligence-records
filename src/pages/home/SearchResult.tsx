import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalSearch } from "@/store";
import { useOutsideClick } from "@/hooks";
import {
  TransparentBtn,
  Wrapper,
  Card,
  PrimaryBtn,
  InputText,
} from "@/components";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { PiBuildingsBold } from "react-icons/pi";
// import { BiFilter } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { fullSearch } from "@/services/home";

import NoSearchResultImg from "../../assets/images/no_result.svg";
import {
  TExecutiveSearchSchema,
  TOrganizationSearchSchema,
  UnknownObject,
} from "@/types";
import useDebounce from "@/hooks/useDebounce";

type ExecutiveProps = {
  image: string;
  name: string;
  position: string;
  location: string;
  id: string;
};

type OrganizationProps = {
  id: string;
  image: string;
  name: string;
  industry: string;
  location: string;
  financialStatements: UnknownObject;
  taxCompliance: UnknownObject;
  legalRegulatory: UnknownObject;
  creditHistory: UnknownObject;
};
const Organisation = ({
  id,
  name,
  industry,
  location,
  image,
  financialStatements,
  taxCompliance,
  legalRegulatory,
  creditHistory,
}: OrganizationProps) => {
  const { handleIsSearching } = useGlobalSearch();
  const navigate = useNavigate();

  return (
    <Card className="bg-white w-full md:w-[280px]">
      <div className="w-full flex justify-start items-center border-b border-grey-50 pb-3">
        <figure className="rounded-md w-[48px] h-[48px] overflow-hidden mr-2">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="org logo"
          />
        </figure>

        <div
          className=""
          onClick={() => {
            handleIsSearching(false);
            navigate(`/home/organisation/${id}`);
          }}
        >
          <h3 className="font-bold w-[150px] h-[22px] truncate text-ellipsis overflow-hidden hover:underline cursor-pointer">
            {name}
          </h3>
          <p className="text-grey-200 font-light text-xs flex flex-wrap items-center capitalize">
            <span>{industry}</span>
            <BsDot className="text-xl" />
            <span>{location}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-start items-center mb-1">
          {financialStatements?.length ? (
            <FaCircleCheck className="font-light text-green-400 text-sm mr-1" />
          ) : (
            <IoMdCloseCircle className="font-light text-red-400 mr-1" />
          )}
          <p className="font-light text-grey-400 text-sm">Financial Records</p>
        </div>
        <div className="flex justify-start items-center mb-1">
          {creditHistory?.length ? (
            <FaCircleCheck className="font-light text-green-400 text-sm mr-1" />
          ) : (
            <IoMdCloseCircle className="font-light text-red-400 mr-1" />
          )}
          <p className="font-light text-grey-400 text-sm">Investments</p>
        </div>
        <div className="flex justify-start items-center mb-1">
          {legalRegulatory?.length ? (
            <FaCircleCheck className="font-light text-green-400 text-sm mr-1" />
          ) : (
            <IoMdCloseCircle className="font-light text-red-400 mr-1" />
          )}
          <p className="font-light text-grey-400 text-sm">Legal Records</p>
        </div>
        <div className="flex justify-start items-center">
          {taxCompliance?.length ? (
            <FaCircleCheck className="font-light text-green-400 text-sm mr-1" />
          ) : (
            <IoMdCloseCircle className="font-light text-red-400 mr-1" />
          )}
          <p className="font-light text-grey-400 text-sm">Tax Records</p>
        </div>
      </div>
    </Card>
  );
};

const Executive = ({ image, name, position, location, id }: ExecutiveProps) => {
  const { handleIsSearching } = useGlobalSearch();
  const navigate = useNavigate();

  return (
    <Card className="bg-white w-full md:w-[280px]">
      <div className="w-full flex justify-start items-center border-b border-grey-50 pb-3">
        <figure className="rounded-md w-[56px] h-[56px] overflow-hidden mr-2">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="org logo"
          />
        </figure>

        <div
          className=""
          onClick={() => {
            handleIsSearching(false);
            navigate(`/home/executive/${id}`);
          }}
        >
          <h3 className="hover:underline font-bold w-[150px] h-[22px] truncate text-ellipsis overflow-hidden cursor-pointer">
            {name}
          </h3>
          <span className="text-grey-400 font-light text-sm flex items-center">
            <p>{position}</p>
            <BsDot className="text-xl" />
            <p className="capitalize">{location}</p>
          </span>
        </div>
      </div>
    </Card>
  );
};

const EmptyResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const searchQuery = searchParams.get("search");
  return (
    <div className="text-center flex flex-col justify-center items-center py-5">
      <figure className="mb-8">
        <img src={NoSearchResultImg} alt="no_result" />
      </figure>
      <h1 className="font-bold text-3xl text-center">
        No results found for '{searchQuery}'
      </h1>
      <p className="font-light text-grey-400 mb-6 text-center w-full max-w-[600px] ">
        Consider revising your search term or filters. Alternatively, you can
        submit a request for the information you require.
      </p>

      <PrimaryBtn
        text="Make a Request"
        onClick={() => navigate("/request/new")}
      />
    </div>
  );
};

function SearchResult() {
  const [openOrgFilter, setOpenOrgFilter] = useState(false);
  const orgRef = useOutsideClick(() => setOpenOrgFilter(false));
  const [fullSearchParams, setFullSearchParams] = useState({
    description: "",
    location: "",
    industry: "",
    organizationSize: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFullSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  // debounced value of filter query params
  const debouncedDescriptionParam = useDebounce(
    fullSearchParams.description,
    500,
  );
  const debouncedLocationParam = useDebounce(fullSearchParams.location, 500);
  const debouncedIndustryParam = useDebounce(fullSearchParams.industry, 500);
  const debouncedOrganizationSizeParam = useDebounce(
    fullSearchParams.organizationSize,
    500,
  );

  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    [
      "home-search",
      searchQuery,
      debouncedDescriptionParam,
      debouncedLocationParam,
      debouncedIndustryParam,
      debouncedOrganizationSizeParam,
    ],
    () =>
      fullSearch(searchQuery, {
        description: debouncedDescriptionParam,
        location: debouncedLocationParam,
        industry: debouncedIndustryParam,
        organizationSize: debouncedOrganizationSizeParam,
      }),
    {
      enabled: !!searchQuery,
    },
  );

  return (
    <div className="w-full">
      <div className="w-full">
        <Wrapper className="bg-white w-full">
          <div className="border-b border-grey-50 py-2 flex justify-between items-center">
            <p className="font-light">
              Search for: <b className="font-bold">{searchQuery}</b>
            </p>
            <div className="relative w-[300px] flex flex-col">
              {/* <div
                className="self-end flex justify-end items-center cursor-pointer p-2"
                onClick={() => setOpenOrgFilter(!openOrgFilter)}
              >
                <BiFilter className="mr-1 text-lg" />
                <p className="text-sm">Filters</p>
              </div> */}

              <div
                ref={orgRef}
                className={`absolute z-10 top-[40px] right-0 w-[300px] p-4 bg-white shadow-md  transition-all ${
                  openOrgFilter
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-[-12px] invisible"
                }`}
              >
                <div className="w-full">
                  <InputText
                    id={"keyword"}
                    name={"description"}
                    placeholder={"e.g crypto, meditech"}
                    label={"Description Keyword"}
                    error={""}
                    type={"text"}
                    value={fullSearchParams.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-full">
                  <InputText
                    id={"location"}
                    name={"location"}
                    placeholder={"e.g lagos, abuja"}
                    label={"Location"}
                    error={""}
                    type={"text"}
                    value={fullSearchParams.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-full">
                  <InputText
                    id={"industry"}
                    name={"industry"}
                    placeholder={"e.g engineering, health"}
                    label={"Industry"}
                    error={""}
                    type={"text"}
                    value={fullSearchParams.industry}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-full">
                  <InputText
                    id={"organisation"}
                    name={"organizationSize"}
                    placeholder={"5-50"}
                    label={"Organisation"}
                    error={""}
                    type={"text"}
                    value={fullSearchParams.organizationSize}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <TransparentBtn Icon={PiBuildingsBold} text="Organisations" />
            </div>

            <p className="font-bold text-grey-900 mt-4">
              {data?.data?.organizations?.count} Organisation results
            </p>

            {data?.data?.organizations?.count === 0 ? (
              <EmptyResult />
            ) : (
              <div className="mt-4 flex flex-col md:flex-row gap-4 justify-start items-start">
                {isLoading
                  ? [1, 2, 3].map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-52 sm:w-[280px] bg-grey-50 animate-pulse rounded-md"
                      ></div>
                    ))
                  : data?.data?.organizations?.data
                      ?.slice(0, 3)
                      ?.map((item: TOrganizationSearchSchema) => (
                        <Organisation
                          id={item?._id}
                          key={item?._id}
                          image={item?.organizationLogo}
                          industry={item?.profile?.industry}
                          location={item?.profile?.location}
                          name={item?.profile?.organizationName}
                          creditHistory={item?.creditHistory}
                          financialStatements={item?.financialStatements}
                          legalRegulatory={item?.legalRegulatory}
                          taxCompliance={item?.taxCompliance}
                        />
                      ))}
              </div>
            )}

            {data?.data?.organizations?.count > 3 && (
              <div className="flex justify-start items-center mt-8">
                <button
                  type="button"
                  className="rounded-sm flex justify-center items-center transition-all duration-150 border-t-[1px] border-r-[2px] border-b-[2px] border-l-[1px] border-grey-100 font-bold text-grey-400 hover:text-white hover:bg-grey-900 hover:border-grey-900 py-1 px-4"
                >
                  <p className="mr-1">See all organisation results</p>
                  <HiMiniArrowSmallRight className="text-xl" />
                </button>
              </div>
            )}
          </div>
        </Wrapper>

        <Wrapper className="w-full bg-white mt-4">
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <TransparentBtn Icon={GoPeople} text="Executives" />
            </div>

            <p className="font-bold text-grey-900 mt-4">
              {data?.data?.executives?.count} Executive results
            </p>

            {data?.data?.executives?.count === 0 ? (
              <EmptyResult />
            ) : (
              <Card className="mt-4">
                {isLoading
                  ? [1, 2, 3].map((_, index) => (
                      <>
                        <div
                          key={index}
                          className="w-full h-16 mb-4 bg-grey-50 animate-pulse rounded-md"
                        ></div>
                      </>
                    ))
                  : data?.data?.executives?.data
                      ?.slice(0, 5)
                      ?.map((item: TExecutiveSearchSchema) => (
                        <Executive
                          key={item?._id}
                          id={item?._id}
                          name={item?.profile?.executiveName}
                          image={item?.executiveAvatar}
                          position={item?.profile?.executivePosition}
                          location={item?.profile?.location}
                        />
                      ))}
              </Card>
            )}

            {data?.data?.executives?.count > 5 && (
              <div className="flex justify-start items-center mt-8">
                <button
                  type="button"
                  className="rounded-sm flex justify-center items-center transition-all duration-150 border-t-[1px] border-r-[2px] border-b-[2px] border-l-[1px] border-grey-100 font-bold text-grey-400 hover:text-white hover:bg-grey-900 hover:border-grey-900 py-1 px-4"
                >
                  <p className="mr-1">See all executives results</p>
                  <HiMiniArrowSmallRight className="text-xl" />
                </button>
              </div>
            )}
          </div>
        </Wrapper>

        <Wrapper className="bg-white mt-4">
          <div className="py-4 flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl">
              Can’t find what you are looking for?
            </h1>
            <p className="font-light text-grey-400 mb-6">
              You can send us a request to get the information you need.
            </p>

            <PrimaryBtn
              text="Make a Request"
              onClick={() => navigate("/request/new")}
            />
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export default SearchResult;
