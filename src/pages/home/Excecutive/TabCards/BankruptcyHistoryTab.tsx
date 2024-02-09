import { TColumn, TOrgCreditHistory } from "@/types/organizationTypes";

const columns: TColumn[] = [
  { field: "date", header: "Date" },
  { field: "type", header: "Type" },
  { field: "assetsLiquidated", header: "Assets Liquidated" },
  { field: "debtsDischarged", header: "Debts Discharged" },
];

type TProps = {
  data?: TOrgCreditHistory[];
};

const BankruptcyHistoryTab: React.FC<TProps> = ({ data }) => {
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
            {data &&
              data.map((row, i) => (
                <tr
                  key={i}
                  className="h-[40px] text-sm text-[#151515] font-[500]"
                >
                  {columns?.map((col: TColumn, i) => (
                    <td key={i} className="pl-4 font-light text-textGrey">
                      {row[col.field as keyof TOrgCreditHistory]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankruptcyHistoryTab;
