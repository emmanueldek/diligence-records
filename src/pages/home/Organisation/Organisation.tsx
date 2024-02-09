import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, PrimaryBtn, Wrapper } from "@/components";
import { BiArrowBack } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { GoPencil, GoBookmark } from "react-icons/go";
import OrgImg from "../../../assets/images/organisation_logo.png";
import {
  ProfileTab,
  FinancialStatementsTab,
  ManagementTab,
  BankruptcyHistoryTab,
  TaxComplianceTab,
  LegalRegulatoryTab,
  EnvironmentalComplianceTab,
  ContractualObligationsTab,
  InsuranceCoverageTab,
  SupplyChainTab,
  OwnershipStructureTab,
} from "./tabCards";

import SuggestionForm from "./SuggestionForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAnOrganisation } from "@/services/organizationServices";
import {
  confirmWatchList,
  createWatchList,
} from "@/services/watchlistServices";
import { RouteParams } from "@/types/organizationTypes";
import Toast from "@/config/Toast";
import { orgTab } from "@/constant/requestConstant";
import { queryClient } from "@/config";

function OrganisationProfile() {
  const navigate = useNavigate();

  const { id } = useParams() as unknown as RouteParams;
  const { data } = useQuery(["getAnOrganisation", id], () =>
    getAnOrganisation(id as string),
  );
  const { mutate } = useMutation(createWatchList, {
    onSuccess: () => {
      Toast.success("Added to WatchList!");
      queryClient.invalidateQueries(["confirmWatchList"]);
    },
  });

  const { data: confirmData } = useQuery(
    ["confirmWatchList", id],
    () =>
      confirmWatchList({
        id: id,
        flags: "organizationId",
      }),
    {
      enabled: !!id,
    },
  );

  const addToWatchList = () => {
    mutate({
      id: id,
      payload: {
        profileType: "organization",
      },
    });
  };

  const profileData = data?.data?.profile;
  const financialStatements = data?.data?.financialStatements;

  const [isSuggestionForm, setSuggestionForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      {isSuggestionForm ? (
        <SuggestionForm
          organizationName={profileData?.organizationName}
          isSuggestionForm={isSuggestionForm}
          setSuggestionForm={setSuggestionForm}
        />
      ) : (
        <Wrapper className="bg-white w-full">
          <div className="w-full flex justify-between items-center">
            <div
              onClick={() => navigate(-1)}
              className="flex justify-start items-center cursor-pointer transition-all duration-150 text-grey-400 hover:text-grey-900"
            >
              <BiArrowBack className="mr-1" />
              <p className="text-sm">Back</p>
            </div>

            <div
              onClick={() => setSuggestionForm(!isSuggestionForm)}
              className="flex justify-start items-center cursor-pointer transition-all duration-150 text-grey-400 hover:text-grey-900"
            >
              <GoPencil className="mr-1" />
              <p className="text-sm">Suggest Information</p>
            </div>
          </div>

          <Card className="bg-white w-full mt-6 flex flex-col sm:flex-row justify-between sm:items-center">
            <div className="mb-4 md:mb-0 flex justify-start items-center">
              <figure className="rounded-md w-[56px] h-[56px] overflow-hidden mr-2">
                <img
                  className="w-full h-full object-cover"
                  src={data?.data?.profile?.organizationLogo || OrgImg}
                  alt="org logo"
                />
              </figure>

              <div className="">
                <a
                  href={profileData?.website}
                  target="_blank"
                  className="text-xl font-bold w-[150px] h-[22px] truncate text-ellipsis overflow-hidden mb-1"
                >
                  {profileData?.organizationName}
                </a>
                <span className="text-grey-200 font-light text-xs flex items-center">
                  <p>{profileData?.industry}</p>
                  <BsDot className="text-xl" />
                  <p>{profileData?.location}</p>
                </span>
              </div>
            </div>

            {confirmData?.data ? null : (
              <PrimaryBtn
                Icon={GoBookmark}
                text="Add to watchlist"
                onClick={addToWatchList}
              />
            )}
          </Card>

          <div className="mt-6 flex flex-col justify-start items-start lg:flex-row">
            <div className="scrollbar-hide w-full overflow-scroll flex flex-row lg:flex-col lg:w-[240px] mb-4 lg:mb-0 lg:mr-8">
              {orgTab.map((tab, index) => {
                const { name } = tab;

                return (
                  <div
                    onClick={() => setActiveTab(name)}
                    key={index}
                    className={`w-fit whitespace-nowrap md:w-full cursor-pointer text-sm text-left text-grey-400 rounded-md font-light py-1 px-2 mr-3 lg:mr-0 lg:mb-1 last:mb-0 transition-all duration-300 ${
                      activeTab === name && "text-white bg-grey-900"
                    } hover:bg-grey-300 hover:text-white`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>

            <Card className="bg-white">
              <div className="border-b border-grey-50 pb-3">
                <p className="font-bold text-grey-900 text-xl">{activeTab}</p>
              </div>

              <div className="mt-6">
                {activeTab === "Profile" && (
                  <ProfileTab profileData={profileData} />
                )}
                {activeTab === "Financial Statements" && (
                  <FinancialStatementsTab data={financialStatements} />
                )}
                {activeTab === "Management" && (
                  <ManagementTab data={data?.data?.management} />
                )}
                {activeTab === "Bankruptcy History" && (
                  <BankruptcyHistoryTab data={data?.data?.creditHistory} />
                )}
                {activeTab === "Tax Compliance" && (
                  <TaxComplianceTab data={data?.data?.taxCompliance} />
                )}
                {activeTab === "Legal/Regulatory" && (
                  <LegalRegulatoryTab data={data?.data.legalRegulatory} />
                )}
                {/* {activeTab === "Credit Reports" && <CreditReportTab data={data?.data.creditHistory} />} */}
                {activeTab === "Contractual Obligations" && (
                  <ContractualObligationsTab
                    data={data?.data.contractualObligations}
                  />
                )}
                {activeTab === "Environmental Compliance" && (
                  <EnvironmentalComplianceTab
                    data={data?.data?.environmentalCompliance}
                  />
                )}
                {activeTab === "Insurance Coverage" && (
                  <InsuranceCoverageTab data={data?.data.insuranceCoverage} />
                )}
                {activeTab === "Supply Chain Information" && (
                  <SupplyChainTab data={data?.data.supplyChainInformation} />
                )}
                {/* {activeTab === "References/Reputation" && (
                  <ReferencesTab data={data?.data.referencesReputation} />
                )} */}
                {activeTab === "Ownership Structure" && (
                  <OwnershipStructureTab data={data?.data.ownershipStructure} />
                )}

                <div className="flex justify-end">
                  <Link
                    to={`/home/organisation/${id}/request/${profileData?.organizationName}`}
                    className="flex pt-6"
                  >
                    <PrimaryBtn text="Request Record" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default OrganisationProfile;
