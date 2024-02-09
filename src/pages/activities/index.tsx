import { Wrapper } from "@/components";
import { useState } from "react";
import ActivityCard from "./ActivityCard";
import { useQuery } from "@tanstack/react-query";
import { getAudit } from "@/services/request";
import { TAuditSchema } from "@/types";
import NoWatchlistImg from "@/assets/images/no_watchlist.png";
import NoState from "@/components/nostate";

// const activityData: Array<TActivity> = [
//   {
//     action: "update",
//     type: "executive",
//     time: "1hr ago",
//     record: "Credit Record",
//     name: "Coca-Cola Nigeria",
//   },
//   {
//     action: "add",
//     type: "organisation",
//     time: "1hr ago",
//     record: "Tax Record",
//     name: "Coca-Cola Nigeria",
//   },

//   {
//     action: "delete",
//     type: "executive",
//     time: "1hr ago",
//     record: "Enviromental Record",
//     name: "Coca-Cola Nigeria",
//   },
//   {
//     action: "update",
//     type: "executive",
//     time: "1hr ago",
//     record: "Credit Record",
//     name: "Coca-Cola Nigeria",
//   },
//   {
//     action: "delete",
//     type: "executive",
//     time: "1hr ago",
//     record: "Enviromental Record",
//     name: "Coca-Cola Nigeria",
//   },
//   {
//     action: "add",
//     type: "organisation",
//     time: "1hr ago",
//     record: "Tax Record",
//     name: "Coca-Cola Nigeria",
//   },
// ];

function Activities() {
  const [batch] = useState(1);
  const { data: auditTrail, isLoading } = useQuery(
    ["requests-audit", batch],
    () => getAudit(batch),
  );

  return (
    <main className="w-full">
      <Wrapper className="w-full bg-white px-0">
        <h1 className="text-xl font-bold leading-[2px] p-4">Activities</h1>

        <div className="mt-4">
          {isLoading ? (
            [1, 2, 3, 4, 5].map((_, index: number) => (
              <div
                key={index}
                className="bg-grey-50 mx-auto h-20 mb-5 animate-pulse"
              ></div>
            ))
          ) : auditTrail?.data?.result?.length == 0 ? (
            <>
              <NoState
                img={NoWatchlistImg}
                title="You have no activity"
                description="All your activities will appear here once they are available."
              />
            </>
          ) : (
            auditTrail?.data?.result?.map((item: TAuditSchema) => (
              <ActivityCard key={item?._id} activity={item} />
            ))
          )}
        </div>
      </Wrapper>
    </main>
  );
}

export default Activities;
