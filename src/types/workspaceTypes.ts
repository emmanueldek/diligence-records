export type TWorkspace = {
  workspaceName: string;
  website: string;
  workspaceDesc: string;
  organizationSize: string;
  industry: string;
  officeAddress: string;
  country: string;
  workspaceLogo: string;
};

export type TWorkspaceResponse = {
  message: string;
  data: {
    theWorkspace: TWorkspace;
    membersCount: number;
  };
};
