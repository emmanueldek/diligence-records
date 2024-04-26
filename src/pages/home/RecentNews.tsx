import { Wrapper } from "@/components";
import NoStateImg from "@/assets/images/announcement.png";
import { ImReply } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/home";
import { useState } from "react";
// import { TArticle } from "@/types/homeTypes";
import NoState from "@/components/nostate";
import n1 from "@/assets/images/news-icons/n1.jpeg";
import n2 from "@/assets/images/news-icons/n2.jpeg";
import n3 from "@/assets/images/news-icons/n3.jpeg";
import n4 from "@/assets/images/news-icons/n4.jpeg";
import n5 from "@/assets/images/news-icons/n5.jpeg";
import n6 from "@/assets/images/news-icons/n6.jpeg";
import n7 from "@/assets/images/news-icons/n7.jpeg";
import n8 from "@/assets/images/news-icons/n8.jpeg";
import n9 from "@/assets/images/news-icons/n9.jpeg";
import n10 from "@/assets/images/news-icons/n10.jpeg";
import n11 from "@/assets/images/news-icons/n11.jpeg";
import n12 from "@/assets/images/news-icons/n12.jpeg";
import n13 from "@/assets/images/news-icons/n13.jpeg";
import n14 from "@/assets/images/news-icons/n14.jpeg";
import n15 from "@/assets/images/news-icons/n15.jpeg";
import n16 from "@/assets/images/news-icons/n16.jpeg";

type TProps = {
  data?: any;
};

const NewsCard = ({ data }: TProps) => {
  return (
    <a
      href={data?.url}
      target="_blank"
      className="cursor-pointer flex flex-col md:flex-row justify-start items-start py-4 border-b border-grey-50 last:border-0 w-[100%] hover:scale-95 transition-all ease-in-out duration-300"
    >
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
          {data?.description.substring(0, 200) + "..."}
        </p>

        <div className="flex justify-start items-center text-sm space-x-4">
          <ImReply className=" rotate-[180deg]" />
          <a href={data?.url} target="_blank">
            {data?.source.charAt(0).toUpperCase() + data?.source.slice(1)}
          </a>
          {/* <p className="mr-2 text-xs font-light text-grey-200">
            {timeAgo(data?.publishedAt as string)}
          </p> */}
        </div>
      </div>
    </a>
  );
};

function RecentNews() {
  const [page] = useState(1);
  const { data } = useQuery(["getAllNews", page], () => getAllNews(page));

  const newsPlaceholders = [
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    n11,
    n12,
    n13,
    n14,
    n15,
    n16,
  ];

  const newData = data?.data?.data?.data;

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomIndex = 0;

  let formattedNewsData = newData?.map((news: any) => {
    for (let index = 0; index <= newData.length; index++) {
      randomIndex = getRandomIntInclusive(0, 16);
    }

    return {
      ...news,
      image: newsPlaceholders[randomIndex],
    };
  });

  return (
    <Wrapper className="bg-white">
      <h1 className="text-2xl font-semibold">Recent News</h1>

      <div className="h-[80vh] transition-all duration-150 scrollbar-hide overflow-hidden hover:overflow-y-scroll">
        {newData?.length === 0 ? (
          <NoState
            img={NoStateImg}
            title="Nothing Here Yet!"
            description="Add more profiles to your watchlist to see latest news about them."
          />
        ) : (
          formattedNewsData?.map((el, i) => {
            return <NewsCard key={`${i}-news`} data={el} />;
          })
        )}
      </div>
    </Wrapper>
  );
}

export default RecentNews;
