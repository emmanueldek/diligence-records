export type TGetAExecutiveResponse = {
  message: string;
  data: {
    _id: string;
    profile: TExeProfile;
    executiveAvatar: string;
    status: string;
    financialStatements: TExeFinancialStatements[];
    management: TExeManagement[];
    creditHistory: TExeCreditHistory[];
    environmentalCompliance: TExeEnvironmentalCompliance[];
    legalRegulatory: TExeLegalRegulatory[];
    taxCompliance: TExeTaxCompliance[];
    contractualObligations: TExeContractualObligations[];
    insuranceCoverage: TExeInsuranceCoverage[];
    supplyChainInformation: TExeSupplyChainInformation[];
    referencesReputation: TExeReferencesReputation[];
    ownershipStructure: TExeOwnershipStructure;
  };
};

export type TExeOwnershipStructure = {
  ownershipType: string;
  governanceStructure: string;
  shareHolders: TExeShareHolders[];
};

export type TExeShareHolders = {
  name: string;
  percentage: string;
};

export type TExeProfile = {
  executiveName: string;
  organizationName: string;
  executiveDescription: string;
  organizationSize: string;
  industry: string;
  location: string;
  website: string;
  executivePosition: string;
};

export type TExeManagement = {
  name: string;
  position: string;
  location: string;
};

export type TExeFinancialStatements = {
  executiveName: string;
  recDocId: string;
  recordSection: string;
  recordInput: string;
  requestedBy: string;
  createdAt: string;
  year: string;
  audFinancials: string;
  audBy: string;
  source: string;
  fsDocuments: string;
};

export type TExeCreditHistory = {
  type: string;
  date: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  crdDocuments: string;
};

export type TExeTaxCompliance = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  tcDocuments: string;
};

export type TExeLegalRegulatory = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  lgrDocuments: string;
};

export type TExeEnvironmentalCompliance = {
  creditScore: string;
  reportingAgency: string;
  paymentHistory: string;
  outstandingCreditLine: string;
  esDocuments: string;
};

export type TExeContractualObligations = {
  date: string;
  type: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  coDocuments: string;
};

export type TExeInsuranceCoverage = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  icDocuments: string;
};

export type TExeSupplyChainInformation = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  sciDocuments: string[];
};

export type TExeReferencesReputation = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  rrDocuments: string;
};

export type TTableExeFinancialStatements = {
  year: string;
  audFinancials: JSX.Element;
  audBy: string;
  source: string;
  fsDocuments: JSX.Element;
};

export type TColumn = {
  field: string;
  header: string;
};

export type RouteParams = {
  id: string;
};
