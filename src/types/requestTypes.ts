export type TRequestRecord = {
  profileType: string;
  recordSection: string;
  recordInput: string;
  recordDoc: string;
  recordDocDescription: string;
  organizationName: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  link: string;
};

export type TRequestRecordExe = {
  profileType: string;
  recordSection: string;
  recordInput: string;
  recordDoc: string;
  recordDocDescription: string;
  executiveName: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  link: string;
};

export type TRequestRecordPayload = {
  profileType: string;
  recordSection: string;
  recordInput: string;
  recordDoc: string;
  recordDocDescription: string;
  organizationName?: string;
  executiveName?: string;
  recordPeriod: {
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
  link: string;
};

export type TRequestRecordPayloadExe = {
  profileType: string;
  recordSection: string;
  recordInput: string;
  recordDoc: string;
  recordDocDescription: string;
  executiveName: string;
  recordPeriod: {
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
  link: string;
};
export type TRequestSuggestionPayload = {
  profileType: string;
  recordSection: string;
  suggestionInput: string;
  suggestionDoc: string;
  link: string;
  imageDesc?: string;
  organizationName?: string;
  executiveName?: string;
};
