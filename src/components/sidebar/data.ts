import { PATHNAMES } from "@/utils/routes";
import { GoHome, GoBookmark, GoBell, GoGear } from "react-icons/go";
import { PiDatabaseBold } from "react-icons/pi";

const { APP_PATHS } = PATHNAMES;

export const sidebarItems = [
  {
    name: "Home",
    pathname: APP_PATHS.HOME,
    Icon: GoHome,
  },
  {
    name: "Watchlist",
    pathname: APP_PATHS.WATCHLIST,
    Icon: GoBookmark,
  },
  {
    name: "Request",
    pathname: APP_PATHS.REQUEST,
    Icon: PiDatabaseBold,
  },
  {
    name: "Activities",
    pathname: APP_PATHS.ACTIVITIES,
    Icon: GoBell,
  },

  {
    name: "Manage workspace",
    pathname: APP_PATHS.MANAGE_WORKSPACE,
    Icon: GoGear,
  },
];
