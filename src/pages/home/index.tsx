import { useNavigate } from "react-router-dom";
import RecentNews from "./RecentNews";
import WatchList from "./WatchList";
import { Card, PrimaryBtn } from "@/components";

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="">
      <div className="w-full flex justify-start items-start flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-[70%] lg:mr-4">
          <RecentNews />
        </div>

        <div className="w-full lg:w-[30%]">
          <Card className="bg-white mb-4 w-full">
            <h2 className="font-bold text-xl mb-4">Add New Profile</h2>

            <div className="flex justify-end">
              <PrimaryBtn
                onClick={() => navigate("/request/new")}
                className="w-full"
                text="Make a request"
              />
            </div>
          </Card>

          <div className="w-full hidden xl:block">
            <WatchList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
