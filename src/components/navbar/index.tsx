import React, { SetStateAction, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config";
import { currentUser } from "@/services/auth";
import { useGlobalSearch, useUser } from "@/store";
import { useOutsideClick } from "@/hooks";
import { CgMenu, CgProfile } from "react-icons/cg";
import { GoChevronDown } from "react-icons/go";
import { PiUserBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { RiSearch2Line } from "react-icons/ri";
import { PrimaryBtn } from "..";
import Loader from "../Loader";
import { PATHNAMES } from "@/utils/routes";
import { getAuthToken, removeToken } from "@/helpers/authTokens";

interface INavBarProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<SetStateAction<boolean>>;
}

const AnonymousUser = () => {
  return (
    <span className="flex justify-center items-center w-[24px] h-[24px] overflow-hidden bg-grey-900 rounded-full">
      <PiUserBold className="text-white" />
    </span>
  );
};

function NavBar({ openNav, setOpenNav }: INavBarProps) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const token = getAuthToken();
  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery(["currentUser"], currentUser, {
    enabled: !!token,
  });

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useOutsideClick(() => setOpenProfile(false));
  const { value, handleChange, handleIsSearching } = useGlobalSearch();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser({});
    }
  }, [isLoading, isFetching, setUser, userData]);

  if (isFetching) {
    return <Loader />;
  }

  // if (!userData) {
  //   navigate("/auth/login");
  // }

  const handleLogout = () => {
    removeToken("authToken");
    removeToken("workspaceToken");
    queryClient.clear();
  };

  console.log(user.avatar);
  return (
    <nav className="bg-white w-full shadow sm:shadow-none">
      <div className="px-2 lg:px-1 py-3 flex justify-between items-center">
        <div className="w-full flex justify-between items-center lg:hidden">
          <div
            onClick={() => {
              setOpenProfile(!openProfile);
            }}
          >
            <AnonymousUser />
          </div>

          <input
            id="search"
            name="search"
            placeholder="Search Records"
            className="w-[80%] sm:w-[90%] ring-1 ring-grey-50 bg-grey-50 rounded-md px-2 py-1.5 outline-0 focus:ring-grey-100 text-sm placeholder:font-medium placeholder:text-grey-400"
            value={value}
            onChange={handleChange}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
              event.key === "Enter" && navigate(`/?search=${value}`)
            }
            onBlur={() => {
              if (!value) {
                handleIsSearching(false);
              }
            }}
          />
          <CgMenu
            onClick={() => setOpenNav(!openNav)}
            className="text-2xl text-grey-900 lg:hidden"
          />
        </div>

        <div className="hidden lg:flex justify-between items-center  sm:w-full sm:px-2 lg:px-2">
          <div className="flex sm:hidden items-center">
            <CgMenu
              onClick={() => setOpenNav(!openNav)}
              className="text-2xl text-grey-900  mr-2"
            />
          </div>

          <div className="flex justify-between items-center  sm:w-full sm:px-2 lg:px-2">
            <RiSearch2Line
              onClick={() => setOpenNav(!openNav)}
              className="text-xl mr-2 sm:hidden"
            />

            <div className="hidden lg:flex justify-start items-center">
              <input
                id="search"
                name="search"
                placeholder="Search Records"
                className="ring-1 ring-grey-50 bg-grey-50 rounded-md px-3 py-1.5 mr-2 outline-0 focus:ring-grey-100 text-sm placeholder:font-medium w-64 placeholder:text-grey-400 outline-none"
                value={value}
                onChange={handleChange}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  event.key === "Enter" && navigate(`?search=${value}`)
                }
                onBlur={() => {
                  if (!value) {
                    handleIsSearching(false);
                  }
                }}
              />
              <PrimaryBtn
                onClick={() => navigate(`?search=${value}`)}
                text="Search"
              />
            </div>
            <div className="hidden md:block">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setOpenProfile(!openProfile);
                }}
              >
                {user.avatar ? (
                  <img
                    className="w-[24px] h-[24px] overflow-hidden object-cover rounded-full"
                    src={user.avatar}
                    alt="user_avatar"
                  />
                ) : (
                  <AnonymousUser />
                )}

                <p className="ml-1">{user.firstName}</p>

                <GoChevronDown className="ml-2 stroke-1" />
              </div>

              <div
                ref={profileRef}
                className={`absolute z-40 top-[50px] right-[20px] w-fit bg-white shadow font-light transition-all ${
                  openProfile
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-[-12px] invisible"
                }`}
              >
                <Link
                  to={{ pathname: PATHNAMES.APP_PATHS.EDIT_PROFILE }}
                  onClick={() => setOpenProfile(false)}
                >
                  <span className="flex items-center text-grey-500 border-b border-grey-100 p-2 cursor-pointer">
                    <CgProfile className="text-lg mr-2" />
                    <p className="text-sm">Edit profile</p>
                  </span>
                </Link>

                <Link to={{ pathname: `auth/${PATHNAMES.AUTH_PATHS.LOGIN}` }}>
                  <span
                    onClick={handleLogout}
                    className="flex items-center text-red-500 p-2 cursor-pointer"
                  >
                    <BiLogOut className="text-lg mr-2" />
                    <p className="text-sm">Log out</p>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
