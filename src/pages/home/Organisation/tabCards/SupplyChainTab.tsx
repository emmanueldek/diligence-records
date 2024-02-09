import { TColumn, TOrgSupplyChainInformation } from "@/types/organizationTypes";
import { PrimaryBtn } from "@/components";

type TProps = {
  data?: TOrgSupplyChainInformation[];
};

const columns: TColumn[] = [
  { field: "type", header: "Type" },
  { field: "coverageAmount", header: "Coverage Amount" },
  { field: "coverageStatus", header: "Coverage Status" },
  { field: "expiryDate", header: "Expiry Date" },
];

const SupplyChainTab: React.FC<TProps> = ({ data }) => {
  return (
    <div>
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
                  className="h-[40px]  text-sm text-[#151515] font-[500]"
                >
                  {columns?.map((col: TColumn, i) => (
                    <td key={i} className="pl-4 font-light text-textGrey">
                      {row[col.field as keyof TOrgSupplyChainInformation]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 w-full">
        <div className="w-full">
          <div className="border-b border-grey-50 pb-3">
            <p className="font-bold text-grey-900 text-xl">Documents</p>
          </div>

          <div className="flex flex-wrap gap-4 my-4">
            {data?.map((doc, index) =>
              doc.sciDocuments.map((el) => {
                return (
                  <div
                    key={`${index}--doc`}
                    className="w-full sm:w-[190px] md:w-[250px]"
                  >
                    <div className="w-full h-[160px] bg-grey-50 rounded-md overflow-hidden group">
                      <a href={el}>
                        <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                          <PrimaryBtn text="open" />
                        </div>
                      </a>
                    </div>

                    <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate">
                      {el}
                    </h4>
                    <p className="font-light text-grey-400 text-sm leading-[20px]">
                      {/* {date} */}
                    </p>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTab;
