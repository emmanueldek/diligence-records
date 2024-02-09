import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar, SideBar } from "@/components";
import SearchResult from "@/pages/home/SearchResult";

function PageLayout() {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const searchQuery = searchParams.get("search");

  return (
    <div className="w-full flex">
      <div
        className={`fixed lg:static z-50 w-[250px] h-[100vh]  transition-transform -translate-x-full bg-white lg:translate-x-0 ${
          openNav ? "translate-x-0 z-50" : "-translate-x-full"
        }`}
      >
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
      </div>
      <div
        className={`fixed opacity-40 top-0 left-0 z-40 w-full h-screen md:pt-16 transition-transform -translate-x-full bg-white lg:translate-x-0  lg:hidden ${
          openNav ? "translate-x-0 z-40" : "-translate-x-full"
        }`}
      ></div>

      <div className="w-full lg:w-[calc(100vw-250px)] h-full">
        <NavBar openNav={openNav} setOpenNav={setOpenNav} />

        <div className="px-2 lg:px-4 py-4 h-[calc(100vh-50px)] scrollbar-hide overflow-y-scroll">
          {searchQuery ? <SearchResult /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
