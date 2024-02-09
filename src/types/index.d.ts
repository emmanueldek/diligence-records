import {
  TExeCreditHistory,
  TExeFinancialStatements,
  TExeLegalRegulatory,
  TExeTaxCompliance,
} from "./executiveTypes";

export type TInviteType = "mail" | "code";

export type TLoginResponseSchema = {
  authToken: string;
  workspaceToken: string | null;
};

export type TUserResponseSchema = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  invitationCode: string | null;
  avatar: string;
  createdAt: string;
  isSuperAdmin: boolean;
  position?: string;
  __v: number;
};

export type TForgotPwdResponseSchema = {
  message: string;
  status: boolean;
  statusCode: number;
  data: Record<>;
};
export type TExecutiveRequestSchema = {
  createdAt: string;
  executiveName: string;
  organizationName: string;
  position: string;
  status: string;
  _id: string;
};
export type TOrganizationRequestSchema = {
  createdAt: string;
  organizationName: string;
  status: string;
  _id: string;
};
export type TAuditSchema = {
  action: string;
  avatarOrLogo: string;
  createdAt: string;
  executiveId?: string;
  executiveName?: string;
  organizationName?: string;
  organizationId?: string;
  partnerWorkspaceId: string;
  profileType: string;
  recordLocation: string;
  userId: string;
  __v: string | number;
  _id: string;
};
export type TRecordsRequestSchema = {
  dateRequested: string;
  organizationName: string;
  executiveName: string;
  recordSection: string;
  profileType: string;
  status: string;
  _id: string;
};
export type TProfileDataSchema = {
  country: string;
  createdAt: string;
  creator: string;
  industry: string;
  officeAddress: string;
  organizationSize: string;
  position: string;
  state: string;
  website: string;
  workspaceCode: string;
  workspaceDesc: string;
  workspaceLogo: string;
  workspaceName: string;
  __v: string | number;
  _id: string;
};
export type TWorkspaceMembersSchema = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  userId: string;
  workspaceId: string;
};
export type UnknownObject = Record<string>;
export type TOrganizationSearchSchema = {
  createdAt: string;
  organizationLogo: string;
  partnerRequestId: string;
  profile: {
    industry: string;
    location: string;
    organizationDescription: string;
    organizationName: string;
    organizationSize: string;
  };
  financialStatements: UnknownObject;
  taxCompliance: UnknownObject;
  legalRegulatory: UnknownObject;
  creditHistory: UnknownObject;
  organizationDescription: string;
  userId: string;
  status: string;
  updatedAt: string;
  __v: number | string;
  _id: string;
};
export type TExecutiveSearchSchema = {
  taxCompliance: TExeTaxCompliance[];
  legalRegulatory: TExeLegalRegulatory[];
  financialStatements: TExeFinancialStatements[];
  creditHistory: TExeCreditHistory[];
  executiveAvatar: string;
  profile: {
    executiveDescription: string;
    organizationName: string;
    organizationSize: string;
    name: string;
    executiveName: string;
    executivePosition: string;
    location: string;
  };
  status: string;
  updatedAt: string;
  __v: number | string;
  _id: string;
};

export type TFilePayload = {
  flags?: string;
  imageFile: FormData;
};
