import Executive from "@/components/svgs/Executive";
import Organisation from "@/components/svgs/Organisation";
import Bin from "@/components/svgs/Bin";
// import OrganisationCard from "./OrganisationCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllWatchList,
  removeWaitlistMultiple,
} from "@/services/watchlistServices";
import { TWatchList } from "@/types/watchlistTypes";
import { useState } from "react";

import ExecutiveList from "./Lists/ExecutiveList";
import OrganisationWatchList from "./Lists/OrganisationWatchList";
import Toast from "@/config/Toast";
import NoWatchlistImg from "@/assets/images/no_watchlist.png";
import NoState from "@/components/nostate";
// import ExecutiveCard from "./ExecutiveCard";

function WatchlistPage() {
  const [filter, setFilter] = useState<string>("all");
  const [watchListId, setWatchListId] = useState<string[]>([]);

  const handleFilter = (value: string) => {
    if (value === filter) {
      setFilter("all");
    } else {
      setFilter(value);
    }
  };

  const queryClient = useQueryClient();

  const { data } = useQuery(["getAllWatchList"], getAllWatchList);
  const newData = data?.data?.result;

  const executiveEntries = data?.data?.result.filter(
    (item) => item.profileType === "executive",
  );

  const organisationEntries = data?.data?.result?.filter(
    (item) => item.profileType === "organization",
  );

  const { mutate: removeList } = useMutation(removeWaitlistMultiple, {
    onError: (error) => {
      console.log(error);
      Toast.error("failed");
    },
    onSuccess: (data) => {
      Toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["getAllWatchList"] });
    },
  });

  const toggleWatchList = (value: string) => {
    if (watchListId.includes(value)) {
      const filterValues = watchListId.filter((orgId) => orgId !== value);
      setWatchListId(filterValues);
    } else {
      setWatchListId([...watchListId, value]);
    }
  };

  const removeWatchList = () => {
    removeList({ waitlistIds: watchListId });
  };

  return (
    <main className="relative pb-6 text-grey-900 sm:bg-white sm:min-h-screen sm:px-6 sm:pt-6 sm:pb-10 md:px-10">
      <div className="h-[80vh] w-full">
        {newData?.length === 0 ? (
          <div className="h-[80vh]">
            <NoState
              img={NoWatchlistImg}
              title="Your Watchlist is Empty"
              description="Add profiles to your watchlist to stay updated about their activities."
            />
          </div>
        ) : (
          <>
            <h1 className="text-grey-900 font-bold text-2xl mb-6">
              Watchlist{" "}
            </h1>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleFilter("organisation")}
                className={`flex items-center gap-2 border-grey-400 outline-none border-t border-r-2 border-b-2 border-l rounded-full py-[6px] px-4 font-semibold ${
                  filter === "organisation"
                    ? "bg-grey-900 text-white"
                    : "bg-transparent"
                }`}
              >
                <Organisation /> <span>Organisations</span>
              </button>
              <button
                onClick={() => handleFilter("executive")}
                className={`flex items-center gap-2 border-grey-400 outline-none border-t border-r-2 border-b-2 border-l rounded-full py-[6px] px-4 font-semibold ${
                  filter === "executive"
                    ? "bg-grey-900 text-white"
                    : "bg-transparent"
                }`}
              >
                <Executive /> <span>Executives</span>
              </button>
            </div>
            {filter === "all" && !!newData?.length && (
              <p className="font-semibold text-xl mb-5">
                {newData?.length} {newData?.length > 1 ? "Entries" : "Entry"}{" "}
              </p>
            )}
            {filter === "executive" && !!executiveEntries?.length && (
              <p className="font-semibold text-xl mb-5">
                {executiveEntries.length}{" "}
                {executiveEntries.length > 1
                  ? "saved executives"
                  : "saved executive"}{" "}
              </p>
            )}
            {filter === "organisation" && !!organisationEntries?.length && (
              <p className="font-semibold text-xl mb-5">
                {organisationEntries.length}{" "}
                {organisationEntries.length > 1
                  ? "saved organisations"
                  : "saved organisation"}{" "}
              </p>
            )}

            {!!watchListId.length && (
              <div className="flex space-x-4 rounded-lg shadow-md p-3 my-4">
                <p className="text-sm font-light">
                  {watchListId.length} profiles selected
                </p>
                <p
                  onClick={removeWatchList}
                  className="text-red-500 flex items-center gap-2 cursor-pointer"
                >
                  <Bin /> <span className="text-sm font-light">Remove</span>
                </p>
              </div>
            )}

            <section className="mb-3 space-y-4">
              {filter === "all" ? (
                newData?.map((item: TWatchList) => (
                  <div key={`${item._id}-ALL`}>
                    {item.profileType === "organization" ? (
                      <OrganisationWatchList
                        key={`${item._id}-ALL-organization`}
                        data={item}
                        watchListId={watchListId}
                        toggleWatchList={toggleWatchList}
                      />
                    ) : item.profileType === "executive" ? (
                      <ExecutiveList
                        watchListId={watchListId}
                        key={`${item._id}-ALL-executive`}
                        data={item}
                        toggleWatchList={toggleWatchList}
                      />
                    ) : null}
                  </div>
                ))
              ) : filter === "executive" ? (
                newData
                  ?.filter(
                    (item: TWatchList) => item.profileType === "executive",
                  )
                  .map((item: TWatchList) => (
                    <ExecutiveList
                      key={`${item._id}-executive-alone`}
                      watchListId={watchListId}
                      data={item}
                      toggleWatchList={toggleWatchList}
                    />
                  ))
              ) : (
                <div className="flex flex-col gap-5 sm:flex-wrap">
                  {newData
                    ?.filter(
                      (item: TWatchList) => item.profileType === "organization",
                    )
                    .map((item: TWatchList) => (
                      <OrganisationWatchList
                        key={`${item._id}-ALL-organization`}
                        data={item}
                        watchListId={watchListId}
                        toggleWatchList={toggleWatchList}
                      />
                      // <OrganisationCard
                      //   key={item.organizationId}
                      //   id={item._id}
                      //   type={"organisation"}
                      //   image={item.organizationLogo}
                      //   location={item.location}
                      //   organisationName={item.organizationName}
                      //   industry={item.industry}
                      // />
                    ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default WatchlistPage;
