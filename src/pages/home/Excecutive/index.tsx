import { useState } from "react";
import {
  ContractualObligationsTab,
  CreditReportTab,
  FinancialStatementsTab,
  InsuranceCoverageTab,
  LegalRegulatoryTab,
  ProfileTab,
  ReferencesTab,
  TaxComplianceTab,
} from "./TabCards";
import { PrimaryBtn } from "@/components";
import { GoBookmark, GoPencil } from "react-icons/go";

import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "@/types/organizationTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAnExecutive } from "@/services/organizationServices";
import {
  confirmWatchList,
  createWatchList,
} from "@/services/watchlistServices";
import Toast from "@/config/Toast";
import { queryClient } from "@/config";
import SuggestionForm from "./SuggestionForm";
import { BiArrowBack } from "react-icons/bi";

const ExecutivePage = () => {
  const [step, setStep] = useState(1);

  const { id } = useParams() as unknown as RouteParams;
  const navigate = useNavigate();

  const { data } = useQuery(["getAnExecutive", id], () =>
    getAnExecutive(id as string),
  );
  const [isSuggestionForm, setSuggestionForm] = useState<boolean>(false);

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
        flags: "executiveId",
      }),
    {
      enabled: !!id,
    },
  );

  const addToWatchList = () => {
    mutate({
      id: id,
      payload: {
        profileType: "executive",
      },
    });
  };

  const profileData = data?.data?.profile;
  const financialData = data?.data?.financialStatements;
  const creditData = data?.data?.creditHistory;
  const TaxData = data?.data?.taxCompliance;
  const legalData = data?.data?.legalRegulatory;
  const contractualData = data?.data?.contractualObligations;
  const insuranceData = data?.data?.insuranceCoverage;
  const refData = data?.data?.referencesReputation;

  const tabs = [
    {
      id: 1,
      name: "Profile",
    },
    {
      id: 2,
      name: "Financial Statements",
    },
    {
      id: 3,
      name: "Credit Reports",
    },
    {
      id: 4,
      name: "Tax Compliance",
    },
    {
      id: 5,
      name: "Legal/Regulatory",
    },
    {
      id: 6,
      name: "Contractual Obligations",
    },
    {
      id: 7,
      name: "Insurance Coverage",
    },
    {
      id: 8,
      name: "References",
    },
  ];

  const displayTab = () => {
    switch (step) {
      case 1:
        return <ProfileTab profileData={profileData} />;
      case 2:
        return <FinancialStatementsTab financialData={financialData} />;
      case 3:
        return <CreditReportTab creditData={creditData} />;
      case 4:
        return <TaxComplianceTab data={TaxData} />;
      case 5:
        return <LegalRegulatoryTab data={legalData} />;
      case 6:
        return <ContractualObligationsTab data={contractualData} />;
      case 7:
        return <InsuranceCoverageTab data={insuranceData} />;
      case 8:
        return <ReferencesTab data={refData} />;
      default:
    }
  };

  const handleTab = (value: number) => {
    setStep(value);
  };

  return (
    <>
      {isSuggestionForm ? (
        <SuggestionForm
          executiveName={profileData?.executiveName}
          organizationName={profileData?.organizationName}
          isSuggestionForm={isSuggestionForm}
          setSuggestionForm={setSuggestionForm}
        />
      ) : (
        <div className="bg-white p-6 space-y-4">
          <div className="w-full flex justify-between">
            <div
              onClick={() => navigate(-1)}
              className="flex justify-start items-center cursor-pointer transition-all duration-150 text-grey-400 hover:text-grey-900"
            >
              <BiArrowBack className="mr-1" />
              <p className="text-sm">Back</p>
            </div>
            <div
              onClick={() => setSuggestionForm(!isSuggestionForm)}
              className="w-fit flex justify-end items-center cursor-pointer transition-all duration-150 text-grey-400 hover:text-grey-900"
            >
              <GoPencil className="mr-1" />
              <p className="text-sm">Suggest Information</p>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border-[1px] border-grey-100 rounded-lg">
            <div className="flex space-x-4 items-center">
              <div className="rounded-md w-[56px] h-[56px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={data?.data?.executiveAvatar}
                  alt="Executive logo"
                />
              </div>

              <div>
                <p className="font-semibold">{profileData?.executiveName}</p>
                <div className="flex text-sm space-x-2">
                  <p>{profileData?.executivePosition}</p>
                  <a
                    href={profileData?.website}
                    target="_blank"
                    className="hover:underline"
                  >
                    {profileData?.organizationName}
                  </a>
                </div>
              </div>
            </div>
            {confirmData?.data ? null : (
              <PrimaryBtn
                Icon={GoBookmark}
                text="Add to watchlist"
                onClick={addToWatchList}
              />
            )}
          </div>
          <div className="flex space-x-6">
            <div className="min-w-[200px] flex flex-col ">
              {tabs.map((tab, index) => {
                return (
                  <div
                    onClick={() => handleTab(tab.id)}
                    key={index}
                    className={`w-fit whitespace-nowrap md:w-full cursor-pointer text-sm text-left text-grey-400 rounded-md font-light py-1 px-2 mr-3 lg:mr-0 lg:mb-1 last:mb-0 transition-all duration-300 ${
                      step === tab.id && "text-white bg-grey-900"
                    } hover:bg-grey-900 hover:text-white`}
                  >
                    {tab.name}
                  </div>
                );
              })}
            </div>

            <div className="border-grey-100 rounded-xl p-4 border-[1px] w-full">
              {displayTab()}

              <div className="flex justify-end">
                <Link
                  to={`/home/executive/${id}/request/${profileData?.executiveName}`}
                  className="flex pt-6"
                >
                  <PrimaryBtn text="Request Record" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExecutivePage;
