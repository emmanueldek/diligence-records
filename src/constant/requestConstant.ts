export const monthsArray = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1960;

  return Array.from({ length: currentYear - startYear + 1 }, (_, index) => ({
    label: (startYear + index).toString(),
    value: (startYear + index).toString(),
  }));
};

export const orgTab = [
  {
    id: 1,
    name: "Profile",
  },
  {
    id: 2,
    name: "Financial Statements",
  },
  {
    id: 3,
    name: "Management",
  },
  {
    id: 4,
    name: "Bankruptcy History",
  },
  {
    id: 5,
    name: "Tax Compliance",
  },
  {
    id: 6,
    name: "Legal/Regulatory",
  },
  {
    id: 7,
    name: "Environmental Compliance",
  },
  {
    id: 8,
    name: "Contractual Obligations",
  },
  {
    id: 9,
    name: "Insurance Coverage",
  },
  {
    id: 10,
    name: "Supply Chain Information",
  },
  {
    id: 11,
    name: "References",
  },
  {
    id: 12,
    name: "Ownership Structure",
  },
];

export const formattedTabs = orgTab.map(({ name }) => ({
  label: name,
  value: name,
}));
