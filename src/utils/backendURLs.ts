const env = import.meta.env.VITE_REACT_APP_NODE_ENV;

export const RECORDS_URLS = {
  BASE_URL:
    env === "production"
      ? `${import.meta.env.VITE_REACT_APP_RECORDS_PROD}`
      : env === "development"
      ? `${import.meta.env.VITE_REACT_APP_RECORDS_DEV}`
      : "",

  AUTH: {
    REGISTRATION: "auth/partner/signup",
    LOGIN: "auth/partner/login",
    VERIFY: "auth/partner/verify",
    FORGOT_PASSWORD: "auth/partner/forgot-password",
    PASSWORD_RESET: "auth/partner/reset-password",
    ME: "auth/partner/me",
    PROFILE_UPDATE: "auth/partner/me/update",
  },
  HOME: {
    FULL_SEARCH: "home/full-search",
    SINGLE_ORGANIZATION: "home/view/organization",
    SINGLE_EXECUTIVES: "home/view/executive",
    NEWS: "home/feeds",
  },
  REQUEST: {
    GET_EXECUTIVES: "request/partner/view/executives",
    GET_ORGANIZATIONS: "request/partner/view/organizations",
    GET_RECORDS: "request/partner/view/records",
    CREATE: "request/partner/org-exec/create",
    CREATE_ORG_EXEC: "request/partner/org-exec/create",
    GET_SINGLE_REQUEST: "request/partner/view/single",
    GET_AUDIT: "request/partner/audit-trail",
    DELETE_REQUEST: "request/partner/delete",
    DELETE_ACTIVITY: "request/partner/audit-trail/delete",
    SUGGESTION: "request/partner/suggestion/create",
    ADD_RECORD: "request/partner/add-record",
  },
  WORKSPACE: {
    CREATE: "workspace/partner/create",
    GET_ALL_MEMBERS: "workspace/partner/members",
    GET_PROFILE: "workspace/partner/profile/retrieve",
    INVITE: "workspace/partner/members/invite/email",
    MAKE_MEMBER: "workspace/partner/member/make-member",
    MAKE_ADMIN: "workspace/partner/member/make-admin",
    REMOVE_USER: "workspace/partner/member/remove",
    PATCH_WORKSPACE: "workspace/partner/profile/update",
  },
  WATCH_LIST: {
    CREATE: "waitlist/create",
    GET_ALL: "waitlist/all",
    REMOVE: "waitlist/remove",
    CONFIRM: "waitlist/confirm",
    REMOVE_MULTIPLE: "waitlist",
  },
  UPLOAD: "upload/partner/files",
};
