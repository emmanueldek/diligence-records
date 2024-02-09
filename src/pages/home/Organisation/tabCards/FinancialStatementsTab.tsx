import {
  TColumn,
  TOrgFinancialStatements,
  TTableOrgFinancialStatements,
} from "@/types/organizationTypes";
import AvailableDocuments from "./AvailableDocuments";
import { GoPaperclip } from "react-icons/go";

type TProps = {
  data?: TOrgFinancialStatements[];
};

const columns: TColumn[] = [
  { field: "year", header: "Year" },
  { field: "audFinancials", header: "Audited Financials" },
  { field: "audBy", header: "Audited by" },
  { field: "source", header: "Source" },
  { field: "fsDocuments", header: "Attachment" },
];

const FinancialStatementsTab: React.FC<TProps> = ({ data }) => {
  const contactData: TTableOrgFinancialStatements[] = data
    ? data.map((el) => ({
        year: el?.year,
        audFinancials: (
          <div className="w-[300px] overflow-hidden truncate">
            <a href={el.fsDocuments} className=" text-blue-600">
              {el?.fsDocuments}
            </a>
          </div>
        ),
        audBy: el?.audBy,
        source: el?.source,
        fsDocuments: (
          <div>
            <GoPaperclip />
          </div>
        ),
      }))
    : [];

  return (
    <div className="w-full">
      <div className="w-full scrollbar-hide overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border-spacing-0">
          <thead className="text-xs text-grey-400 bg-grey-50">
            <tr className=" h-[45px] px-7 text-left">
              {columns &&
                columns.map((head, i) => (
                  <th key={i} className="pl-4">
                    {head.header}{" "}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="w-full">
            {contactData &&
              contactData.map((row, i) => (
                <tr
                  key={i}
                  className="h-[50px] border-b-[1px] text-sm text-[#151515] font-[500]"
                >
                  {columns?.map((col: TColumn, i) => (
                    <td key={i} className="pl-4 font-light text-textGrey">
                      {row[col.field as keyof TTableOrgFinancialStatements]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 w-full">
        <AvailableDocuments data={data} />
      </div>
    </div>
  );
};

export default FinancialStatementsTab;
