import React, { SetStateAction, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "./data";
import { RecordsLogo } from "../svgs";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "@/services/auth";
import { TUserResponseSchema } from "@/types";

interface ISideBarProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<SetStateAction<boolean>>;
}

function SideBar({ openNav, setOpenNav }: ISideBarProps) {
  const [user, setUser] = useState<TUserResponseSchema>();

  const { data: userData } = useQuery(["currentUser"], currentUser);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const notActiveStyles =
    "flex justify-start items-center mb-2 p-2 transition-all duration-150 hover:border-l-2 font-light text-grey-400 hover:border-grey-900 hover:bg-grey-50 hover:text-grey-900";

  const activeStyles =
    "flex justify-start items-center mb-2 p-2 transition-all duration-150 hover:border-l-2 font-light text-grey-400 hover:border-grey-900 hover:bg-grey-50 hover:text-grey-900 border-l-2 border-grey-900 bg-grey-50 text-grey-900 font-bold";

  return (
    <aside className="w-full h-full bg-white shadow md:shadow-none">
      <div className="w-full px-3">
        <div className="">
          <div className="flex justify-between items-center py-4 mb-4">
            <div className="lg:scale-90">
              <RecordsLogo />
            </div>

            <IoMdClose
              className="font-black text-xl cursor-pointer lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            />
          </div>

          <div>
            {sidebarItems.map((item, index) => {
              const { name, pathname, Icon } = item;

              return (
                <>
                  {user?.role === "member" && name === "Manage workspace" ? (
                    ""
                  ) : (
                    <NavLink
                      key={index}
                      to={{ pathname }}
                      onClick={() => setOpenNav(false)}
                      className={({ isActive }) =>
                        isActive ? activeStyles : notActiveStyles
                      }
                    >
                      <Icon className="mr-1 stroke-1" />
                      <p className="text-sm">{name}</p>
                    </NavLink>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
