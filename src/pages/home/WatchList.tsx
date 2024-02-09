import { Wrapper } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getAllWatchList } from "@/services/watchlistServices";
import { Link, useNavigate } from "react-router-dom";
import NoWatchlistImg from "@/assets/images/no_watchlist.png";
import NoState from "@/components/nostate";

function WatchList() {
  const navigate = useNavigate();
  const { data: waitList } = useQuery(["waitlist"], getAllWatchList);
  const newData = waitList?.data?.result;

  return (
    <Wrapper className="bg-white w-[100%]">
      {newData?.length === 0 ? (
        <>
          <NoState
            img={NoWatchlistImg}
            title="Your Watchlist is Empty"
            description="Add profiles to your watchlist to stay updated about their activities."
          />
        </>
      ) : (
        <div className="">
          <h1 className="text-xl font-medium">Watchlist</h1>
          {newData?.map((datum, index) => {
            return (
              <div
                onClick={() =>
                  navigate(
                    `${
                      datum?.profileType === "executive"
                        ? `/home/executive/${datum.executiveId}`
                        : `/home/organisation/${datum?.organizationId}`
                    }`,
                  )
                }
                key={index}
                className="flex items-center py-3 border-b border-grey-50 space-x-3 cursor-pointer"
              >
                <figure className="w-[24px] h-[24px] rounded-sm overflow-hidden">
                  <img
                    src={
                      datum?.profileType === "executive"
                        ? datum?.executiveAvatar
                        : datum?.organizationLogo
                    }
                    className="w-full h-full"
                    alt="logo"
                  />
                </figure>

                <p className="w-[70%] text-sm">
                  {datum?.profileType === "executive"
                    ? datum?.executiveName
                    : datum?.organizationName}
                </p>
              </div>
            );
          })}

          <div className="flex items-center justify-center">
            <Link
              to="watchlist"
              className="text-sm py-4 text-grey-200 hover:text-grey-900 transition-all duration-300 cursor-pointer"
            >
              See All &#8594;
            </Link>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default WatchList;
