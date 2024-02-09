export type TAddToWatchList = {
  profileType: string;
};

export type TGetWatchList = {
  message: string;
  data: {
    result: TWatchList[];
  };
};

export type TWatchList = {
  _id: string;
  profileType: string;
  organizationName: string;
  location: string;
  industry: string;
  organizationId: string;
  userId: string;
  workspaceId: string;
  executiveName: string;
  executiveAvatar: string;
  executiveId: string;
  createdAt: string;
  organizationLogo: string;
};
