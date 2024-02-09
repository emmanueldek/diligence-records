export type TGetAOrganisationResponse = {
  message: string;
  data: {
    _id: string;
    profile: TOrgProfile;
    organizationLogo: string;
    status: string;
    financialStatements: TOrgFinancialStatements[];
    management: TOrgManagement[];
    creditHistory: TOrgCreditHistory[];
    environmentalCompliance: TOrgEnvironmentalCompliance[];
    legalRegulatory: TOrgLegalRegulatory[];
    taxCompliance: TOrgTaxCompliance[];
    contractualObligations: TOrgContractualObligations[];
    insuranceCoverage: TOrgInsuranceCoverage[];
    supplyChainInformation: TOrgSupplyChainInformation[];
    referencesReputation: TOrgReferencesReputation[];
    ownershipStructure: TOrgOwnershipStructure;
  };
};

export type TOrgOwnershipStructure = {
  ownershipType: string;
  governanceStructure: string;
  shareHolders: TOrgShareHolders[];
};

export type TOrgShareHolders = {
  name: string;
  percentage: string;
};

export type TOrgProfile = {
  organizationName: string;
  organizationDescription: string;
  organizationSize: string;
  industry: string;
  location: string;
  website: string;
  organizationLogo: string;
};

export type TOrgManagement = {
  name: string;
  position: string;
  location: string;
};

export type TOrgFinancialStatements = {
  year: string;
  audFinancials: string;
  audBy: string;
  source: string;
  fsDocuments: string;
};

export type TOrgCreditHistory = {
  type: string;
  date: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  crdDocuments: string;
};

export type TTableOrgCreditHistory = {
  type: string;
  date: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  crdDocuments: JSX.Element;
};

export type TOrgTaxCompliance = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  tcDocuments: string;
};
export type TTableOrgTaxCompliance = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  tcDocuments: JSX.Element;
};

export type TOrgLegalRegulatory = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  lgrDocuments: string;
};
export type TTableOrgLegalRegulatory = {
  year: string;
  fillingStatus: string;
  totalTaxLiability: string;
  lgrDocuments: JSX.Element;
};

export type TOrgEnvironmentalCompliance = {
  creditScore: string;
  reportingAgency: string;
  paymentHistory: string;
  outstandingCreditLine: string;
  ecDocuments: string;
};

export type TOrgContractualObligations = {
  date: string;
  type: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  coDocuments: string;
};
export type TTableOrgContractualObligations = {
  date: string;
  type: string;
  assetsLiquidated: string;
  debtsDischarged: string;
  coDocuments: JSX.Element;
};

export type TOrgInsuranceCoverage = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  icDocuments: string;
};
export type TTableOrgInsuranceCoverage = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  icDocuments: JSX.Element;
};

export type TOrgSupplyChainInformation = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  sciDocuments: string[];
};

export type TOrgReferencesReputation = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  rrDocuments: string;
};
export type TTableOrgReferencesReputation = {
  expiryDate: string;
  type: string;
  coverageAmount: string;
  coverageStatus: string;
  rrDocuments: JSX.Element;
};

export type TTableOrgFinancialStatements = {
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
