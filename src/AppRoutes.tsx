import { PATHNAMES } from "@/utils/routes";
import {
  Activities,
  HomePage,
  Workspace,
  CreateWorkspace,
  WatchlistPage,
  Request,
  UserProfile,
} from "./pages";
import Login from "./pages/auth/Login";
import { ResetVerify, SignUpVerify } from "./pages/auth/MailVerification";
import Signup from "./pages/auth/Signup";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import RequestDetails from "./pages/request/requestDetails";
import RequestForm from "./pages/home/RequestForm";
import { OrganisationProfile } from "./pages/home/Organisation";
import ExecutivePage from "./pages/home/Excecutive";
import RequestRecord from "./pages/home/Organisation/RequestRecord";
import RequestRecordExe from "./pages/home/Excecutive/RequestRecordExe";
import TermsOfUse from "./pages/TermsOfUse";

const { AUTH_PATHS, APP_PATHS, SPACE_PATHS, DOCUMENT_PATHS } = PATHNAMES;

export const appRoutes = [
  {
    path: APP_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: "home/organisation/:id",
    element: <OrganisationProfile />,
  },
  {
    path: "home/executive/:id",
    element: <ExecutivePage />,
  },

  {
    path: "home/organisation/:id/request/:orgName",
    element: <RequestRecord />,
  },

  {
    path: "home/executive/:id/request/:orgName",
    element: <RequestRecordExe />,
  },
  {
    path: APP_PATHS.WATCHLIST,
    element: <WatchlistPage />,
  },
  {
    path: APP_PATHS.MANAGE_WORKSPACE,
    element: <Workspace />,
  },
  {
    path: APP_PATHS.REQUEST,
    element: <Request />,
  },
  {
    path: APP_PATHS.REQUEST_DETAILS,
    element: <RequestDetails />,
  },
  {
    path: APP_PATHS.NEW_REQUEST,
    element: <RequestForm />,
  },
  {
    path: APP_PATHS.ACTIVITIES,
    element: <Activities />,
  },
  // {
  //   path: APP_PATHS.PROFILE,
  //   element: <Profile />,
  // },
  {
    path: APP_PATHS.EDIT_PROFILE,
    element: <UserProfile />,
  },
];

export const authRoutes = [
  {
    path: AUTH_PATHS.SIGNUP,
    element: <Signup />,
  },
  {
    path: AUTH_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: AUTH_PATHS.SIGNUP_VERIFY,
    element: <SignUpVerify />,
  },
  {
    path: AUTH_PATHS.RESET_VERIFY,
    element: <ResetVerify />,
  },
  {
    path: AUTH_PATHS.FORGOT_PASSWORD,
    element: <ForgetPassword />,
  },
  {
    path: AUTH_PATHS.RESET_PASSWORD,
    element: <ResetPassword />,
  },
];

export const spaceRoutes = [
  {
    path: SPACE_PATHS.CREATE,
    element: <CreateWorkspace />,
  },
];
export const documentRoutes = [
  {
    path: DOCUMENT_PATHS.TERMS_OF_USE,
    element: <TermsOfUse />,
  },
];
