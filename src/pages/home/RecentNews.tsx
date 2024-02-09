import { Wrapper } from "@/components";
import NoStateImg from "@/assets/images/announcement.png";
import { ImReply } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/home";
import { useState } from "react";
import { TArticle } from "@/types/homeTypes";
import { timeAgo } from "@/libs/TimeAgo";
import NoState from "@/components/nostate";

type TProps = {
  data?: TArticle;
};

const NewsCard = ({ data }: TProps) => {
  return (
    <div className="cursor-pointer flex flex-col md:flex-row justify-start items-start py-4 border-b border-grey-50 last:border-0 w-[100%]">
      <div className="w-[200px] h-[150px] rounded-md overflow-hidden mr-4">
        <img
          className="w-full h-full object-cover"
          src={data?.image}
          alt="news-img"
        />
      </div>

      <div className="w-[70%] space-y-2">
        <div className="flex items-center">
          {/* <div className="w-[30px] rounded-full overflow-hidden mr-2">
            <img className="w-full h-full" src={BrandLogo} alt="brand" />
          </div> */}
          {/* <p className="mr-2 text-sm text-grey-900">Coca-Cola Nigeria</p> */}
          {/* <p className="mr-2 text-xs font-light text-grey-200">
            {timeAgo(data?.publishedAt as string)}
          </p> */}
        </div>

        <h2 className="mt-2 text-grey-900 text-lg font-medium leading-[25px] w-full truncate text-ellipsis overflow-hidden">
          {data?.title}
        </h2>

        <p className="font-light text-grey-400 leading-[19px] w-full  text-ellipsis text-sm md:w-[90%]">
          {data?.description}
        </p>

        <div className="flex justify-start items-center text-sm space-x-4">
          <ImReply className=" rotate-[180deg]" />
          <a href={data?.source.url} target="_blank">
            {data?.source.name}
          </a>
          <p className="mr-2 text-xs font-light text-grey-200">
            {timeAgo(data?.publishedAt as string)}
          </p>
        </div>
      </div>
    </div>
  );
};

function RecentNews() {
  const [page] = useState(1);
  const { data } = useQuery(["getAllNews", page], () => getAllNews(page));

  const newData = data?.data?.articles;
  return (
    <Wrapper className="bg-white">
      <h1 className="text-2xl font-semibold">Recent News</h1>

      <div className="h-[80vh] transition-all duration-150 scrollbar-hide overflow-hidden hover:overflow-y-scroll">
        {newData?.length === 0 || newData === undefined ? (
          <>
            <NoState
              img={NoStateImg}
              title="Nothing Here Yet!"
              description="Add more profiles to your watchlist to see latest news about them."
            />
          </>
        ) : (
          newData?.map((el, i) => {
            return <NewsCard key={`${i}-news`} data={el} />;
          })
        )}
      </div>
    </Wrapper>
  );
}

export default RecentNews;
