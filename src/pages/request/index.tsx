import { PrimaryBtn } from "@/components";
import { useState } from "react";
import OrganisationTable from "./OrganisationTable";
import ExecutivesTable from "./ExecutivesTable";
import RecordsTable from "./RecordsTable";
import {
  getExectiveRequests,
  getOrganizationRequests,
  getRecordsRequests,
} from "@/services/request";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

type tabView = "organisations" | "executives" | "records";

const Request = () => {
  const [tabView, setTabView] = useState<tabView>("organisations");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const { data: executiveRequests, isLoading: isExecutiveReqestLoading } =
    useQuery(["request-executives", currentPage, debouncedSearchValue], () =>
      getExectiveRequests(currentPage, debouncedSearchValue),
    );
  const {
    data: organizationsRequests,
    isLoading: isOrganizationsReqestLoading,
  } = useQuery(
    ["request-organizations", currentPage, debouncedSearchValue],
    () => getOrganizationRequests(currentPage, debouncedSearchValue),
  );
  const { data: recordsRequests, isLoading: isRecordsReqestLoading } = useQuery(
    ["request-records", currentPage, debouncedSearchValue],
    () => getRecordsRequests(currentPage, debouncedSearchValue),
  );

  return (
    <main className="relative pb-6 text-grey-900 sm:bg-white sm:min-h-screen sm:px-6 sm:pt-6 sm:pb-10 md:px-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-grey-900 font-bold text-xl md:text-2xl">
          Requests{" "}
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-40 h-10 items-center justify-between rounded-lg bg-grey-50 gap-1 px-3 hidden md:flex">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7136 12.2857L10.1165 9.68755C10.8952 8.6728 11.2588 7.39985 11.1334 6.12692C11.0081 4.85399 10.4032 3.67639 9.44157 2.83301C8.47992 1.98963 7.23346 1.54362 5.95506 1.58546C4.67665 1.6273 3.46203 2.15385 2.55757 3.05831C1.65312 3.96276 1.12657 5.17739 1.08473 6.45579C1.04289 7.7342 1.4889 8.98065 2.33228 9.94231C3.17566 10.904 4.35325 11.5088 5.62619 11.6341C6.89912 11.7595 8.17207 11.3959 9.18681 10.6172L11.7861 13.2171C11.8472 13.2781 11.9196 13.3265 11.9994 13.3596C12.0791 13.3926 12.1646 13.4096 12.251 13.4096C12.3373 13.4096 12.4228 13.3926 12.5025 13.3596C12.5823 13.3265 12.6548 13.2781 12.7158 13.2171C12.7768 13.156 12.8253 13.0836 12.8583 13.0038C12.8913 12.924 12.9083 12.8386 12.9083 12.7522C12.9083 12.6659 12.8913 12.5804 12.8583 12.5007C12.8253 12.4209 12.7768 12.3484 12.7158 12.2874L12.7136 12.2857ZM2.40556 6.62505C2.40556 5.88955 2.62367 5.17057 3.03229 4.55902C3.44091 3.94747 4.0217 3.47083 4.70121 3.18937C5.38072 2.90791 6.12844 2.83426 6.84981 2.97775C7.57117 3.12124 8.23379 3.47542 8.75387 3.99549C9.27394 4.51557 9.62812 5.17819 9.77161 5.89956C9.9151 6.62092 9.84145 7.36864 9.55999 8.04815C9.27853 8.72766 8.80189 9.30845 8.19034 9.71707C7.5788 10.1257 6.85981 10.3438 6.12431 10.3438C5.13835 10.3428 4.19306 9.95066 3.49588 9.25348C2.7987 8.5563 2.40658 7.61101 2.40556 6.62505Z"
                fill="#353740"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full border-none outline-none bg-transparent text-sm"
            />
          </div>
          <span className="h-9 border border-grey-50 hidden md:inline-block"></span>
          <div className="w-40">
            <PrimaryBtn
              text="+ Make a Request"
              onClick={() => navigate("new")}
            />
          </div>
        </div>
      </div>
      <section>
        <div className="mb-6 flex border-b border-[#F2F2F2]">
          <p
            onClick={() => setTabView("organisations")}
            className={`py-1 px-3 cursor-pointer flex items-center gap-2 text-sm sm:text-base sm:py-2 md:text-lg md:px-6 ${
              tabView === "organisations"
                ? "border-b-2 border-grey-900 text-grey-900 font-bold "
                : "border-none font-medium text-grey-400"
            }`}
          >
            <span>Organisations</span>
            {!!organizationsRequests?.data?.data?.result?.length && (
              <span className="bg-grey-100 text-sm font-bold p-1 rounded-md">
                {organizationsRequests?.data?.data?.count}
              </span>
            )}
          </p>
          <p
            onClick={() => setTabView("executives")}
            className={`py-1 px-3 cursor-pointer  flex items-center gap-2 text-sm sm:text-base sm:py-2 md:px-6  md:text-lg ${
              tabView === "executives"
                ? "border-b-2 border-grey-900 text-grey-900 font-bold "
                : "border-none font-medium text-grey-400"
            }`}
          >
            <span>Executives</span>
            {!!executiveRequests?.data?.data?.result?.length && (
              <span className="bg-grey-100 text-sm font-bold p-1 rounded-md">
                {executiveRequests?.data?.data?.count}
              </span>
            )}
          </p>
          <p
            onClick={() => setTabView("records")}
            className={`py-1 px-3 cursor-pointer flex items-center gap-2 text-sm sm:text-base sm:py-2 md:px-6 md:text-lg ${
              tabView === "records"
                ? "border-b-2 border-grey-900 text-grey-900 font-bold "
                : "border-none font-medium text-grey-400"
            }`}
          >
            <span>Records</span>
            {!!recordsRequests?.data?.data?.result?.length && (
              <span className="bg-grey-100 text-sm font-bold p-1 rounded-md">
                {recordsRequests?.data?.data?.count}
              </span>
            )}
          </p>
        </div>
      </section>
      {tabView === "organisations" ? (
        <OrganisationTable
          data={organizationsRequests?.data?.data?.result}
          isLoading={isOrganizationsReqestLoading}
          count={organizationsRequests?.data?.data?.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : tabView === "executives" ? (
        <ExecutivesTable
          data={executiveRequests?.data?.data?.result}
          count={executiveRequests?.data?.data?.count}
          isLoading={isExecutiveReqestLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <RecordsTable
          data={recordsRequests?.data?.data?.result}
          count={recordsRequests?.data?.data?.count}
          isLoading={isRecordsReqestLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
};

export default Request;
